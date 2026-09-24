import type { FormApi } from 'final-form';

/** Track assignments per form, including fields unmounted by visibility rules. */
export function syncRuleValues(form: FormApi<any>, items: any[], previous: Map<string, unknown>) {
    const assigned = new Map<string, unknown>();
    const hidden = new Set<string>();
    const visit = (fields: any[]) => fields?.forEach(field => {
        const children = ['fields', 'variables', 'variable'].filter(key => Array.isArray(field[key]));
        if (children.length) children.forEach(key => visit(field[key]));
        else {
            const name = field.name ?? field.id;
            if (field.ruleHidden) hidden.add(name);
            else if (field.ruleAssigned) assigned.set(name, field.value);
        }
    });
    visit(items);
    form.batch(() => {
        for (const [name, value] of previous) {
            if (!assigned.has(name) && Object.is(form.getState().values[name], value)) {
                form.change(name, '');
            }
        }
        for (const [name, value] of assigned) {
            if (!Object.is(form.getState().values[name], value)) form.change(name, value);
        }
        for (const name of hidden) {
            const value = form.getState().values[name];
            if (value !== '' && value != null) form.change(name, '');
            assigned.delete(name);
        }
    });
    return assigned;
}
