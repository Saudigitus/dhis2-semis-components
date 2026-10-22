import React, { useState } from 'react'
import style from "./sideBar.module.css"
import SideBarItem from './components/SideBarItem'
import SibeBarCollapseBtn from './components/SibeBarCollapseBtn';
import { SideBarItemProps, SideBarProps } from '../../types/sideBar/SideBarTypes';

export default function SideBar(props: SideBarProps): React.ReactElement {
    const { sideBarData, collapsed: isCollapsed = true, sideBarBtnPosition = "top", stickLastItemToBottom = false, footer } = props;
    const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

    return (
        <aside className={`${collapsed ? style.sideBarContainerCollapsed : style.sideBarContainer} ${footer ? style.sideBarWithFooter : ''}`}>
            <div className={stickLastItemToBottom ? style.sideBarMenuSticked : style.sideBarMenu}>
                {
                    sideBarData?.filter((element: SideBarItemProps) => element.displayInMenu).map((element: SideBarItemProps, index: number) => (
                        <SideBarItem key={index} title={element.title} subItems={element.subItems} />
                    ))
                }
            </div>
            {footer && !collapsed && <div className={style.sideBarFooter}>{footer}</div>}
            <SibeBarCollapseBtn collapsed={collapsed} setCollapsed={setCollapsed} sideBarBtnPosition={sideBarBtnPosition} />
        </aside>
    )
}