export function formatKeyValueTypeHeader(variables: any[]) {
    const keys: any = {}
    for (const variable of variables) {
        keys[variable.id] = variable.valueType
    }
    return keys
}
