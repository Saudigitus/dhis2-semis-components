interface OrgUnitTreeComponentProps {
    onToggle: () => void
}

interface OuFieldProps {
    name: string
}

interface SelectedOuType {
    id: string
    displayName: string
    selected: any
    path?: string
}

interface OuTeiSearchResponseType {
    teiSearchOrganisationUnits: {
        id: string
        displayName: string
    }[]
}

interface OuResponseType {
    organisationUnits: {
        id: string
        displayName: string
    }[]
}

export type { OrgUnitTreeComponentProps, OuFieldProps, SelectedOuType, OuTeiSearchResponseType, OuResponseType }