import React from 'react';
import classNames from 'classnames';
import Badge from '../../../badge/Badge';
import style from "../sideBar.module.css"
import { Link } from 'react-router-dom';
import { SideBarSubItemProps } from '../../../../types/sideBar/SideBarTypes';

export default function SideBarSubItem(props: SideBarSubItemProps) {
    const { icon, label, badgeInfo, disabled, appUrl, active } = props

    return (
        <Link to={appUrl} className={style.subItemLink}>
            <li className={active ? style.sideBarSubItemContainerActive : classNames(style.sideBarSubItemContainer, (Boolean(disabled)) && style.sideBarDisabledSubItem)}>
                <img src={icon} /> <span className={style.sideBarSubItemLabel}>{label}</span>
                {badgeInfo ? <div className={style.badgeContainer}><Badge value={badgeInfo} /></div> : null}
                <div className={style.tooltipContainer}>
                    {label}
                </div>
            </li>
        </Link>
    )
}
