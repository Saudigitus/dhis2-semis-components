import { FormProps } from "../../types/form/GroupFormProps";
import CustomForm from "./form";


export default function FormToExport(props: FormProps) {
    return <CustomForm {...props} storyBook={false} />
}