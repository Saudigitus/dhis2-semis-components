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
const { CLASS_RECORD_ROW, classRecordExportRow, classRecordStatusByDay, daysWithValues, planClassRecords, classRecordEvent, sameClassRecord } = loadTs('../src/utils/common/classRecord.ts');

const config = { program: 'cp', programStage: 'cs', orgUnit: 'ou', totalRecords: 'tot',
    classValues: [{ dataElement: 'year', value: '2025' }, { dataElement: 'grade', value: 'Grade 1' }],
    summaries: [{ code: 'absent', dataElement: 'totAbsent' }] };

test('export: the class record row holds the status of each day (SEMIS-214)', () => {
    const row = classRecordExportRow([{ occurredAt: '2025-10-16T00:00:00.000', status: 'COMPLETED' }, { occurredAt: '2025-10-17T00:00:00.000', status: 'ACTIVE' }, { occurredAt: '2025-10-18', status: 'SCHEDULE' }]);
    assert.deepEqual(row, { ref: CLASS_RECORD_ROW, '2025-10-16': 'COMPLETED', '2025-10-17': 'ACTIVE' });
});

test('import: statuses of the row, days with values of the persons (SEMIS-215)', () => {
    assert.deepEqual(classRecordStatusByDay({ Attendance: { '2025-10-01': 'completed', '2025-10-02': '', '2025-10-04': 'Non School Day' } }), { '2025-10-01': 'COMPLETED' });
    assert.deepEqual(classRecordStatusByDay(undefined), {});
    assert.deepEqual(daysWithValues([{ Attendance: { '2025-10-02': 'absent', '2025-10-01': '', '2025-10-04': 'Non School Day' } }, { Attendance: { '2025-10-03': 'absent', '2025-10-05': 'present' } }], 'Attendance', ['absent']), ['2025-10-02', '2025-10-03']);
});

test('import: days saved by the agreed rule (SEMIS-215)', () => {
    const plan = planClassRecords(
        { '2025-10-01': 'COMPLETED', '2025-10-02': 'ACTIVE', '2025-10-03': 'ACTIVE', '2025-10-06': 'ACTIVE' },
        ['2025-10-02', '2025-10-04'],
        { '2025-10-01': { event: 'e1', status: 'COMPLETED' }, '2025-10-03': { event: 'e3', status: 'ACTIVE' }, '2025-10-04': { event: 'e4', status: 'COMPLETED' }, '2025-10-06': { event: 'e6', status: 'COMPLETED' } });
    assert.deepEqual(plan, [
        { day: '2025-10-01', status: 'COMPLETED', event: 'e1', emptyStatus: false },   // completed: always
        { day: '2025-10-02', status: 'ACTIVE', event: undefined, emptyStatus: false },  // active with absences
        { day: '2025-10-04', status: 'ACTIVE', event: 'e4', emptyStatus: true },        // absences, no status
        { day: '2025-10-06', status: 'ACTIVE', event: 'e6', emptyStatus: false },       // reopened, no absences
    ]);                                                                                  // 10-03: active, no absences: unchanged
});

test('import: the totals of the file are always saved, also on ACTIVE days (SEMIS-215)', () => {
    const active = classRecordEvent({ day: '2025-10-02', status: 'ACTIVE' }, config, { totalRecords: 10, byStatus: { absent: 3 } });
    assert.deepEqual(active.dataValues, [{ dataElement: 'totAbsent', value: 3 }, { dataElement: 'tot', value: 10 }, ...config.classValues]);
    assert.equal(active.event, undefined);

    const completed = classRecordEvent({ day: '2025-10-01', status: 'COMPLETED', event: 'e1' }, config, { totalRecords: 7, byStatus: {} });
    assert.equal(completed.event, 'e1');
    assert.deepEqual(completed.dataValues.slice(0, 2), [{ dataElement: 'totAbsent', value: 0 }, { dataElement: 'tot', value: 7 }]);
});

test('import: a class record already saved with the same status and values is not sent again (SEMIS-215)', () => {
    const event = classRecordEvent({ day: '2025-10-01', status: 'COMPLETED', event: 'e1' }, config, { totalRecords: 7, byStatus: { absent: 2 } });
    const saved = { status: 'COMPLETED', dataValues: [{ dataElement: 'totAbsent', value: '2' }, { dataElement: 'tot', value: '7' }, ...config.classValues] };
    assert.equal(sameClassRecord(saved, event), true);
    assert.equal(sameClassRecord({ ...saved, status: 'ACTIVE' }, event), false);
    assert.equal(sameClassRecord(undefined, event), false);
    const active = classRecordEvent({ day: '2025-10-02', status: 'ACTIVE', event: 'e2' }, config, { totalRecords: 7, byStatus: { absent: 1 } });
    assert.equal(sameClassRecord({ status: 'ACTIVE', dataValues: [{ dataElement: 'totAbsent', value: '1' }, { dataElement: 'tot', value: '7' }, ...config.classValues] }, active), true);
    assert.equal(sameClassRecord({ status: 'ACTIVE', dataValues: config.classValues }, active), false);
});
