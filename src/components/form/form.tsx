import GroupForm from "../form/GroupForm";
import { Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import { type FormProps } from "dhis2-semis-types";
import styles from './groupform.module.css'
import { useRef, useState } from "react";
import { FormApi } from "final-form"
import { objectComparison } from "../../utils/common/customFormPristine";

interface IForm extends Record<string, any> { }
interface imageFieldSpecificProps {
    storyBook: boolean,
    trackedEntity?: string
}

interface CombinedProps extends FormProps, imageFieldSpecificProps { }

export default function CustomForm({ storyBook, formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons, onCancel, Form, submitButtonLabel, trackedEntity }: CombinedProps) {
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const [changed, setChanged] = useState(false)

    const formActions = (form: any, values: any) => [
        {
            id: "cancel",
            type: "reset",
            label: "Cancel",
            disabled: loading,
            onClick: () => {
                onCancel ? onCancel() : form.reset();
            },
            secondary: true,
        },
        {
            id: "continue",
            label: submitButtonLabel ? submitButtonLabel : "Submit",
            success: "success",
            type: "reset",
            disabled: !changed || loading,
            primary: true,
            onClick: (eventt: any) => {
                console.log(values, eventt)
                onFormSubtmit(values)
            },
            icon: loading ? <CircularLoader small /> : null,
        },
    ];

    return (
        <div style={style}>
            <Form
                onSubmit={(values: any) => {
                    onFormSubtmit(values)
                }}
                initialValues={initialValues}
            >
                {({ form, handleSubmit, values }) => {
                    formRef.current = form;
                    return (
                        <form
                            onChange={(values) => {
                                if (!objectComparison(initialValues, values)) {
                                    setChanged(true)
                                } else {
                                    setChanged(false)
                                }

                                if (onInputChange) onInputChange(values)
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(values);
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
