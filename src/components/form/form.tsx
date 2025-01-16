import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import { type FormProps } from "../../types/form/GroupFormProps";
import styles from './groupform.module.css'

export default function CustomForm({ formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons }: FormProps) {

    const formActions = (pristine: boolean, form: any) => [
        {
            id: "cancel",
            type: "reset",
            label: "Cancel",
            disabled: false,
            onClick: () => { form.reset },
            secondary: true
        }, {
            id: "continue",
            label: "Submit",
            success: "success",
            type: "submit",
            disabled: (pristine || loading),
            primary: true,
            icon: loading ? <CircularLoader small /> : <></>
        }
    ];

    return (
        <div style={style} >
            <Form
                onSubmit={(values: any) => { onFormSubtmit(values) }}
                initialValues={initialValues}
            >
                {({ pristine, form, handleSubmit, values }: any) => (
                    <>
                        <form
                            onChange={(e: any) => { onInputChange(e) }}
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit(values)
                            }}
                        >
                            {
                                formFields?.map((section: any, i: any) =>
                                    <GroupForm
                                        name={section.name}
                                        description={section.description}
                                        key={i}
                                        fields={section.fields}
                                        form={form}
                                        onInputChange={onInputChange}
                                    />
                                )
                            }

                            {withButtons && <ModalActions>
                                <ButtonStrip end className={styles.btnStrip} >
                                    {formActions(pristine, form).map((action: any, i) =>
                                        <Button
                                            key={i}
                                            {...action}
                                            loading={false}
                                        >
                                            {action.label}
                                        </Button>
                                    )}
                                </ButtonStrip>
                            </ModalActions>}
                        </form>
                    </>
                )}
            </Form>
        </div >
    )
}