import { useState } from "react"
import { HeaderItemProps, OptionProps } from "../../../types/header/headerTypes"
import style from "../mainHeader.module.css"
import { DropdownButton, FlyoutMenu, Input } from "@dhis2/ui"
import classNames from "classnames"
import "../globalStyle.css"
import MenuItemContainer from "./menuIten"

const HeaderItem = ({ headerItem }: { headerItem: HeaderItemProps }) => {
    const [expand, setExpand] = useState<boolean>(false)
    const { customAction, icon, isSeachable = true, label,
        searchInputPlaceholder, value, valuePlaceholder,
        onSelectOption = () => { }, withDropDown = true,
        align = "left" } = headerItem
    const [selected, setSelected] = useState<OptionProps | null>(null)

    const toggleExpand = () => {
        setExpand(!expand)
    }

    const searchedOptions: OptionProps[] = headerItem.options || []

    const WitDropDown = () => {
        const [query, setQuery] = useState<string>("")

        const onSearch = (event: any) => {
            setQuery(event?.value)
        }

        const filteredMenuItems = query.length > 0
            ? searchedOptions.filter(item => item.label.includes(query)) || []
            : searchedOptions;

        return (<DropdownButton
            component={
                <FlyoutMenu>
                    <div className={classNames(style.SimpleSearchContainer)}>
                        {isSeachable && <div className={style.SimpleSearcInputContainer}>
                            <Input value={query} onChange={onSearch} placeholder={searchInputPlaceholder} name="input" />
                        </div>}
                        <div className={style.ChildrenContentContainer}>
                            <MenuItemContainer onSelectOption={onSelectOption} onToggle={toggleExpand} setSelected={setSelected} options={filteredMenuItems} />
                        </div>
                    </div>
                </FlyoutMenu >
            }
            open={expand}
            onClick={toggleExpand}
            className={style.HeaderItemContainer}
        >
            {icon && <span className={style.IconContent}>{icon}</span>}
            <span className={style.LabelContent}>{label ?? ""}</span>
            <span className={style.ValueContent}>{value ?? selected?.value ?? valuePlaceholder ?? ""}</span>
        </DropdownButton>)
    }

    return (
        withDropDown ? <WitDropDown /> :
            <div onClick={customAction} className={classNames(style.HeaderItemContainer,
                withDropDown ? style.ShowDropDown : style.HideDropDown)}>
                {icon && <span className={style.IconContent}>{icon}</span>}
                <span className={style.LabelContent}>{label ?? ""}</span>
                <span className={style.ValueContent}>{value ?? valuePlaceholder ?? ""}</span>
            </div>
    )
}

export default HeaderItem