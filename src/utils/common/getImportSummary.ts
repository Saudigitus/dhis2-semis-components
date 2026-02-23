import { trackerTypes } from "../constants/trackerTypes";

export function importSummary(summary: any, updatedStats: any) {
    let byTypeCopy = [...(updatedStats?.byType ?? [])]

    const bundleReport = summary.bundleReport?.typeReportMap || summary.validationReport?.typeReportMap

    for (const element of trackerTypes) {
        const index = byTypeCopy.findIndex(x => x?.trackerType === element)

        const elementStats = bundleReport?.[element]?.stats

        console.log(`${element} stats:`, elementStats)

        const data = {
            trackerType: element,
            created: (byTypeCopy?.[index]?.created ?? 0)
                + (elementStats?.created || 0),

            ignored: (byTypeCopy?.[index]?.ignored ?? 0)
                + (elementStats?.ignored || 0),

            updated: (byTypeCopy?.[index]?.updated ?? 0)
                + (elementStats?.updated || 0),

            total: (byTypeCopy?.[index]?.total ?? 0)
                + (elementStats?.total || 0),
        }

        if (index > -1 || (elementStats?.created || elementStats?.updated || elementStats?.ignored || elementStats?.total)) {
            if (index > -1) byTypeCopy[index] = data
            else byTypeCopy.push(data)
        }
    }

    const trackedEntityStats = bundleReport?.TRACKED_ENTITY?.stats || {}
    const ignoredAcrossTrackerTypes = trackerTypes.reduce((acc, trackerType) => {
        return acc + (bundleReport?.[trackerType]?.stats?.ignored || 0)
    }, 0)


    return {
        ...updatedStats,
        stats: {
            created: (updatedStats?.stats?.created || 0) + (trackedEntityStats?.created || 0),
            ignored: (updatedStats?.stats?.ignored || 0) + ignoredAcrossTrackerTypes,
            updated: (updatedStats?.stats?.updated || 0) + (trackedEntityStats?.updated || 0),
            total: (updatedStats?.stats?.total || 0) + (trackedEntityStats?.total || 0)
        },
        errorDetails: [
            ...(updatedStats?.errorDetails || []),
            ...(summary?.validationReport?.errorReports || []),
        ],
        byType: byTypeCopy
    };
}
