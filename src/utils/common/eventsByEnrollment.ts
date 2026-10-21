// Helpers to read the records of a whole class with a few requests (many enrollments per
// request, with paging) instead of one request per person and per program stage.

// Keeps the request URL short: 50 ids of 11 characters.
export const IDS_PER_REQUEST = 50
export const EVENTS_PAGE_SIZE = 200

export function chunkList<T>(list: T[], size: number = IDS_PER_REQUEST): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < list.length; i += size) chunks.push(list.slice(i, i + size))
    return chunks
}

export function groupByEnrollment(events: any[]): Record<string, any[]> {
    const grouped: Record<string, any[]> = {}
    for (const event of events ?? []) {
        if (!event?.enrollment) continue
        grouped[event.enrollment] ??= []
        grouped[event.enrollment].push(event)
    }
    return grouped
}

// Reads the events of one program stage for the given enrollments, in groups and with paging.
// "params" holds the other filters of the request (program, program stage, school, dates...).
export async function readEventsByEnrollments(
    getEvents: (params: any) => Promise<any>,
    params: Record<string, any>,
    enrollments: string[],
    perRequest: number = IDS_PER_REQUEST,
    pageSize: number = EVENTS_PAGE_SIZE
): Promise<any[]> {
    const events: any[] = []

    for (const ids of chunkList([...new Set(enrollments.filter(Boolean))], perRequest)) {
        let page = 1, received: any[] = []
        do {
            received = (await getEvents({ ...params, enrollments: ids.join(","), page, pageSize })) ?? []
            events.push(...received)
            page++
        } while (received.length === pageSize)
    }
    return events
}
