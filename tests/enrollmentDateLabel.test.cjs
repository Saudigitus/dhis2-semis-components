const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Transpile the TS helper to CommonJS, as Vite would bundle it.
const compiled = { exports: {} };
const js = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/utils/format/enrollmentDateLabel.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
new Function('module', 'exports', 'require', js)(compiled, compiled.exports, require);
const { enrollmentDateLabel } = compiled.exports;

const translate = (key) => `t(${key})`;

test('the enrollment date column takes the label configured on the program', () => {
    assert.equal(enrollmentDateLabel({ displayEnrollmentDateLabel: 'Registration date' }, translate), 'Registration date');
    assert.equal(enrollmentDateLabel({ displayEnrollmentDateLabel: 'Date of employment' }, translate), 'Date of employment');
});

test('without a label on the program the column is "Enrollment date" (translated)', () => {
    assert.equal(enrollmentDateLabel({}, translate), 't(Enrollment date)');
    assert.equal(enrollmentDateLabel({ displayEnrollmentDateLabel: '  ' }, translate), 't(Enrollment date)');
    assert.equal(enrollmentDateLabel(undefined, translate), 't(Enrollment date)');
});
