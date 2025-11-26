export function transformObjectKeys(obj: any) {
    const newObj = { ...obj };

    Object.keys(newObj).forEach(key => {
        const dotCount = (key.match(/\./g) || []).length;
        if (dotCount === 2) {
            // Split the key: e.g., "dataElement.stage.eventId" -> ["dataElement", "stage", "eventId"]
            const parts = key.split('.');
            if (parts.length === 3) {
                // Combine first two parts: "dataElement" + "." + "stage"
                const newKey = `${parts[0]}.${parts[1]}`;
                newObj[newKey] = newObj[key]; // Move value to new key
                delete newObj[key]; // Remove original
            }
        }
    });

    return newObj;
}