import style from "../layout.module.css"
import { Center, CircularLoader } from "@dhis2/ui";
import { FullLayoutProps } from '../../../types/layout/LayoutProps';

export default function FullLayout(props: FullLayoutProps) {
    const { children, sidebar, header, loading } = props

    if (loading) {
        return (
            <Center>
                <CircularLoader />
            </Center>
        )
    }

    return (
        <div className={style.layoutContainer}>
            {header}
            <div className={style.fullLayoutContainer}>
                {sidebar}
                <main className={style.fullLayoutContent}>
                    {children}
                </main>
            </div>
        </div>
    )
}
