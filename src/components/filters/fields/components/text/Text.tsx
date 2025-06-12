import React from 'react';
import { type TextFilterProps } from '../../../../../types/table/ContentFiltersProps';
import { TextField } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textInput: {
            '& .MuiInputBase-input': {
                padding: 10
            }
        }
    })
);

function TextFilter(props: TextFilterProps) {
    const { value, onChange, id } = props;
    const classes = useStyles()

    return (
        <div>
            <TextField
                value={value}
                onChange={(e: any) => {
                    onChange(e.target.value, id)
                }}
                placeholder={"Enter text"}
                className={classes.textInput}
            />
        </div>
    )
}

export default TextFilter
