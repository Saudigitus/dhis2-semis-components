import classNames from 'classnames';
import Badge from '../../../badge/Badge';
import style from "../sideBar.module.css"
import { SideBarSubItemProps } from '../../../../types/sideBar/SideBarTypes';

export default function SideBarSubItem(props: SideBarSubItemProps) {
    const { icon, label, showBadge, disabled, appUrl, active } = props
   
    return (
        <a href={appUrl} className={style.subItemLink}>
            <li className={active ? style.sideBarSubItemContainerActive : classNames(style.sideBarSubItemContainer, (Boolean(disabled)) && style.sideBarDisabledSubItem)}>
                <img src={icon} /> <span className={style.sideBarSubItemLabel}>{label}</span>
                {showBadge ? <div className={style.badgeContainer}><Badge value='10' /></div> : null}
                <div className={style.tooltipContainer}>
                    {label}
                </div>
            </li>
        </a>
    )
}
