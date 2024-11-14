import React from 'react';
import { ReactFinalForm, InputFieldFF, hasValue } from "@dhis2/ui";
import { FormFieldsProps } from "../../../types/form/GenericFieldsTypes";

const { Field } = ReactFinalForm;

function DateInput(props: FormFieldsProps) {
  return (
    <Field
      {...props}
      type="date"
      component={InputFieldFF}
      validate={props.required ? hasValue : undefined}
      disabled={props.disabled}
    />
  );
}

export default DateInput;
