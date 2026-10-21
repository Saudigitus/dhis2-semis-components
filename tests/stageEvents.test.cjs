const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '../src/utils/common/stageEvents.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function('module', 'exports', 'require', js)(mod, mod.exports, require);
const { withExistingEvent, eventsWithValues } = mod.exports;

test('an existing record keeps its id, its date and its status (SEMIS-217)', () => {
    const fromFile = { enrollment: 'e1', programStage: 't1', occurredAt: '2026-10-20', dataValues: [{ dataElement: 'math', value: '12' }] };
    assert.deepEqual(withExistingEvent(fromFile, { event: 'ev1', occurredAt: '2025-10-08T00:00:00.000', status: 'COMPLETED' }),
        { ...fromFile, event: 'ev1', occurredAt: '2025-10-08', status: 'COMPLETED' });
    assert.deepEqual(withExistingEvent(fromFile, undefined), fromFile);
});

test('records without values are not sent (SEMIS-217, SEMIS-219)', () => {
    const events = [
        { enrollment: 'e1', dataValues: [{ dataElement: 'math', value: '12' }] },
        { enrollment: 'e2', dataValues: [] },
        { enrollment: 'e3', event: 'ev3', dataValues: [] },
    ];
    assert.deepEqual(eventsWithValues(events).map(x => x.enrollment), ['e1']);
});
