import { Center, CircularLoader, Help, Menu, OrganisationUnitTree } from '@dhis2/ui';
import { useDataQuery } from '@dhis2/app-runtime'
import React, { useState } from 'react'
import style from "../mainHeader.module.css"
import { Input } from '@material-ui/core';


const ORG_UNIT_QUERY = {
    results: {
        resource: "me",
        params: {
            fields: "organisationUnits[id,displayName]"
        }
    }
}

const OrgUnitTreeComponent = () => {
    const [selectedOu, setSelectedOu] = useState<{ id: string, displayName: string, selected: any }>()
    const { loading, data, error } = useDataQuery<{ results: { organisationUnits: [{ id: string, displayName: string }] } }>(ORG_UNIT_QUERY, {
    })

    if (error != null) {
        return (
            <div style={{ width: 400, minHeight: 400 }}>
                <Help error>
                    Something went wrong when loading the organisation units!
                </Help>
            </div>
        )
    }

    if (loading) {
        return (
            <Center>
                <CircularLoader small />
            </Center>
        )
    }

    const onOuChange = (event: { id: string, displayName: string, selected: any }) => {
        console.log(event, "event")
        setSelectedOu(event);
    }



    return (
        <div style={{ width: 400, minHeight: 400 }}>
            <Menu>
                <div className={style.SimpleSearcInputContainer} onClick={(e) => e.stopPropagation()} >
                    <Input placeholder={"Search for a school"} name="input" />
                </div>
                <OrganisationUnitTree
                    roots={data?.results.organisationUnits[0].id}
                    singleSelection
                    selected={selectedOu?.selected}
                    onChange={onOuChange}
                />
            </Menu>
        </div>
    );
}

export default OrgUnitTreeComponent