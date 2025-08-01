import { ReactFinalForm, SwitchFieldFF, hasValue } from '@dhis2/ui'
import { SwitchFieldProps } from '../../../types/form/GenericFieldsTypes'

const { Field } = ReactFinalForm

function SwitchInput(props: SwitchFieldProps) {
    return (
        <Field
            {...props}
            type="checkbox"
            component={SwitchFieldFF}
            disabled={props.disabled}
            validate={(Boolean(props.required)) && hasValue}
        />
    )
}

export default SwitchInput