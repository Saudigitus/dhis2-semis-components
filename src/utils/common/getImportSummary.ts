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