const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Transpile the TS helper to CommonJS, as Vite would bundle it.
const compiled = { exports: {} };
const js = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/utils/common/generateData.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
new Function('module', 'exports', 'require', js)(compiled, compiled.exports, require);
const { generateEmptyRows } = compiled.exports;

const headers = [
    { name: 'Enrollment details', headers: [{ key: 'ref' }, { key: 'school' }, { key: 'enrollmentDate' }, { key: 'reg.year' }, { key: 'reg.grade' }, { key: 'reg.class' }] },
    { name: 'Student profile', headers: [{ key: 'sysId' }, { key: 'firstName' }] },
];

test('every row of the empty template comes with the class selected on screen; other fields stay empty', () => {
    const prefilled = { 'reg.year': '2025', 'reg.grade': 'Grade 1', 'reg.class': 'A' };
    const rows = generateEmptyRows(2, headers, { sysId: ['S-1', 'S-2'] }, 'School 1', prefilled);

    assert.equal(rows.length, 2);
    assert.deepEqual(rows.map(r => [r.ref, r.school, r['reg.year'], r['reg.grade'], r['reg.class'], r.sysId, r.firstName]), [
        [1, 'School 1', '2025', 'Grade 1', 'A', 'S-1', ''],
        [2, 'School 1', '2025', 'Grade 1', 'A', 'S-2', ''],
    ]);
});

test('without selected values the template is as before (empty class columns)', () => {
    const [row] = generateEmptyRows(1, headers, {}, 'School 1');
    assert.deepEqual([row['reg.year'], row['reg.grade'], row['reg.class']], ['', '', '']);
});
