export function objectComparison(initialValues: any, newValues: any) {
    const keys1 = Object.keys(initialValues);
    const keys2 = Object.keys(newValues);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => newValues.hasOwnProperty(key) && initialValues[key] === newValues[key]);
}

