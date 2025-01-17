import React from 'react';
import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    string
} from '@dhis2/ui'
import style from "./fields.module.css";
import { FormFieldsProps } from '../../../types/form/GenericFieldsTypes';

const { Field } = ReactFinalForm

const VALIDATOR = composeValidators(string, hasValue)

function InputText(props: FormFieldsProps) {
    return (
        <Field
            {...props}
            component={InputFieldFF}
            validate={props.required ? hasValue : undefined}
            type="text"
            required
            label={null}
            className={style.textfield}
            disabled={props.disabled}
        />
    )
}

export default InputText
