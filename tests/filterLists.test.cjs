const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Transpile the TS helpers to CommonJS, as Vite would bundle them.
function loadTs(file, requires = {}) {
    const compiled = { exports: {} };
    const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    new Function('module', 'exports', 'require', js)(compiled, compiled.exports, (name) => requires[name] ?? require(name));
    return compiled.exports;
}

const labels = loadTs(path.join(__dirname, '../src/utils/format/getFilterLables.ts'));
const { generateValidationSheet } = loadTs(path.join(__dirname, '../src/utils/common/generateValidationSheet.ts'), { '../format/getFilterLables': labels });
const { getFilterLables, FILTER_SEPARATOR } = labels;

const difficulty = [
    { value: 'Yes, a lot of difficulty', label: 'Yes, a lot of difficulty' },
    { value: 'Cannot do it at all', label: 'Cannot do it at all' },
    { value: 'No, no difficulty', label: 'No, no difficulty' },
];

test('drop-down lists keep the option codes (the values stored on the server)', () => {
    const gender = [{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }];
    assert.equal(getFilterLables(gender), ['female', 'male'].join(FILTER_SEPARATOR));
    assert.equal(getFilterLables(gender, [{ code: 'male' }]), 'male');
});

test('option codes with commas stay whole: one option per cell of the Validation sheet', () => {
    const { validationRows, validationHeaders } = generateValidationSheet({
        seeing: getFilterLables(difficulty),
        Attendance: `${getFilterLables([{ value: 'absent', label: 'Absent' }])}${FILTER_SEPARATOR}present`,
    });

    assert.deepEqual(validationHeaders.map(h => h.key), ['seeing', 'Attendance']);
    assert.deepEqual(validationRows.map(r => r.seeing).filter(Boolean), ['Yes, a lot of difficulty', 'Cannot do it at all', 'No, no difficulty']);
    assert.deepEqual(validationRows.map(r => r.Attendance).filter(Boolean), ['absent', 'present']);
    // The range of the Excel list is built from the same count (3 options -> rows 2 to 4).
    assert.equal(getFilterLables(difficulty).split(FILTER_SEPARATOR).length, 3);
});
