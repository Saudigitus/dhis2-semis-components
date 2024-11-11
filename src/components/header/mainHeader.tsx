import { MainHeaderProps } from "../../types/header/headerTypes"
import HeaderItem from "./components/headerItem"
import style from "./mainHeader.module.css"
import SemisHeader from "./semisHeader"

const MainHeader = ({ height, padding, position, width, headerItems, semisHeader }: MainHeaderProps) => {

    const rightAligned = headerItems?.filter(item => item.align === "right") || [];
    const leftOrAlign = headerItems?.filter(item => item.align !== "right" || !("align" in item)) || [];

    return (
        <nav className={style.MainHeaderContainer} style={{ padding, width, height, position }}>
            {
                semisHeader ? <SemisHeader headerItems={semisHeader} /> :
                    <>
                        <div className={style.leftContent}>
                            {
                                leftOrAlign?.map((headerItem) => (
                                    <HeaderItem headerItem={headerItem} />
                                ))
                            }
                        </div>
                        <div className={style.righContent}>
                            {
                                rightAligned?.map((headerItem) => (
                                    <HeaderItem headerItem={headerItem} />
                                ))
                            }
                        </div>
                    </>
            }
        </nav>
    )
}

export default MainHeader