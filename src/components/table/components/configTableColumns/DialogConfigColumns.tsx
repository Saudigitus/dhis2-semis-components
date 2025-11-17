import { useState } from 'react'
import { Button } from 'react-bootstrap';
import { type CustomAttributeProps } from 'dhis2-semis-types'
import { useEffect } from 'react'
import DragDropList from '../../../drag&drop/DragDropList';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { TranslationState } from '../../../../schemas/translationsSchema';

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
    const i18n = useRecoilValue(TranslationState) as any

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
            <DialogTitle style={{ marginLeft: "13px" }} >{i18n.t("Columns to show in the table")}</DialogTitle>
            <DialogContent>
                <DragDropList
                    listItems={columnsList?.length > 0 ? columnsList : headers}
                    setListItems={setcolumnsList}
                    title={i18n.t('Table Columns')}
                />
            </DialogContent>
            <DialogActions style={{ marginRight: "15px" }} >
                <Button color='primary' onClick={handleSave}>
                    {i18n.t("Save")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSelectColumns
