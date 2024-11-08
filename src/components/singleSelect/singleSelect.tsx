import { Form } from "react-final-form";
import { AutoCompleteProps } from "../../types/form/GenericFieldsTypes";
import SingleSelectField from "../genericFields/fields/SingleSelect";

export default function CustomSingleSelect(props: AutoCompleteProps) {
    const { onChange, style } = props

    return (
        <div style={style} >
            <Form
                onSubmit={() => { }}
                initialValues={{}}
            >
                {() => (
                    <form onChange={(e: any) => { onChange(e) }} >
                        <SingleSelectField {...props} />
                    </form>
                )}
            </Form>
        </div>
    )
}