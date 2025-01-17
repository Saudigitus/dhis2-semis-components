import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import { type FormProps } from "../../types/form/GroupFormProps";
import styles from './groupform.module.css'

interface imageFieldSpecificProps {
    storyBook: boolean
}

interface CombinedProps extends FormProps, imageFieldSpecificProps { }

export default function CustomForm({ storyBook, formFields, style, onInputChange, onFormSubtmit, loading, initialValues, withButtons, trackedEntity }: CombinedProps) {

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
                                        trackedEntity={trackedEntity}
                                        storyBook={storyBook}
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