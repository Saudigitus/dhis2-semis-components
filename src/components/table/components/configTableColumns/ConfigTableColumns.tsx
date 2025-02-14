import React, { useState } from 'react'
import { IconSettings24, NoticeBox } from '@dhis2/ui';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import DialogConfigColumns from './DialogConfigColumns';
import { type CustomAttributeProps } from 'dhis2-semis-types'
import styles from "./configTableColumns.module.css"

interface ConfigTableColumnsProps {
    headers: CustomAttributeProps[]
    updateVariables: (list: CustomAttributeProps[]) => void
    filteredHeaders: CustomAttributeProps[]
    selected?: number
    selectable?: boolean
}

const useStyles = makeStyles((theme) => ({
    noticeBox: {
        margin: '13px 0px 10px 5px',
        height: '38px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

function ConfigTableColumns(props: ConfigTableColumnsProps) {
    const { headers, updateVariables, filteredHeaders, selectable, selected } = props;
    const [open, setopen] = useState(false)
    const classes = useStyles()

    const closeDialog = () => {
        setopen(false)
    }

    const openDialog = () => {
        setopen(true)
    }

    return (
        <div className={styles['config-table__columns']}>
            {
                (selected > 0 && selectable) && <NoticeBox className={classes.noticeBox} title={`${selected} rows selected`} />
            }
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
        </div>
    )
}

export default ConfigTableColumns
