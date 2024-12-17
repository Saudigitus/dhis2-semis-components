import { Menu, MenuItem } from '@dhis2-ui/menu'
import { Help, Input, OrganisationUnitTree } from '@dhis2/ui'
import style from "../mainHeader.module.css"
import { useState } from 'react'

export const MenuSelect = ({ values, selected, onChange, isSeachable, placeholder }) => {
    const [query, setQuery] = useState<string>("")

    const filteredMenuItems: [] = query.length > 0
        ? values.filter(item => item.label.includes(query)) || []
        : values;

    return (
        <div style={{ width: 400 }} className={style.HeaderMenu}>
            <Menu>
                {isSeachable && <div className={style.SimpleSearcInputContainer} onClick={(e) => e.stopPropagation()} >
                    <Input onChange={(event) => setQuery(event.value)} placeholder={placeholder} name="input" />
                </div>}
                {filteredMenuItems.length > 0 ? filteredMenuItems.map(({ value, label }) => (
                    <MenuItem
                        key={value}
                        label={label}
                        active={selected === value}
                        onClick={() => onChange({ selected: value })}
                    />
                ))
                    :
                    <div className={style.NoOPtionArea} onClick={(e) => e.stopPropagation()}>
                        <Help>No options</Help>
                    </div>}
            </Menu>
        </div>
    )
}

export const OrgUnitSelect = ({ onChange, selected }) => {
    return (
        <div style={{ width: 400, minHeight: 400, maxHeight: '70vh' }}>
            <OrganisationUnitTree
                singleSelection
                onChange={onChange}
                roots={['A0000000000']}
                selected={selected}
            />
        </div>
    )
}