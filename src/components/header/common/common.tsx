import React from 'react'
import { Menu, MenuItem } from '@dhis2-ui/menu'
import { OrganisationUnitTree } from '@dhis2/ui'

export const MenuSelect = ({ values, selected, onChange }) => {
    return (
        <div style={{ width: 400 }}>
            <Menu>
                {values.map(({ value, label }) => (
                    <MenuItem
                        key={value}
                        label={label}
                        active={selected === value}
                        onClick={() => onChange({ selected: value })}
                    />
                ))}
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