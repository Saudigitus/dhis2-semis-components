import { Menu, MenuItem } from '@dhis2-ui/menu'
import { Help, Input, OrganisationUnitTree } from '@dhis2/ui'
import style from "../mainHeader.module.css"
import { useEffect, useState } from 'react'
import { RulesEngine, useUrlParams } from 'dhis2-semis-functions'

export const MenuSelect = ({ values, selected, onChange, isSeachable, placeholder, program, dataElelementId }) => {
    const [query, setQuery] = useState<string>("")
    const { urlParameters } = useUrlParams()
    const { school } = urlParameters()

    const value: any = { ...{ [dataElelementId]: selected }, orgUnit: school }
    const variable = [{
        "id": dataElelementId,
        "name": dataElelementId,
        "options": {
            "optionSet": {
                "options": values,
            }
        },
        "initialOptions": {
            "optionSet": {
                "options": values,
            }
        }
    }]

    const { runRulesEngine, updatedVariables } = RulesEngine({
        program: program?.id,
        type: "programStage",
        values: { ...{ [dataElelementId]: selected }, orgUnit: school },
        variables: variable || []
    })

    useEffect(() => {
        console.log("Running rules engine with values:", value)
        runRulesEngine({ overrideVariables: variable || [] })
    }, [])

    console.log("program:", program)
    console.log("Data element ID:", variable)
    console.log("Updated variables:", variable)
    console.log("Selected value:", selected)

    console.log(updatedVariables)

    const filteredMenuItems: [] = query.length > 0
        ? variable?.[0]?.options?.optionSet?.options?.filter(item => item.label.includes(query)) || []
        : variable?.[0]?.options?.optionSet?.options;

    return (
        <div className={style.HeaderMenu}>
            <Menu>
                {isSeachable && <div className={style.SimpleSearcInputContainer} onClick={(e) => e.stopPropagation()} >
                    <Input initialFocus onChange={(event) => setQuery(event.value)} placeholder={placeholder} name="input" />
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