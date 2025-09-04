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
    destructive?: boolean,
    setTrackedValues?: (value: any) => void,
}

interface CombinedProps extends FormProps, imageFieldSpecificProps { }

export default function CustomForm(props: CombinedProps) {
    const { storyBook, formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons } = props
    const { onCancel, Form, submitButtonLabel, trackedEntity, destructive, setFormValues, setTrackedValues, formValues } = props
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const [changed, setChanged] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleInputChange = (event: any) => {
        if (onInputChange) onInputChange({ value: event.target.value, name: event.target.name, field: event })
        setFormSubmitted(false)
    }

    const formActions = ({ form, changed }: { form: any, changed: boolean }) => [
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
                initialValues={{ ...initialValues, ...formValues }}
            >
                {({ form, handleSubmit, values, pristine }) => {
                    formRef.current = form;

                    useEffect(() => {
                        setTrackedValues && setTrackedValues(values);
                        if (deepEqual(initialValues, values)) {
                            setChanged(false)
                        } else {
                            setChanged(true)
                        }
                    }, [values])

                    return (
                        <form
                            onChange={(onchangeValue: any) => {
                                setFormValues && setFormValues(values);
                                handleInputChange(onchangeValue)
                            }}
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
                            {
                                formFields
                                    ?.filter((section: any) => section?.visible !== false)
                                    ?.map((section: any, i: number) => (
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
                                    ))
                            }

                            {withButtons && (
                                <div>
                                    <ButtonStrip end className={styles.btnStrip}>
                                        {formActions({ form, changed: true }).map((action: any, i) => (
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
