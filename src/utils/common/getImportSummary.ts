import { trackerTypes } from "../constants/trackerTypes";

export function importSummary(summary: any, updatedStats: any) {
    let byTypeCopy = [...(updatedStats?.byType ?? [])]

    for (const element of trackerTypes) {
        const index = byTypeCopy.findIndex(x => x?.trackerType === element)

        const data = {
            trackerType: element,
            created: (byTypeCopy?.[index]?.created ?? 0)
                + (summary.bundleReport?.typeReportMap?.[element]?.stats?.created || 0),

            ignored: (byTypeCopy?.[index]?.ignored ?? 0)
                + (summary.bundleReport?.typeReportMap?.[element]?.stats?.ignored || 0),

            updated: (byTypeCopy?.[index]?.updated ?? 0)
                + (summary.bundleReport?.typeReportMap?.[element]?.stats?.updated || 0),

            total: (byTypeCopy?.[index]?.total ?? 0)
                + (summary.bundleReport?.typeReportMap?.[element]?.stats?.total || 0),
        }

        if (index > -1) byTypeCopy[index] = data
        else byTypeCopy.push(data)
    }

    return {
        ...updatedStats,
        stats: {
            created: updatedStats?.stats?.created + (summary?.stats?.created || 0),
            ignored: updatedStats?.stats?.ignored + (summary?.stats?.ignored || 0),
            updated: updatedStats?.stats?.updated + (summary?.stats?.updated || 0),
            total: updatedStats?.stats?.total + (summary?.stats?.total || 0)
        },
        errorDetails: [
            ...(updatedStats?.errorDetails || []),
            ...(summary?.validationReport?.errorReports || []),
        ],
        warningDetails: [
            ...(updatedStats?.warningDetails || []),
            ...(summary?.validationReport?.warningReports || []),
        ],
        byType: byTypeCopy
    };
}

// Joins the stats of two imports of the same run (for example the events and the
// enrollments of Final result), so that the summary shows both and not only the last one.
export function mergeImportStats(first: any, second: any) {
    const byType = [...(first?.byType ?? [])].map((row: any) => ({ ...row }))

    for (const row of (second?.byType ?? [])) {
        const index = byType.findIndex((x: any) => x?.trackerType === row?.trackerType)
        if (index === -1) byType.push({ ...row })
        else for (const key of ["created", "ignored", "updated", "total"])
            byType[index][key] = (byType[index][key] ?? 0) + (row?.[key] ?? 0)
    }

    const sum = (key: string) => (first?.stats?.[key] ?? 0) + (second?.stats?.[key] ?? 0)

    return {
        stats: { created: sum("created"), ignored: sum("ignored"), updated: sum("updated"), total: sum("total") },
        errorDetails: [...(first?.errorDetails ?? []), ...(second?.errorDetails ?? [])],
        warningDetails: [...(first?.warningDetails ?? []), ...(second?.warningDetails ?? [])],
        exceptions: [...(first?.exceptions ?? []), ...(second?.exceptions ?? [])],
        byType
    }
}
