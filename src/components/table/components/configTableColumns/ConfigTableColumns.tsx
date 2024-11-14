import React, { useState } from 'react'
import { IconSettings24 } from '@dhis2/ui';
import { IconButton, Tooltip } from '@material-ui/core';
import DialogConfigColumns from './DialogConfigColumns';
import { CustomAttributeProps } from '../../../../types/variables/AttributeColumns';

interface ConfigTableColumnsProps {
    headers: CustomAttributeProps[]
    updateVariables: (list: CustomAttributeProps[]) => void
    filteredHeaders: CustomAttributeProps[]
}

function ConfigTableColumns(props: ConfigTableColumnsProps) {
    const { headers, updateVariables, filteredHeaders } = props;
    const [open, setopen] = useState(false)

    const closeDialog = () => {
        setopen(false)
    }

    const openDialog = () => {
        setopen(true)
    }

    return (
        <React.Fragment>
            <Tooltip
                disableFocusListener
                disableTouchListener
                enterDelay={500}
                title={'Select columns'}
                className="my-auto"
            >
                <IconButton
                    onClick={openDialog}
                >
                    <IconSettings24 />
                </IconButton>
            </Tooltip>
            <DialogConfigColumns
                open={open}
                onClose={closeDialog}
                updateVariables={updateVariables}
                filteredHeaders={filteredHeaders}
                headers={headers}
            />
        </React.Fragment>
    )
}

export default ConfigTableColumns
