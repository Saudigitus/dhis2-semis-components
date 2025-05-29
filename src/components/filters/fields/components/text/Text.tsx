import React from 'react';
import { type TextFilterProps } from '../../../../../types/table/ContentFiltersProps';
import { TextField } from '@mui/material';

function TextFilter(props: TextFilterProps) {
    const { value, onChange, id } = props;

    return (
        <div>
            <TextField
                value={value}
                onChange={(e: any) => {
                    onChange(e.target.value, id)
                }}
                placeholder={"Enter text"}
            />
        </div>
    )
}

export default TextFilter
