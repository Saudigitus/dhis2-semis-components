import GroupForm from "../form/GroupForm";
import { Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import { type FormProps } from "dhis2-semis-types";
import styles from './groupform.module.css'
import { useRef } from "react";
import { FormApi } from "final-form"

interface IForm extends Record<string, any> { }

export default function CustomForm({ formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons, onCancel, Form }: FormProps) {
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);

    const formActions = (form: any) => [
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
            label: "Submit",
            success: "success",
            type: "submit",
            disabled: loading,
            primary: true,
            icon: loading ? <CircularLoader small /> : null,
        },
    ];

    return (
        <div style={style}>
            <Form
                onSubmit={(values: any) => onFormSubtmit(values)}
                initialValues={initialValues}
            >
                {({ form, handleSubmit, values }) => {
                    formRef.current = form;
                    return (
                        <form
                            onChange={onInputChange}
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
                                />
                            ))}

                            {withButtons && (
                                <div>
                                    <ButtonStrip end className={styles.btnStrip}>
                                        {formActions(form).map((action: any, i) => (
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
