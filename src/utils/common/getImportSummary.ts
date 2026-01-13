import { trackerTypes } from "../constants/trackerTypes";

export function importSummary(summary: any, updatedStats: any) {
    let byTypeCopy = [...(updatedStats?.byType ?? [])]

    // Handle both VALIDATE and COMMIT response structures
    // VALIDATE mode: Check for validationReport or if stats are missing
    const bundleReport = summary.bundleReport?.typeReportMap || summary.validationReport?.typeReportMap

    // Debug logging
    console.log('=== Import Summary Debug ===')
    console.log('Bundle Report:', bundleReport)
    console.log('Existing Stats:', updatedStats?.stats)

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

        // Only update if there's actual data for this tracker type or it already exists
        if (index > -1 || (elementStats?.created || elementStats?.updated || elementStats?.ignored || elementStats?.total)) {
            if (index > -1) byTypeCopy[index] = data
            else byTypeCopy.push(data)
        }
    }

    // Use TRACKED_ENTITY stats for the summary cards (actual student/staff count)
    // instead of the total of all tracker objects (entities + enrollments + events)
    const trackedEntityStats = bundleReport?.TRACKED_ENTITY?.stats || {}

    console.log('TRACKED_ENTITY stats for cards:', trackedEntityStats)
    console.log('Current accumulated stats before adding:', updatedStats?.stats)

    return {
        ...updatedStats,
        stats: {
            created: (updatedStats?.stats?.created || 0) + (trackedEntityStats?.created || 0),
            ignored: (updatedStats?.stats?.ignored || 0) + (trackedEntityStats?.ignored || 0),
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