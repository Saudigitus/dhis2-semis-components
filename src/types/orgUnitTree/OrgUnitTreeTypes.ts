interface OrgUnitTreeProps {
    onToggle: () => void
}

interface OrgUnitTreeComponentProps {
    roots: Array<any>,
    classes?: {
        orgunitTree: string,
    },
    onSelectClick: any,
    treeKey: string,
    previousOrgUnitId?: Object
};

export type { OrgUnitTreeProps, OrgUnitTreeComponentProps }