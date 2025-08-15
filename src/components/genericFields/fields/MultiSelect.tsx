import "./MultiSelect.css";
import { Chip, Stack } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { useState, useEffect, useRef } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useField, type FieldRenderProps } from "react-final-form";
import { AutoCompleteProps } from "../../../types/form/GenericFieldsTypes";

export function SelectMultiple(props: AutoCompleteProps) {
    const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);
    const [isOpen, setIsOpen] = useState(false);
    const [toogled, setToogled] = useState(false)
    const [selected, setSelected] = useState([]);
    const wrapperRef = useRef(null);
    const showWarning = Boolean((toogled) && selected.length === 0 && props?.required && !isOpen)
    const options = props?.options?.optionSet?.options ?? [] as unknown as any

    const toggleOption = (value: any) => {
        const originalCopy = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value]

        setSelected(() => originalCopy);
        input.onChange(originalCopy)
        if (props?.setChanged) props.setChanged(true)
        if (props?.onChange) props.onChange({ field: "", value: originalCopy, name: props.name })
    };

    const getLabel = (id: string) => options?.find((x: any) => x.value == id)?.label

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="custom-multiselect" ref={wrapperRef}>
            <div style={{ display: "flex", width: "100%" }} >
                <div
                    style={showWarning ? { borderColor: "#F44336" } : {}}
                    className="multiselect-header"
                    onClick={() => {
                        setIsOpen(!isOpen)
                        setToogled(true)
                    }}
                >
                    {selected.length > 0
                        ? <Stack direction="row" spacing={1}>
                            {selected?.length <= 3 ?
                                selected?.map((e) => <Chip style={{ backgroundColor: "#00897B", color: "#fff" }} label={getLabel(e)} size='small' />) :
                                <Chip style={{ backgroundColor: "#00897B", color: "#fff" }} label={`${selected?.length} selected`} size='small' />
                            }
                        </Stack>

                        : "Select options"}
                    <span className="arrow">{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                </div>
                <span hidden={!showWarning} style={{ margin: "auto 5px" }} >  <ErrorIcon style={{ color: "#F44336" }} /></span>
            </div>

            {isOpen && (
                <div className="multiselect-options">
                    {options?.map((opt: any) => (
                        <label key={opt.value} className="multiselect-option">
                            <input
                                type="checkbox"
                                checked={selected.includes(opt.value)}
                                onChange={() => toggleOption(opt.value)}
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            )}
            <span hidden={!showWarning} className="error" >&nbsp;Please provide a value</span>
        </div>
    );
}
