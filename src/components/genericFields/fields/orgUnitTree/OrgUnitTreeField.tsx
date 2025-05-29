import React, { useState } from 'react'
import { useField, type FieldRenderProps } from "react-final-form";
import style from "./OrgUnit.module.css"
import { OuFieldProps, SelectedOuType } from '../../../../types/orgUnitTree/OrgUnitTreeProps';
import OrgUnitTreeSearch from '../../../../components/header/components/orgUnitTreeSearch';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function OrgUnitTreeField(props: OuFieldProps): React.ReactElement {
    const [selectedOu, setSelectedOu] = useState<SelectedOuType>()
    const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);

    const onOuChange = (event: SelectedOuType) => {
        setSelectedOu(event)
        input.onChange(event.id)
    }

    return (
        <div className={style.orgUnitCard}>
            <div className={style.cardTree}>
                {((selectedOu?.displayName) != null)
                    ? <div className='d-flex align-items-center'>
                        <span className={style.ouSpan}>
                            {selectedOu?.displayName}
                        </span>
                        <IconButton
                            size="small"
                            onClick={() => { setSelectedOu({} as unknown as SelectedOuType); }}
                            style={{ marginLeft: "auto" }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </div>
                    : <OrgUnitTreeSearch
                        onChange={onOuChange}
                    />
                }
            </div>
        </div>
    )
}
