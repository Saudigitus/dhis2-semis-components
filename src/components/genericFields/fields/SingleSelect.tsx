import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useField, type FieldRenderProps } from "react-final-form";
import ErrorIcon from '@material-ui/icons/Error';
import styles from "./fields.module.css"
import { AutoCompleteProps } from "../../../types/form/GenericFieldsTypes";
import { useState } from 'react'

const OptionSetAutocomplete = (props: AutoCompleteProps) => {
  const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);
  const [cliked] = useState<boolean>(false)

  const options = (props?.options?.optionSet?.options != null)
    ? props?.options?.optionSet?.options?.map((option: { value: string, label: string }) => ({
      value: option.value,
      label: option.label
    }))
    : [];

  return (
    <div className={styles["auto-complete__container"]}>
      <Autocomplete
        {...props}
        options={options}
        fullWidth
        closeIcon={null}
        disabled={props.disabled}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, value) => option.value === value.value}
        value={options?.find((element: { value: string }) => element.value === input.value) ?? null}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            error={!!(cliked && input.value === "" && props?.required)}
            helperText={(cliked && input.value === "" && (Boolean(props?.required))) && "Please provide a value"}
            size="small"
            InputProps={{
              ...params.InputProps,
              style: {
                backgroundColor: "#fff"
              }
            }}
          />

        )}
        onChange={(_, value) => {
          input.onChange(value?.value);
          if (props.onChange) props.onChange(value)
        }}
      />
      {
        (cliked && input.value === "" && (Boolean(props?.required))) && <div className={styles["alert-icon__area"]}>
          <ErrorIcon />
        </div>
      }
    </div>
  );
};

function SingleSelectField(props: AutoCompleteProps) {
  return (
    <div >
      <OptionSetAutocomplete {...props} name={props.name} />
    </div>
  );
}

export default SingleSelectField;
