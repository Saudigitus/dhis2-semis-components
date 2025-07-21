import {
    ReactFinalForm,
    InputFieldFF,
    hasValue,
} from '@dhis2/ui'
import style from "./fields.module.css";
import { FormFieldsProps } from '../../../types/form/GenericFieldsTypes';

const { Field } = ReactFinalForm

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
