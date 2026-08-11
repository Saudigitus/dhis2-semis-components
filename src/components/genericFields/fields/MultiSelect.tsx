import "./MultiSelect.css";

import {
    Chip,
    InputAdornment,
    Popover,
    Stack,
    TextField,
} from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useMemo, useState } from "react";
import { useField, type FieldRenderProps } from "react-final-form";

import { AutoCompleteProps } from "../../../types/form/GenericFieldsTypes";

interface MultiSelectOption {
    value: string;
    label: string;
}

export function SelectMultiple(props: AutoCompleteProps) {
    const { input }: FieldRenderProps<any, HTMLElement> = useField(props.name);

    const [isOpen, setIsOpen] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const selected: string[] = Array.isArray(input.value)
        ? input.value
        : [];

    const options: MultiSelectOption[] =
        (props?.options?.optionSet?.options ?? []) as MultiSelectOption[];

    const showWarning =
        toggled &&
        selected.length === 0 &&
        Boolean(props?.required) &&
        !isOpen;

    const getLabel = (value: string) => {
        return (
            options.find((option) => option.value === value)?.label ?? value
        );
    };

    const orderedOptions = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        const filteredOptions = options.filter((option) =>
            option.label.toLowerCase().includes(normalizedSearch)
        );

        return [...filteredOptions].sort((a, b) => {
            const aSelected = selected.includes(a.value);
            const bSelected = selected.includes(b.value);

            if (aSelected && !bSelected) return -1;
            if (!aSelected && bSelected) return 1;

            return a.label.localeCompare(b.label);
        });
    }, [options, selected, search]);

    const toggleOption = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected, value];

        input.onChange(newSelected);

        props?.setChanged?.(true);

        props?.onChange?.({
            field: "",
            value: newSelected,
            name: props.name,
        });
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(true);
        setToggled(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setAnchorEl(null);
        setSearch("");
    };

    return (
        <div className="custom-multiselect">
            <div className="multiselect-container">
                <div
                    className={`multiselect-header ${showWarning ? "multiselect-header-error" : ""
                        }`}
                    onClick={handleOpen}
                    role="button"
                    tabIndex={0}
                >
                    <div className="multiselect-value">
                        {selected.length > 0 ? (
                            <Stack
                                direction="row"
                                spacing={0.5}
                                className="multiselect-chips"
                            >
                                {selected.length <= 3 ? (
                                    selected.map((value) => (
                                        <Chip
                                            key={value}
                                            className="multiselect-chip"
                                            label={getLabel(value)}
                                            size="small"
                                        />
                                    ))
                                ) : (
                                    <Chip
                                        className="multiselect-chip"
                                        label={`${selected.length} selected`}
                                        size="small"
                                    />
                                )}
                            </Stack>
                        ) : (
                            <span className="multiselect-placeholder">
                                Select options
                            </span>
                        )}
                    </div>

                    <span className="multiselect-arrow">
                        {isOpen ? (
                            <ArrowDropUpIcon />
                        ) : (
                            <ArrowDropDownIcon />
                        )}
                    </span>
                </div>

                {showWarning && (
                    <span className="multiselect-warning-icon">
                        <ErrorIcon />
                    </span>
                )}
            </div>

            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                slotProps={{
                    paper: {
                        className: "multiselect-popover",
                        sx: {
                            width: anchorEl
                                ? `${anchorEl.getBoundingClientRect().width}px`
                                : undefined,
                        },
                    },
                }}
            >
                <div className="multiselect-search">
                    <TextField
                        fullWidth
                        size="small"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search options..."
                        autoComplete="off"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div className="multiselect-options">
                    {orderedOptions.length > 0 ? (
                        orderedOptions.map((option) => {
                            const isSelected = selected.includes(option.value);

                            return (
                                <label
                                    key={option.value}
                                    className={`multiselect-option ${isSelected
                                        ? "multiselect-option-selected"
                                        : ""
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() =>
                                            toggleOption(option.value)
                                        }
                                    />

                                    <span className="multiselect-option-label">
                                        {option.label}
                                    </span>
                                </label>
                            );
                        })
                    ) : (
                        <div className="multiselect-no-results">
                            No options found
                        </div>
                    )}
                </div>
            </Popover>

            {showWarning && (
                <span className="multiselect-error">
                    Please provide a value
                </span>
            )}
        </div>
    );
}

