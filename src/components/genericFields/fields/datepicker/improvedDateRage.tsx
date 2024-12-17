import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { Popover, Paper, Button, TextField } from '@mui/material';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 

interface DateRangePickerProps {
    name: string;
    disabled?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ name, disabled }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    return (
        <Field name={name}>
            {({ input }) => {
                const selected = input.value || {};
                const value = [
                    {
                        startDate: selected.startDate || new Date(),
                        endDate: selected.endDate || new Date(),
                        key: 'selection',
                    },
                ];

                return (
                    <div>
                        <TextField
                            disabled={disabled}
                            style={{ width: '100%' }}
                            value={
                                selected.startDate && selected.endDate
                                    ? `${format(selected.startDate, 'MMMM d, yyyy')} - ${format(selected.endDate, 'MMMM d, yyyy')}`
                                    : ''
                            }
                            size="small"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                setAnchorEl(event.currentTarget);
                                setOpen(true);
                            }}
                        />

                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            onClose={() => setOpen(false)}
                        >
                            <Paper>
                                <DateRange
                                    editableDateInputs={true}
                                    moveRangeOnFirstSelection={false}
                                    ranges={value}
                                    direction="horizontal"
                                    months={2}
                                    onChange={(ranges: any) => {
                                        input.onChange({
                                            startDate: ranges.selection.startDate,
                                            endDate: ranges.selection.endDate,
                                        });
                                    }}
                                />
                            </Paper>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                                <Button onClick={() => setOpen(false)} color="primary">
                                    CANCEL
                                </Button>
                                <Button
                                    onClick={() => {
                                        input.onChange({
                                            startDate: value[0].startDate,
                                            endDate: value[0].endDate,
                                        });
                                        setOpen(false);
                                    }}
                                    color="primary"
                                >
                                    OK
                                </Button>
                            </div>
                        </Popover>
                    </div>
                );
            }}
        </Field>
    );
};

export default DateRangePicker;
