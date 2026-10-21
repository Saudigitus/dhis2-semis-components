import { FILTER_SEPARATOR } from "../format/getFilterLables";

export function generateValidationSheet(options: any) {
    const keys = Object.keys(options)
    let validationRows: any = []
    let headers: any = []


    for (const key of keys) {
        const values = options[key].split(FILTER_SEPARATOR).map((item: string) => item.trim())

        headers.push({
            header: key,
            key: key,
            width: '20',
        })

        for (let index = 0; index < values.length; index++) {
            validationRows[index] = { ...(validationRows[index] ?? {}), [key]: values[index] }
        }
    }


    return { validationRows, validationHeaders: headers }
}