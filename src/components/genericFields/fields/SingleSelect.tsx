import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useField, type FieldRenderProps } from "react-final-form";
import ErrorIcon from '@material-ui/icons/Error';
import styles from "./fields.module.css"
import { AutoCompleteProps } from "../../../types/form/GenericFieldsTypes";
import { useState } from 'react'

const OptionSetAutocomplete = (props: AutoCompleteProps & { submitted?: boolean }) => {
  const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);
  const [cliked, setClicked] = useState<boolean>(false)

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
            error={Boolean((props?.submitted || cliked) && input.value === "" && props?.required)}
            helperText={((props?.submitted || cliked) && input.value === "" && (Boolean(props?.required))) && "Please provide a value"}
            size="small"
            InputProps={{
              ...params.InputProps,
              style: {
                backgroundColor: "#fff"
              }
            }}
            onBlur={() => setClicked(true)}
          />

        )}
        onChange={(field, value: any) => {
          input.onChange(value.value);
          props.setChanged(true)
          if (props.onChange) props.onChange({ field: field, value: value.value, name: props.name });

          setClicked(false)
        }}
      />
      {
        ((props?.submitted || cliked) && input.value === "" && (Boolean(props?.required))) ? <div className={styles["alert-icon__area"]}>
          <ErrorIcon />
        </div>
          : null
      }
    </div>
  );
};

function SingleSelectField(props: AutoCompleteProps & { submitted?: boolean }) {
  return (
    <div >
      <OptionSetAutocomplete {...props} submitted={props.submitted} name={props.name} />
    </div>
  );
}

export default SingleSelectField;
