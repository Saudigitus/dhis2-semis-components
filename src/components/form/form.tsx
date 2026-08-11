import GroupForm from "../form/GroupForm";
import { Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import { type FormProps } from "dhis2-semis-types";
import styles from './groupform.module.css'
import { useEffect, useRef, useState } from "react";
import { FormApi } from "final-form"
import { deepEqual } from "../../utils/table/objectComparison";
import { FormSpy } from "react-final-form";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../schemas/translationsSchema";

interface IForm extends Record<string, any> { }
interface imageFieldSpecificProps {
    baseUrl?: string
    storyBook?: boolean,
    destructive?: boolean,
    trackedEntity?: string,
    setTrackedValues?: (value: any) => void,
    customComponent?: any,
    hasChangedExternaly?: boolean,
}

interface CombinedProps extends FormProps, imageFieldSpecificProps { }

export default function CustomForm(props: CombinedProps) {
    const [changed, setChanged] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const { storyBook, formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons, customComponent } = props
    const { onCancel, Form, submitButtonLabel, trackedEntity, destructive, setFormValues, setTrackedValues, baseUrl, hasChangedExternaly } = props
    const i18n = useRecoilValue(TranslationState) as any

    const handleInputChange = (event: any) => {
        if (onInputChange) onInputChange({ value: event.target.value, name: event.target.name, field: event })
        setFormSubmitted(false)
    }

    const formActions = ({ form }: { form: any }) => [
        {
            id: "cancel",
            type: "reset",
            label: i18n.t("Cancel"),
            disabled: loading,
            onClick: () => {
                form.reset()
                onCancel && onCancel()
            },
            secondary: true,
        },
        {
            id: "continue",
            label: submitButtonLabel ? submitButtonLabel : i18n.t("Submit"),
            success: "success",
            type: "submit",
            disabled: hasChangedExternaly ? false : !changed || loading,
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
                initialValues={{ ...initialValues }}
            >
                {({ form, handleSubmit, values }) => {
                    formRef.current = form;

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
                            {
                                formFields
                                    ?.filter((section: any) => section?.visible !== false)
                                    ?.map((section: any, i: number) => (
                                        <GroupForm
                                            key={i}
                                            name={section.name}
                                            baseUrl={baseUrl}
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

                            {customComponent}

                            {withButtons && (
                                <div>
                                    <ButtonStrip end className={styles.btnStrip}>
                                        {formActions({ form }).map((action: any, i) => (
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
