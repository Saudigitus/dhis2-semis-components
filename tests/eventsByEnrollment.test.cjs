const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Transpile the TS helpers to CommonJS, as Vite would bundle them.
const source = fs.readFileSync(path.join(__dirname, '../src/utils/common/eventsByEnrollment.ts'), 'utf8');
const compiled = { exports: {} };
new Function('module', 'exports', ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText)(compiled, compiled.exports);
const { IDS_PER_REQUEST, chunkList, groupByEnrollment, readEventsByEnrollments } = compiled.exports;

// Fake server: returns the events of the requested enrollments, page by page.
function fakeServer(events) {
    const calls = [];
    const getEvents = async (params) => {
        calls.push(params);
        const ids = params.enrollments.split(',');
        const found = events.filter(e => ids.includes(e.enrollment));
        return found.slice((params.page - 1) * params.pageSize, params.page * params.pageSize);
    };
    return { calls, getEvents };
}

test('a class of 1,000 people is read with 20 requests per stage (50 enrollments per request)', async () => {
    const enrollments = Array.from({ length: 1000 }, (_, i) => `E${i}`);
    const { calls, getEvents } = fakeServer(enrollments.map(e => ({ enrollment: e, event: `ev-${e}` })));

    const events = await readEventsByEnrollments(getEvents, { programStage: 'term1' }, enrollments);

    assert.equal(IDS_PER_REQUEST, 50);
    assert.equal(calls.length, 20);
    assert.equal(events.length, 1000);
    assert.ok(calls.every(c => c.programStage === 'term1' && c.enrollments.split(',').length === 50));
});

test('all pages are read when a group has more events than one page (attendance)', async () => {
    const days = Array.from({ length: 450 }, (_, i) => ({ enrollment: 'E1', event: `day-${i}` }));
    const { calls, getEvents } = fakeServer(days);

    const events = await readEventsByEnrollments(getEvents, {}, ['E1'], 50, 200);

    assert.equal(events.length, 450);
    assert.deepEqual(calls.map(c => c.page), [1, 2, 3]);
});

test('empty and repeated enrollments are not sent; nothing to read means no request', async () => {
    const { calls, getEvents } = fakeServer([]);

    await readEventsByEnrollments(getEvents, {}, ['E1', 'E1', '', undefined]);
    assert.deepEqual(calls.map(c => c.enrollments), ['E1']);

    calls.length = 0;
    assert.deepEqual(await readEventsByEnrollments(getEvents, {}, []), []);
    assert.equal(calls.length, 0);
});

test('a failed request (no answer) ends the reading of that group without breaking the export', async () => {
    const events = await readEventsByEnrollments(async () => undefined, {}, ['E1']);
    assert.deepEqual(events, []);
});

test('events are joined to their enrollment; events without enrollment are ignored', () => {
    const grouped = groupByEnrollment([
        { enrollment: 'E1', event: 'a' }, { enrollment: 'E2', event: 'b' }, { enrollment: 'E1', event: 'c' }, { event: 'x' }
    ]);
    assert.deepEqual(Object.keys(grouped).sort(), ['E1', 'E2']);
    assert.deepEqual(grouped.E1.map(e => e.event), ['a', 'c']);
    assert.deepEqual(chunkList([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
