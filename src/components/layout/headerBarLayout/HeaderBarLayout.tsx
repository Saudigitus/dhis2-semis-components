import style from "../layout.module.css"
import { Center, CircularLoader } from "@dhis2/ui";
import { HeaderBarLayoutProps } from '../../../types/layout/LayoutProps';

export default function HeaderBarLayout(props: HeaderBarLayoutProps) {
    const { header, children, loading } = props;

    if (loading) {
        return (
            <Center>
                <CircularLoader />
            </Center>
        )
    }
    
    return (
        <div className={style.layoutContainer}>
            <div className={style.headerBarLayoutContainer}>
                {header}
                <main className={style.mainContentContainer}>
                    {children}
                </main>
            </div>
        </div>
    )
}