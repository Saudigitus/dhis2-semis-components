import React from "react";
import { Label } from "@dhis2/ui"
import { useField, type FieldRenderProps } from "react-final-form";
import { FormFieldsProps } from "../../../types/form/GenericFieldsTypes";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { withStyles } from "@mui/styles";

const CustomRadio = withStyles({
  root: {
    '&$checked': {
      color: "#00695C"
    },
    '&:hover': {
      backgroundColor: 'transparent !important'
    }
  },
  checked: {}
})((props: import("@mui/material").RadioProps) => <Radio disableRipple size="small" color="default" {...props} />);

function RadioButton(props: FormFieldsProps) {
  const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name as unknown as string);

  return (
    <RadioGroup
      {...props}
      row
      value={input?.value || ""}
      onChange={(event: { target: { value: any } }) => {
        input.onChange(event?.target?.value);
      }}
    >
     <FormControlLabel style={props.disabled ? { cursor: "not-allowed" } : {}} value={"true"} control={<CustomRadio disabled={props.disabled} />} label={<Label className="mt-2">Yes</Label>} />
      <FormControlLabel style={props.disabled ? { cursor: "not-allowed" } : {}} value={"false"} control={<CustomRadio disabled={props.disabled} />} label={<Label className="mt-2">No</Label>} />
  </RadioGroup>
  );
}

export default RadioButton;
