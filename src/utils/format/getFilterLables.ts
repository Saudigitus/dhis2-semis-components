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
        .join(",")
}