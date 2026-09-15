import GroupForm from "../form/GroupForm";
import { Button, ButtonStrip, CircularLoader, NoticeBox } from "@dhis2/ui";
import { type FormProps } from "dhis2-semis-types";
import styles from './groupform.module.css'
import { useEffect, useRef, useState } from "react";
import { FormApi } from "final-form"
import { deepEqual } from "../../utils/table/objectComparison";
import { FormSpy } from "react-final-form";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../schemas/translationsSchema";
import { syncRuleValues } from '../../utils/form/syncRuleValues';

interface IForm extends Record<string, any> { }
interface imageFieldSpecificProps {
    baseUrl?: string
    storyBook?: boolean,
    destructive?: boolean,
    trackedEntity?: string,
    setTrackedValues?: (value: any) => void,
    customComponent?: any,
}

interface CombinedProps extends FormProps, imageFieldSpecificProps { }

export default function CustomForm(props: CombinedProps) {
    const [changed, setChanged] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [validationAttempt, setValidationAttempt] = useState(0)
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const formElementRef = useRef<HTMLFormElement | null>(null);
    const ruleAssignments = useRef(new Map<string, unknown>());
    const { storyBook, formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons, customComponent } = props
    const { onCancel, Form, submitButtonLabel, trackedEntity, destructive, setFormValues, setTrackedValues, baseUrl } = props
    const i18n = useRecoilValue(TranslationState) as any

    const validate = (values: Record<string, any>) => {
        const errors: Record<string, string> = {};
        const requiredFields: string[] = [];
        const visit = (items: any[]) => items?.forEach(item => {
            const children = ['fields', 'variables', 'variable'].filter(key => Array.isArray(item[key]));
            if (item.visible === false || item.ruleHidden) return;
            if (children.length) children.forEach(key => visit(item[key]));
            else if (item.required) {
                const value = values[item.name ?? item.id];
                const empty = value === undefined || value === null || value === '' ||
                    (Array.isArray(value) && value.length === 0);
                if (empty) {
                    const name = item.labelName || item.displayName || item.name || item.id;
                    errors[item.name ?? item.id] = i18n.t('Please provide a value');
                    requiredFields.push(name);
                }
            }
        });
        visit(formFields);
        return { ...errors, _summary: requiredFields };
    };

    useEffect(() => {
        const form = formRef.current;
        if (!form) return;
        ruleAssignments.current = syncRuleValues(form, formFields, ruleAssignments.current);
    }, [formFields]);

    const handleInputChange = (event: any) => {
        if (onInputChange) onInputChange({ value: event.target.value, name: event.target.name, field: event })
        setFormSubmitted(false)
    }

    const focusFirstInvalidField = (errors?: Record<string, any>) => {
        const firstError = Object.keys(errors ?? {}).find(key => key !== '_summary');
        if (!firstError || !formElementRef.current) return;
        const fields = Array.from(formElementRef.current.querySelectorAll<HTMLElement>('[name]'));
        const field = fields.find(element =>
            element.getAttribute('name') === firstError || element.id === firstError
        );
        if (!field) return;
        window.setTimeout(() => {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            field.focus({ preventScroll: true });
        }, 0);
    };

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
            disabled: !changed || loading,
            primary: destructive ? !destructive : true,
            destructive: destructive,
            icon: loading ? <CircularLoader small /> : null,
        },
    ];

    return (
        <div style={style}>
            <Form
                validate={validate}
                onSubmit={(values: any) => {
                    setFormSubmitted(true)
                    onFormSubtmit(values)
                }}
                initialValues={{ ...initialValues }}
            >
                {({ form, handleSubmit, values, submitFailed, errors }) => {
                    formRef.current = form;

                    useEffect(() => {
                        if (submitFailed) focusFirstInvalidField(errors);
                    }, [submitFailed, errors, validationAttempt]);

                    return (
                        <form
                            ref={formElementRef}
                            onChange={(onchangeValue: any) => {
                                setFormValues && setFormValues(values);
                                handleInputChange(onchangeValue)
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                setValidationAttempt(attempt => attempt + 1);
                                handleSubmit(values);
                                setFormSubmitted(true)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setValidationAttempt(attempt => attempt + 1);
                                    handleSubmit(values);
                                    setFormSubmitted(true)
                                }
                            }}
                        >
                            {submitFailed && errors?._summary?.length > 0 && (
                                <NoticeBox error title={i18n.t('Please correct the following fields before submitting')}>
                                    {errors._summary.join(', ')}
                                </NoticeBox>
                            )}
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
