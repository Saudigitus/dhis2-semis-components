import React, { useMemo } from 'react';
import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createNumberRange
} from '@dhis2/ui'
import style from "./fields.module.css";
import { type FormFieldsProps } from '../../../types/form/GenericFieldsTypes';
import { formatToString } from '../../../utils/common/formatToString';

const { Field } = ReactFinalForm

const lowerbound = 1
const upperbound = 100000000000000

// A field can set its own limits (e.g. the number of rows of an empty template)
const validator = (min: number, max: number) => composeValidators(
    integer,
    hasValue,
    createNumberRange(min, max)
)

function InputNumber(props: FormFieldsProps) {
    const { min = lowerbound, max = upperbound } = props as FormFieldsProps & { min?: number, max?: number }
    const VALIDATOR = useMemo(() => validator(min, max), [min, max])
    return (
        <Field
            {...props}
            component={InputFieldFF}
            validate={props.required ? VALIDATOR : undefined}
            type={props.type}
            format={formatToString}
            disabled={props.disabled}
            className={style.textfield}
        />
    )
}

export default InputNumber
