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
const { absentCode, reasonCodes, withReason, splitStatus } = loadTs('../src/utils/common/absenceReason.ts');
const { attendanceFormater } = (() => {
    const compiled = { exports: {} };
    const js = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/utils/format/formatData.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    new Function('module', 'exports', 'require', js)(compiled, compiled.exports, name => name.startsWith('.') ? loadTs(path.join('../src/utils/format', `${name}.ts`)) : require(name));
    return compiled.exports;
})();

const attendance = { status: 'st', absenceReason: 'rs', statusOptions: [{ code: 'present', configKey: 'presentCode' }, { code: 'late', configKey: 'lateCode' }, { code: 'abs', configKey: 'absentCode' }] };
const stage = { programStageDataElements: [{ dataElement: { id: 'st' } }, { dataElement: { id: 'rs', optionSet: { options: [{ value: 'SICK' }, { value: 'OTHER REASON' }] } } }] };

test('the option mapped as absence (configKey) and the reasons come from the configuration (SEMIS-214)', () => {
    assert.equal(absentCode(attendance), 'abs');
    assert.deepEqual(reasonCodes(stage, 'rs'), ['SICK', 'OTHER REASON']);
    assert.deepEqual(reasonCodes(stage, undefined), []);
});

test('a cell holds the option and the reason of absence (SEMIS-214, SEMIS-215)', () => {
    assert.equal(withReason('abs', 'SICK'), 'abs | SICK');
    assert.equal(withReason('abs', ''), 'abs');
    assert.deepEqual(splitStatus('abs | OTHER REASON'), { status: 'abs', reason: 'OTHER REASON' });
    assert.deepEqual(splitStatus('late'), { status: 'late' });
    assert.deepEqual(splitStatus(' abs '), { status: 'abs' });
});

test('export: an absence is written with its reason, other options as they are (SEMIS-214)', () => {
    const cells = attendanceFormater([
        { occurredAt: '2025-10-10T00:00:00.000', dataValues: [{ dataElement: 'st', value: 'abs' }, { dataElement: 'rs', value: 'SICK' }] },
        { occurredAt: '2025-10-13T00:00:00.000', dataValues: [{ dataElement: 'st', value: 'abs' }] },
        { occurredAt: '2025-10-14T00:00:00.000', dataValues: [{ dataElement: 'st', value: 'late' }, { dataElement: 'rs', value: 'SICK' }] },
        { occurredAt: '2025-10-15T00:00:00.000', dataValues: [{ dataElement: 'other', value: 'x' }] },
    ], attendance);
    assert.deepEqual(cells, { '2025-10-10': 'abs | SICK', '2025-10-13': 'abs', '2025-10-14': 'late', '2025-10-15': '' });
});
