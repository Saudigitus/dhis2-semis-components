export function splitArrayIntoChunks(array: any[], chunkSize: number): any[] {
    const result: any = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}
