import { MultiSelect, MultiSelectOption } from '@dhis2/ui'
import { AutoCompleteProps } from '../../../types/form/GenericFieldsTypes'
import { useField, type FieldRenderProps } from "react-final-form";

function SelectMultiple(props: AutoCompleteProps) {
    const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);

    return (
        <div>
            <MultiSelect
                className="select"
                {...props}
                disabled={props.disabled}
                selected={input.value ?? []}
                onChange={(value, field: any) => {
                    input.onChange(value.selected)

                    if (props.setChanged) props.setChanged(true)
                    if (props?.onChange) props.onChange({ field: field, value: value.selected, name: props.name })
                }}
            >
                {props?.options?.optionSet?.options?.map(x =>
                    <MultiSelectOption key={x.value} label={x.label} value={x.value} />
                )}
            </MultiSelect>
        </div>
    )
}

export default SelectMultiple
