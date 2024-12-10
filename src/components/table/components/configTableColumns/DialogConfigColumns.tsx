import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import { type CustomAttributeProps } from '../../../../types/variables/AttributeColumns';
import { useEffect } from 'react'
import DragDropList from '../../../drag&drop/DragDropList';

interface DialogSelectColumnsProps {
    open: boolean
    onClose: () => void
    headers: any[]
    updateVariables: (list: any[]) => void
    filteredHeaders: any[]
}

function DialogSelectColumns(props: DialogSelectColumnsProps) {
    const { open, onClose, headers = [], updateVariables, filteredHeaders } = props
    const [columnsList, setcolumnsList] = useState<CustomAttributeProps[]>([])

    useEffect(() => {
        if (filteredHeaders?.length == 0) setcolumnsList([])
    }, [filteredHeaders])

    const handleSave = () => {
        updateVariables(columnsList?.length > 0 ? columnsList : headers)

        onClose()
    };

    return (
        <Dialog
            open={!!open}
            onClose={onClose}
            fullWidth
            style={{ padding: "0px" }}
        >
            <DialogTitle style={{ marginLeft: "13px" }} >Columns to show in the table</DialogTitle>
            <DialogContent>
                <DragDropList
                    listItems={columnsList?.length > 0 ? columnsList : headers}
                    setListItems={setcolumnsList}
                    title='Table Columns'
                />
            </DialogContent>
            <DialogActions style={{ marginRight: "15px" }} >
                <Button color='primary' onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSelectColumns
