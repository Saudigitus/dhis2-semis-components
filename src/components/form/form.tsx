import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";

export default function SDCustomForm({ formFields, style, onInputChange, onFormSubtmit, loading, initialValues }: any) {

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
            disabled: (pristine || loading),
            primary: true,
            icon: loading ? <CircularLoader small /> : <></>
        }
    ];

    return (
        <div style={style} >
            <Form
                onSubmit={() => onFormSubtmit}
                initialValues={initialValues}
            >
                {({ pristine, form }: any) => (
                    <>
                        <form onChange={(e: any) => { onInputChange(e) }} >
                            {
                                formFields()?.map((field: any, i: any) =>
                                    <GroupForm
                                        name={field.section}
                                        description={field.description}
                                        key={i}
                                        fields={field.fields}
                                    />
                                )
                            }
                        </form>

                        <ModalActions>
                            <ButtonStrip end >
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
                        </ModalActions>
                    </>
                )}
            </Form>
        </div>
    )
}