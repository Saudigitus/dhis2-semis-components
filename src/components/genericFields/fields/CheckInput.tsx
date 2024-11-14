import * as React from "react";
import { ReactFinalForm, CheckboxFieldFF, hasValue, Label } from "@dhis2/ui";
import { CheckFieldProps } from "../../../types/form/GenericFieldsTypes";

const { Field } = ReactFinalForm;

function CheckInput(props: CheckFieldProps) {
  return (
    <div className="d-flex">
      <Field
        {...props}
        type="checkbox"
        component={CheckboxFieldFF}
        validate={props.required ? hasValue : undefined}
        disabled={props.disabled}
      />
      <Label className="mt-1">Yes</Label>
    </div>
  );
}

export default CheckInput;
