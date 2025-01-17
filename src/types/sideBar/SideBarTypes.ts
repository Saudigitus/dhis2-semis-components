import { ReactNode } from "react"
interface SideBarProps {
    /**
     * Defines if side bar must show icons and labels or only icons.
     * If true side bar shows only side bar icons. 
     * Optional
     * @type {?boolean}
     */
    collapsed?: boolean
    /**
     * Side bar estructure items.
     * @type {SideBarItemProps[]}
     */
    sideBarData: SideBarItemProps[]
}

interface SideBarItemProps {
    /**
     * Text label to display in each group of side bar.
     * @type {string}
     */
    title: string
    /**
     * Defines if group of side bar must be displayed or not in the side bar menu.
     * @type {?boolean}
     */
    displayInMenu?: boolean
    /**
     * An array of the clickable items or module links of the side bar menu.
     * @type {SideBarSubItemProps[]}
     */
    subItems: SideBarSubItemProps[]
}


interface SideBarItemTitleProps {
    /**
     * Text label to display in each group of side bar.
     * @type {string}
     */
    title: string
}

interface SideBarSubItemProps {
    /**
     * Text to display in each side bar subItem (clickable items or module links)
     * @type {string}
     */
    label: string
    /**
     *  Defines if a subItem of side bar must be displayed or not in the side bar menu.
     * @type {?boolean}
     */
    displayInMenu?: boolean
    /**
     * An important information to display aside the side bar subItem label
     * @type {string}
     */
    badgeInfo: string
    /**
     * The side bar menu icon.
     * @type {string}
     */
    icon: string
    /**
     * Defines if the menu is clickable
     * @type {boolean}
     */
    disabled: boolean
    /**
     * The represented module route.
     * @type {string}
     */
    route: string
    /**
     * The represented module name.
     * @type {string}
     */
    appName: string
    /**
     * The represented module url.
     * @type {string}
     */
    appUrl: string
    /**
     * Indicates if the side bar sub item is the one that is openend at the moment. If true the menu will have a diferent background.
     * @type {boolean}
     */
    active: boolean
    /**
      * The action trigged after click the module item
      * @type {void}
      */
    action: () => void
}

/**
 * Props for the `SideBarNavWrapper` component.
 * @interface SideBarNavWrapperProps
 * @property {ReactNode} children - The child elements to be rendered within the wrapper.
 * @property {string} [className] - Optional CSS class name(s) to style the wrapper.
 */
interface SideBarNavWrapperProps {
    children: ReactNode;
    className?: string;
}


interface SideBarCollapseProps {
    /**
     * Indicates the side bar mode.
     * @type {boolean}
     */
    collapsed: boolean
    /**
     * To collapse the side bar.
     * @type {(collapsed: boolean) => void}
     */
    setCollapsed: (collapsed: boolean) => void
}
export type { SideBarProps, SideBarItemProps, SideBarItemTitleProps, SideBarSubItemProps, SideBarCollapseProps, SideBarNavWrapperProps }
