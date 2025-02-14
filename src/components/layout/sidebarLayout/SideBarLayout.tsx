import style from "../layout.module.css"
import { Center, CircularLoader } from "@dhis2/ui";
import { SidebarLayoutProps } from "../../../types/layout/LayoutProps"

const SideBarLayout = (props: SidebarLayoutProps) => {
const { sidebar, children, loading } = props

    if (loading) {
        return (
            <Center>
                <CircularLoader />
            </Center>
        )
    }

    return (
        <div className={style.layoutContainer}>
            <aside className={style.asideContainer}>
                {sidebar}
            </aside>
            <main className={style.mainContentContainer}>
                {children}
            </main>
        </div>
    )
}

export default SideBarLayout