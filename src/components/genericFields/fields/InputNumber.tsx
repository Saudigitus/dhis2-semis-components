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
