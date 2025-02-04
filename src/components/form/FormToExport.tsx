import CustomForm from "./form";
import { FormProps } from "dhis2-semis-types";

export default function FormToExport(props: FormProps) {
    return <CustomForm {...props} storyBook={false} />
}