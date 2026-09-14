const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { createForm } = require('final-form');
const source = fs.readFileSync(path.join(__dirname, '../src/utils/form/syncRuleValues.ts'), 'utf8');
const compiled = { exports: {} };
new Function('module', 'exports', ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText)(compiled, compiled.exports);
const { syncRuleValues } = compiled.exports;
const field = value => [{ fields: [{ name: 'x', ruleAssigned: true, value }] }];

test('clears expired assignments, including false and zero, only once', () => {
    for (const value of [false, 0, 'assigned']) {
        const form = createForm({ onSubmit() {}, initialValues: { other: 'keep' } });
        let previous = syncRuleValues(form, field(value), new Map());
        assert.equal(form.getState().values.x, value);
        previous = syncRuleValues(form, [{ fields: [{ name: 'x' }] }], previous);
        assert.equal(form.getState().values.x, '');
        assert.equal(form.getState().values.other, 'keep');
        form.change('x', 'manual');
        syncRuleValues(form, [], previous);
        assert.equal(form.getState().values.x, 'manual');
    }
});

test('preserves subsequent manual edits and replaces active assignments', () => {
    const form = createForm({ onSubmit() {} });
    let previous = syncRuleValues(form, field('first'), new Map());
    previous = syncRuleValues(form, field('second'), previous);
    assert.equal(form.getState().values.x, 'second');
    form.change('x', 'manual');
    syncRuleValues(form, [], previous);
    assert.equal(form.getState().values.x, 'manual');
});

test('hidden fields clear assigned values even when not rendered', () => {
    const form = createForm({ onSubmit() {} });
    const previous = syncRuleValues(form, field('first'), new Map());
    const next = syncRuleValues(form, [{ visible: false, fields: [{ name: 'x', ruleHidden: true }] }], previous);
    assert.equal(form.getState().values.x, '');
    assert.equal(next.size, 0);
});
