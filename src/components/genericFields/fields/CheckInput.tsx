import * as React from "react";
import { type FieldRenderProps, useField } from "react-final-form";
import { ReactFinalForm, CheckboxFieldFF, hasValue, Label } from "@dhis2/ui";
import { CheckFieldProps } from "../../../types/form/GenericFieldsTypes";

const { Field } = ReactFinalForm;

function CheckInput(props: CheckFieldProps) {
    const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name as unknown as string);
  
  return (
    <div className="d-flex">
      <Field
        {...props}
        type="checkbox"
        component={CheckboxFieldFF}
        validate={props.required ? hasValue : undefined}
        disabled={props.disabled}
        onChange={(event: { target: { checked: any } }) => {
          input.onChange(event?.target?.checked);
        }}
      />
      <Label className="mt-1">Yes</Label>
    </div>
  );
}

export default CheckInput;
