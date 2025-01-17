import React from 'react';
import { TextField } from '@material-ui/core';
import { type TextFilterProps } from '../../../../../types/table/ContentFiltersProps';

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
