const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Transpile the TS helper to CommonJS, as Vite would bundle it.
const compiled = { exports: {} };
const js = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/utils/common/enrollmentUpdate.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
new Function('module', 'exports', 'require', js)(compiled, compiled.exports, require);
const { buildEnrollmentUpdate } = compiled.exports;

const ids = { trackedEntity: 'TE1', orgUnit: 'OU-old' };
const row = (date, grade = 'Grade 2') => ({
    enrollment: 'E1', program: 'P', orgUnit: 'OU-selected', status: 'COMPLETED', enrolledAt: date, occurredAt: date,
    attributes: [{ attribute: 'name', value: 'Ana' }],
    events: [
        { programStage: 'reg', orgUnit: 'OU-selected', status: 'ACTIVE', occurredAt: date, dataValues: [{ dataElement: 'grade', value: grade }] },
        { programStage: 'socio', orgUnit: 'OU-selected', status: 'ACTIVE', occurredAt: date, dataValues: [{ dataElement: 'age', value: '7' }] },
    ],
});
const server = {
    enrollment: { enrollment: 'E1', enrolledAt: '2025-09-01T00:00:00.000', occurredAt: '2025-09-01T00:00:00.000', orgUnit: 'OU-old', status: 'ACTIVE' },
    events: [
        { event: 'EV-reg', programStage: 'reg', orgUnit: 'OU-old', occurredAt: '2025-09-01T00:00:00.000', status: 'COMPLETED' },
        { event: 'EV-socio', programStage: 'socio', orgUnit: 'OU-old', occurredAt: '2025-09-03T00:00:00.000', status: 'ACTIVE' },
    ],
};

test('same date as on the server: the dates, school and status of the server are kept; the changed grade is sent on the existing registration record', () => {
    const update = buildEnrollmentUpdate(row('2025-09-01'), server, 'reg', ids, 'type');
    const [enrollment] = update.enrollments;

    assert.equal(update.trackedEntity, 'TE1');
    assert.deepEqual(update.attributes, [{ attribute: 'name', value: 'Ana' }]);
    assert.equal(enrollment.enrolledAt, '2025-09-01T00:00:00.000');
    assert.equal(enrollment.orgUnit, 'OU-old');
    assert.equal(enrollment.status, 'COMPLETED', 'enrollments are kept COMPLETED or CANCELLED');
    assert.deepEqual(enrollment.events.map(e => [e.event, e.occurredAt, e.orgUnit, e.status]), [
        ['EV-reg', '2025-09-01T00:00:00.000', 'OU-old', 'COMPLETED'],
        ['EV-socio', '2025-09-03T00:00:00.000', 'OU-old', 'ACTIVE'],
    ]);
    assert.deepEqual(enrollment.events[0].dataValues, [{ dataElement: 'grade', value: 'Grade 2' }]);
});

test('date changed in the file: saved on the enrollment and on the registration record; socio-economics keeps its date', () => {
    const [enrollment] = buildEnrollmentUpdate(row('2025-08-15'), server, 'reg', ids, 'type').enrollments;
    assert.equal(enrollment.enrolledAt, '2025-08-15');
    assert.equal(enrollment.occurredAt, '2025-08-15');
    assert.equal(enrollment.events[0].occurredAt, '2025-08-15');
    assert.equal(enrollment.events[1].occurredAt, '2025-09-03T00:00:00.000');
});

test('a record that does not exist on the server is not created by the update', () => {
    const [enrollment] = buildEnrollmentUpdate(row('2025-09-01'), { ...server, events: [server.events[0]] }, 'reg', ids, 'type').enrollments;
    assert.deepEqual(enrollment.events.map(e => e.programStage), ['reg']);
});

test('a cancelled enrollment (dropout) stays cancelled; any other one is sent COMPLETED', () => {
    const cancelled = { ...server, enrollment: { ...server.enrollment, status: 'CANCELLED' } };
    assert.equal(buildEnrollmentUpdate(row('2025-09-01'), cancelled, 'reg', ids, 'type').enrollments[0].status, 'CANCELLED');
    const completed = { ...server, enrollment: { ...server.enrollment, status: 'COMPLETED' } };
    assert.equal(buildEnrollmentUpdate(row('2025-09-01'), completed, 'reg', ids, 'type').enrollments[0].status, 'COMPLETED');
});
