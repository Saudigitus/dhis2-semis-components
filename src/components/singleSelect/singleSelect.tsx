import { Form } from "react-final-form";
import { AutoCompleteProps } from "../../types/form/GenericFieldsTypes";
import SingleSelectField from "../genericFields/fields/SingleSelect";

export default function CustomSingleSelect(props: AutoCompleteProps) {
    const { style } = props

    return (
        <div style={style} >
            <Form
                onSubmit={() => { }}
                initialValues={{}}
            >
                {() => (
                    <form>
                        <SingleSelectField {...props} />
                    </form>
                )}
            </Form>
        </div>
    )
}