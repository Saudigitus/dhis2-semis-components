import GroupForm from "../form/GroupForm";
import { Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import { type FormProps } from "dhis2-semis-types";
import styles from './groupform.module.css'
import { useEffect, useRef, useState } from "react";
import { FormApi } from "final-form"
import { deepEqual } from "../../utils/table/objectComparison";

interface IForm extends Record<string, any> { }
interface imageFieldSpecificProps {
    storyBook?: boolean,
    trackedEntity?: string,
    destructive?: boolean
}

interface CombinedProps extends FormProps, imageFieldSpecificProps { }

export default function CustomForm({ storyBook, formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons, onCancel, Form, submitButtonLabel, trackedEntity, destructive }: CombinedProps) {
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const [changed, setChanged] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleInputChange = (values: Record<string, any>, event: any) => {
        if (onInputChange) onInputChange({ form: values, changed: { value: event.target.value, field: event, name: event.target.name } })
        setFormSubmitted(false)
    }

    const formActions = (form: any, values: any) => [
        {
            id: "cancel",
            type: "reset",
            label: "Cancel",
            disabled: loading,
            onClick: () => {
                form.reset()
                onCancel && onCancel()
            },
            secondary: true,
        },
        {
            id: "continue",
            label: submitButtonLabel ? submitButtonLabel : "Submit",
            success: "success",
            type: "submit",
            disabled: !changed || loading,
            primary: destructive ? !destructive : true,
            destructive: destructive,
            icon: loading ? <CircularLoader small /> : null,
        },
    ];

    return (
        <div style={style}>
            <Form
                onSubmit={(values: any) => {
                    setFormSubmitted(true)
                    onFormSubtmit(values)
                }}
                initialValues={initialValues}
            >
                {({ form, handleSubmit, values }) => {
                    formRef.current = form;

                    useEffect(() => {
                        if (deepEqual(initialValues, values)) {
                            setChanged(false)
                        } else {
                            setChanged(true)
                        }
                    }, [values])

                    return (
                        <form
                            onChange={(onchangeValue: any) => { handleInputChange(values, onchangeValue) }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(values);
                                setFormSubmitted(true)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSubmit(values);
                                    setFormSubmitted(true)
                                }
                            }}
                        >
                            {formFields?.map((section: any, i: number) => (
                                <GroupForm
                                    key={i}
                                    name={section.name}
                                    description={section.description}
                                    fields={section.fields}
                                    form={form}
                                    onInputChange={onInputChange}
                                    trackedEntity={trackedEntity}
                                    storyBook={storyBook}
                                    setChanged={setChanged}
                                    submitted={formSubmitted}
                                />
                            ))}

                            {withButtons && (
                                <div>
                                    <ButtonStrip end className={styles.btnStrip}>
                                        {formActions(form, values).map((action: any, i) => (
                                            <Button key={i} {...action} loading={false}>
                                                {action.label}
                                            </Button>
                                        ))}
                                    </ButtonStrip>
                                </div>
                            )}
                        </form>
                    );
                }}
            </Form>
        </div>
    );
}
