// Separator of the values of a drop-down list while the file is built (the values are then
// written one per cell in the "Validation" sheet). Option codes can hold commas ("Yes, a lot of
// difficulty"), so a line break is used: it never appears in an option code.
export const FILTER_SEPARATOR = "\n"

export function getFilterLables(
    options: { value: string; label: string }[],
    configuredOtpions?: { code: string }[]
): string {
    const configuredCodes = new Set(
        configuredOtpions?.map(option => option.code) ?? []
    )

    return options
        .filter(option =>
            configuredCodes.size === 0 || configuredCodes.has(option.value)
        )
        .map(option => option.value)
        .join(FILTER_SEPARATOR)
}
