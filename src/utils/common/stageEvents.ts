// Records of a program stage sent by the bulk import (Performance, Final result): one per person and
// stage of the file. An unchanged file must change nothing on the server.

type DataValue = { dataElement: string, value: any }
type StageEvent = { event?: string, occurredAt?: string, dataValues?: DataValue[], [key: string]: any }

// The record that already exists for the person and stage keeps its id, its date and its status
// (without the status the server sets a completed record back to ACTIVE).
export function withExistingEvent(event: StageEvent, existing?: { event?: string, occurredAt?: string, status?: string }): StageEvent {
    if (!existing?.event) return event
    return {
        ...event,
        event: existing.event,
        ...(existing.occurredAt ? { occurredAt: String(existing.occurredAt).slice(0, 10) } : {}),
        ...(existing.status ? { status: existing.status } : {}),
    }
}

// Only records with at least one value of the file are sent: an empty row neither creates an empty
// record nor touches the existing one (empty cells do not remove values).
export function eventsWithValues(events: StageEvent[] = []): StageEvent[] {
    return events.filter(event => (event?.dataValues ?? []).length > 0)
}
