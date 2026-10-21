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
const { showsListColumnsOnly, listAttributes, reportDataElements } = loadTs('../src/utils/common/listColumns.ts');
const { academicYearDates, dateWithin } = loadTs('../src/utils/common/academicYearDates.ts');

test('attendance files keep only the list columns, from the program configuration (SEMIS-214)', () => {
    const attributes = [{ displayInList: true, trackedEntityAttribute: { id: 'first' } }, { displayInList: false, trackedEntityAttribute: { id: 'dob' } }];
    const dataElements = [{ displayInReports: true, dataElement: { id: 'grade' } }, { displayInReports: false, dataElement: { id: 'ecce' } }];

    assert.equal(showsListColumnsOnly('attendance'), true);
    assert.equal(showsListColumnsOnly('enrollment'), false);
    assert.equal(showsListColumnsOnly('performance'), false);
    assert.deepEqual(listAttributes(attributes).map(x => x.trackedEntityAttribute.id), ['first']);
    assert.deepEqual(reportDataElements(dataElements).map(x => x.dataElement.id), ['grade']);
});

test('the period of an export is limited to the academic year of the school calendar (SEMIS-214)', () => {
    const { minDate, maxDate } = academicYearDates({ academicYear: { startDate: '2025-09-01', endDate: '2026-07-31' } });

    assert.equal(minDate.toDateString(), new Date(2025, 8, 1).toDateString());
    assert.equal(maxDate.toDateString(), new Date(2026, 6, 31).toDateString());
    assert.equal(dateWithin(new Date(2026, 9, 20), minDate, maxDate), maxDate);
    assert.equal(dateWithin(new Date(2025, 0, 1), minDate, maxDate), minDate);
    assert.deepEqual(academicYearDates(undefined), { minDate: undefined, maxDate: undefined });
});
