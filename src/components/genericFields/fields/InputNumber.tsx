import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createNumberRange
} from '@dhis2/ui'
import style from "./fields.module.css";
import { formatToString } from '../../../utils/commons/formatToString';
import { type FormFieldsProps } from '../../../types/form/GenericFieldsTypes';

const { Field } = ReactFinalForm

const lowerbound = 1
const upperbound = 86400

const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(lowerbound, upperbound)
)

function InputNumber(props: FormFieldsProps) {
    return (
        <Field
            {...props}
            component={InputFieldFF}
            validate={(Boolean(props.required)) && VALIDATOR}
            type={props.type}
            format={formatToString}
            disabled={props.disabled}
            className={style.textfield}
        />
    )
}

export default InputNumber
