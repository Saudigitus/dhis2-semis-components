import React from 'react';
import { type TextFilterProps } from '../../../../../types/table/ContentFiltersProps';
import { TextField } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';
import { TranslationState } from '../../../../../schemas/translationsSchema';
import { useRecoilValue } from 'recoil';

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
    const i18n = useRecoilValue(TranslationState) as any

    return (
        <div>
            <TextField
                value={value}
                onChange={(e: any) => {
                    onChange(e.target.value, id)
                }}
                placeholder={i18n.t("Enter text")}
                className={classes.textInput}
            />
        </div>
    )
}

export default TextFilter
