// Final result files: same rule as "Assign final result" on screen. The decision is the data element
// of the final result configuration; a decision listed as dropout cancels the enrollment, any other
// decision completes it. Rows without a decision do not change the enrollment.

const text = (value: any) => value === undefined || value === null ? "" : String(value).trim()

// The decision of the row ("<final result stage>.<decision data element>" in any section of the file).
export function finalDecision(row: any, sections: string[], decisionKey: string): string {
    for (const section of sections) {
        const value = text(row?.[section]?.[decisionKey])
        if (value) return value
    }
    return ""
}

export function enrollmentStatusOf(decision: string, finalResultConfig: any): "CANCELLED" | "COMPLETED" {
    return (finalResultConfig?.dropoutStatusValues ?? []).map(text).includes(text(decision)) ? "CANCELLED" : "COMPLETED"
}

// The enrollment keeps its dates and school as saved on the server; only the status changes.
export function finalResultEnrollment(update: any, server?: { enrolledAt?: string, occurredAt?: string, orgUnit?: string }) {
    return {
        ...update,
        orgUnit: server?.orgUnit ?? update?.orgUnit,
        ...(server?.enrolledAt ? { enrolledAt: server.enrolledAt } : {}),
        ...(server?.occurredAt ? { occurredAt: server.occurredAt } : {}),
    }
}
