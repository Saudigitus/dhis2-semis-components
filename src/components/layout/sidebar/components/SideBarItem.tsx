import React from 'react'
import style from "../sideBar.module.css"
import SideBarSubItem from './SideBarSubItem'
import SideBarItemTitle from './SideBarItemTitle'
import { SideBarItemProps } from '../../../../types/sideBar/SideBarTypes';

export default function SideBarItem(props: SideBarItemProps): React.ReactElement {
    const { title, subItems } = props;

    return (
        <section className={style.sideBarItemContainer}>
            <SideBarItemTitle title={title} />
            <ul className={style.sideBarItemListContainer}>
                {subItems?.filter((subItem) => subItem.displayInMenu).map((subItem, index: number) => (
                    <SideBarSubItem key={index} {...subItem}/>
                ))}
            </ul>
        </section>
    )
}