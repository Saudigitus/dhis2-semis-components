const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '../src/utils/common/finalResult.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function('module', 'exports', 'require', js)(mod, mod.exports, require);
const { finalDecision, enrollmentStatusOf, finalResultEnrollment } = mod.exports;

const config = { programStage: 'fr', status: 'decision', dropoutStatusValues: ['Dropout'] };

test('the decision comes from the final result data element of the configuration (SEMIS-219)', () => {
    const row = { 'Final result': { 'fr.decision': ' Dropout ', 'fr.other': 'x' } };
    assert.equal(finalDecision(row, ['Final result'], 'fr.decision'), 'Dropout');
    assert.equal(finalDecision({ 'Final result': { 'fr.decision': '' } }, ['Final result'], 'fr.decision'), '');
});

test('dropout cancels the enrollment, any other decision completes it, as on screen (SEMIS-219)', () => {
    assert.equal(enrollmentStatusOf('Dropout', config), 'CANCELLED');
    assert.equal(enrollmentStatusOf('Promoted', config), 'COMPLETED');
    // Before: the dropout values were read under a configuration name that does not exist.
    assert.equal(enrollmentStatusOf('Dropout', { finalResult: config }), 'COMPLETED');
});

test('the enrollment keeps its dates and school as saved on the server (SEMIS-219)', () => {
    const update = { enrollment: 'e1', orgUnit: 'fileOu', status: 'CANCELLED', events: [] };
    assert.deepEqual(finalResultEnrollment(update, { enrolledAt: '2025-09-01T00:00:00.000', occurredAt: '2025-09-01T00:00:00.000', orgUnit: 'ou1' }),
        { ...update, orgUnit: 'ou1', enrolledAt: '2025-09-01T00:00:00.000', occurredAt: '2025-09-01T00:00:00.000' });
});
