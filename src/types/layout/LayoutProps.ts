interface BaseLayoutProps {
    loading?: boolean
    children: React.ReactNode
}

/**
 * Interface representing the properties for a full layout component.
 * Extends the BaseLayoutProps interface.
 *
 * @interface FullLayoutProps
 * @extends BaseLayoutProps
 *
 * @property {React.ReactNode} header - The header component of the layout.
 * @property {React.ReactNode} sidebar - The sidebar component of the layout.
 */
interface FullLayoutProps extends BaseLayoutProps {
    header: React.ReactNode
    sidebar: React.ReactNode
}

interface HeaderBarLayoutProps extends BaseLayoutProps {
    header: React.ReactNode
}

interface SidebarLayoutProps extends BaseLayoutProps {
    sidebar: React.ReactNode
}

interface SimpleLayoutProps extends BaseLayoutProps { }


export type { FullLayoutProps, HeaderBarLayoutProps, SidebarLayoutProps, SimpleLayoutProps }