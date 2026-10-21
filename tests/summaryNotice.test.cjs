const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '../src/utils/common/summaryNotice.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function('module', 'exports', 'require', js)(mod, mod.exports, require);
const { summaryNotice } = mod.exports;

const base = { validated: false, committed: false, dryRunFailed: false, invalidRows: 0, ignored: 0, exceptions: 0 };

test('import done with invalid rows left out: no error title, the message says so (SEMIS-208)', () => {
    const notice = summaryNotice({ ...base, validated: true, committed: true, invalidRows: 2 });
    assert.equal(notice.hasErrors, false);
    assert.equal(notice.message, 'Data imported successfully! The invalid records of the file were not imported.');
});

test('import refused by the server: error title (SEMIS-208)', () => {
    assert.equal(summaryNotice({ ...base, committed: true, ignored: 1 }).hasErrors, true);
    assert.equal(summaryNotice({ ...base, committed: true, exceptions: 1 }).hasErrors, true);
});

test('dry run: error title only when the server refused something (SEMIS-208)', () => {
    assert.equal(summaryNotice({ ...base, validated: true, invalidRows: 3 }).hasErrors, false);
    assert.equal(summaryNotice({ ...base, validated: true, dryRunFailed: true }).hasErrors, true);
});

test('check of the file: error title when rows are invalid (SEMIS-208)', () => {
    assert.equal(summaryNotice({ ...base, invalidRows: 1 }).hasErrors, true);
    assert.equal(summaryNotice(base).hasErrors, false);
});
