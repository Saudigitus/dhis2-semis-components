const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Transpile the TS helpers to CommonJS, as Vite would bundle them.
function loadTs(file) {
    const compiled = { exports: {} };
    const js = ts.transpileModule(fs.readFileSync(path.join(__dirname, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    new Function('module', 'exports', 'require', js)(compiled, compiled.exports, require);
    return compiled.exports;
}
const { attendanceValuesToRecord, attendanceInvalidValues } = loadTs('../src/utils/common/attendanceCounts.ts');
const { readEventsByEnrollments } = loadTs('../src/utils/common/eventsByEnrollment.ts');

test('summary: empty days and "Non School Day" are not counted, invalid values are (SEMIS-215)', () => {
    const valid = [{ Attendance: { '2026-09-01': 'absent', '2026-09-02': '', '2026-09-05': 'Non School Day', '2026-09-03': null } },
                   { Attendance: { '2026-09-01': '', '2026-09-02': '' } }];
    const invalid = [{ Attendance: { '2026-09-01': 'holiday' }, errors: [{ key: '2026-09-01', error: '"holiday" is not a valid attendance option' }] }];

    assert.equal(attendanceValuesToRecord(valid), 1);
    assert.equal(attendanceInvalidValues(invalid), 1);
    assert.equal(attendanceInvalidValues([]), 0);
});

test('existing records: all the pages of a student are read, not only the first 50 (SEMIS-215)', async () => {
    const server = Array.from({ length: 120 }, (_, i) => ({ event: `e${i}`, enrollment: 'en1', occurredAt: `2026-01-${i}` }));
    const pages = [];
    const getEvents = async ({ page, pageSize }) => { pages.push(page); return server.slice((page - 1) * pageSize, page * pageSize); };

    const events = await readEventsByEnrollments(getEvents, { program: 'p' }, ['en1'], 1, 50);

    assert.equal(events.length, 120);
    assert.deepEqual(pages, [1, 2, 3]);
});

test('existing records: exactly 50 records end after one empty page, never loop (SEMIS-215)', async () => {
    const server = Array.from({ length: 50 }, (_, i) => ({ event: `e${i}`, enrollment: 'en1' }));
    let calls = 0;
    const getEvents = async ({ page, pageSize }) => { calls++; return server.slice((page - 1) * pageSize, page * pageSize); };

    assert.equal((await readEventsByEnrollments(getEvents, {}, ['en1'], 1, 50)).length, 50);
    assert.equal(calls, 2);
});

test('class values are sent only when the attendance stage has the data element (SEMIS-215, staff)', () => {
    const { dataValuesOfStage } = loadTs('../src/utils/common/stageDataValues.ts');
    const classValues = [{ dataElement: 'year', value: '2025' }, { dataElement: 'typeOfStaff', value: 'Teaching Staff' }];
    const staffStage = { programStageDataElements: [{ dataElement: { id: 'status' } }, { dataElement: { id: 'year' } }] };

    assert.deepEqual(dataValuesOfStage(classValues, staffStage), [{ dataElement: 'year', value: '2025' }]);
    assert.deepEqual(dataValuesOfStage(classValues, undefined), []);
});
