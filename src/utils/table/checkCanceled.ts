import { EnrollmentStatus } from "../../types/api/WithRegistrationTypes"

export function checkCanceled(status: string): boolean {
    return EnrollmentStatus.CANCELLED === status
}

export function checkOwnershipOu(ownershipOu: string, selectedOu: string): boolean {
    return ownershipOu === selectedOu
}