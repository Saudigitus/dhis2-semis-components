import classNames from 'classnames';
import Badge from '../../badge/Badge';
import style from "../sideBar.module.css"
import { SideBarSubItemProps } from '../../../types/sideBar/SideBarTypes';

export default function SideBarSubItem(props: SideBarSubItemProps) {
    const { icon, label, badgeInfo, disabled, appUrl, active, action } = props

    return (
        <div data-test={label.toLocaleLowerCase()} onClick={action} className={style.subItemLink}>
            <li className={active ? style.sideBarSubItemContainerActive : classNames(style.sideBarSubItemContainer, (Boolean(disabled)) && style.sideBarDisabledSubItem)}>
                <img src={icon} /> <span className={style.sideBarSubItemLabel}>{label}</span>
                {badgeInfo ? <div className={style.badgeContainer}><Badge value={badgeInfo} /></div> : null}
                <div data-test={label} className={style.tooltipContainer}>
                    {label}
                </div>
            </li>
        </div>
    )
}
