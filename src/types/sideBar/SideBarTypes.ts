interface SideBarProps {
    collapsed?: boolean
    sideBarData: SideBarItemProps[]
}

interface SideBarItemProps {
    title: string
    displayInMenu?: boolean
    subItems: SideBarSubItemProps[]
}


interface SideBarItemTitleProps {
    title: string
}

interface SideBarSubItemProps {
    label: string
    displayInMenu?: boolean
    showBadge: boolean
    icon: string
    disabled: boolean
    route: string
    appName: string
    appUrl: string
    active: boolean
}

interface SideBarCollapseProps {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}
export type { SideBarProps, SideBarItemProps,  SideBarItemTitleProps, SideBarSubItemProps, SideBarCollapseProps }
