import { FormApi } from "final-form"
import GroupForm from "../form/GroupForm";
import { FormSpy} from "react-final-form";
import styles from "./groupform.module.css";
import { type FormProps } from "dhis2-semis-types";
import { useEffect, useRef, useState } from "react";
import { deepEqual } from "../../utils/table/objectComparison";
import { Button, ButtonStrip, CircularLoader } from "@dhis2/ui";

interface IForm extends Record<string, any> { }
interface ImageFieldSpecificProps {
    trackedEntity?: string;
    destructive?: boolean;
    setTrackedValues?: (value: any) => void;
}

interface CombinedProps extends FormProps, ImageFieldSpecificProps { }

export default function TestForm(props: CombinedProps) {
    const [changed, setChanged] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const { formFields, style, onInputChange, onFormSubtmit, onCancel, loading, initialValues, withButtons } = props
    const { Form, submitButtonLabel, trackedEntity, destructive, setFormValues, setTrackedValues, formValues } = props

    const formActions = (form: FormApi<IForm>) => [
        { id: "cancel", type: "reset" as const, label: "Cancel", disabled: loading, secondary: true, onClick: () => { form.reset(); onCancel?.(); } },
        { id: "continue", type: "submit" as const, label: submitButtonLabel ?? "Submit", primary: !destructive, destructive, disabled: !changed || loading, icon: loading ? <CircularLoader small /> : null, },
    ];

    return (
        <div style={style}>
            <Form
                onSubmit={(values: any) => {
                    onFormSubtmit?.(values);
                }}
                initialValues={{ ...initialValues }}
                subscription={{ submitting: true, pristine: true}}
            >
                {({ handleSubmit, form }) => {
                    formRef.current = form;

                    return (
                        <form
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        >
                            <FormSpy subscription={{ values: true, }} >
                                {({ values }) => {
                                    useEffect(() => {
                                        setFormValues?.(values);
                                        setTrackedValues?.(values);
                                        setChanged(!deepEqual(initialValues, values));
                                    }, [values]);
                                    return null;
                                }}
                            </FormSpy>
                            {formFields
                                ?.filter((section) => section?.visible !== false)
                                ?.map((section, i) => (
                                    <GroupForm
                                        form={form}
                                        name={section.name}
                                        fields={section.fields}
                                        setChanged={setChanged}
                                        submitted={formSubmitted}
                                        onInputChange={onInputChange}
                                        trackedEntity={trackedEntity}
                                        description={section.description}
                                    />
                                ))}

                            {withButtons && (
                                <ButtonStrip end className={styles.btnStrip}>
                                    {formActions(form).map((action, i) => (
                                        <Button key={i} {...action}>
                                            {action.label}
                                        </Button>
                                    ))}
                                </ButtonStrip>
                            )}
                        </form>
                    );
                }}
            </Form>
        </div>
    );
}