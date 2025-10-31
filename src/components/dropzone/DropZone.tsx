import "./dropzone.css"
import Lottie from "lottie-react";
import { Form } from "react-final-form";
import { useState, useRef, useEffect } from "react";
import uploadcloud from "../../assets/images/bulkImport/uploadcloud.json"
import { ModalActions, Button, ButtonStrip, IconUpload24 } from "@dhis2/ui";
import classNames from "classnames";
import FileInput from "./fileInput/fileInput";
import { FormApi } from 'final-form';
import { type DropZoneProps } from "../../types/dropzone/dropZoneTypes";
import ModalComponent from "../modal/Modal";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import { useRecoilValue } from "recoil";
import { TranslationState } from "../../schemas/translationsSchema";

interface IForm { }

function DropZone(props: DropZoneProps) {
    const { loading, onSave, accept, placeholder, hideUploadIcon, hideLabel, height, width, dialogMode, title, buttonLabel, onCancel } = props;
    const [uploadedFile, setUploadedFile] = useState<any>('');
    const [displayDetails, setdisplayDetails] = useState<{ name: string, extension: string }>({ name: "Drag & drop files or browse", extension: "" });
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const inputFiles = document.querySelectorAll(".dropzone_area input[type='file']");
    const inputElement: any = inputFiles[0];
    const dropZoneElement: any = inputElement?.closest(".dropzone_area");
        const i18n = useRecoilValue(TranslationState) as any

    useEffect(() => {
        if (uploadedFile === undefined) {
            let dropzoneFileMessage = dropZoneElement?.querySelector(".file-info");
            dropzoneFileMessage.innerHTML = `No files selected`;
        }
    }, [uploadedFile]);

    function onChange(): void {
        if (inputElement?.files.length) {
            let dropzoneFileMessage = dropZoneElement.querySelector(".file-info");
            dropzoneFileMessage.innerHTML = `${inputElement?.files[0].name}`;
        }
    }

    const handleClose = () => setOpen(false)

    const formActions = [
        {
            id: "cancel",
            type: "reset",
            label: i18n.t("Cancel"),
            disabled: loading,
            onClick: () => { setUploadedFile(undefined); handleClose(); onCancel && onCancel() },
            secondary: true
        }, {
            id: "continue",
            label: i18n.t("Continue"),
            success: "success",
            disabled: !Boolean(uploadedFile) || loading,
            onClick: () => onSave([uploadedFile]),
            primary: true,
            loading: loading
        }
    ];

    function DropFile() {
        return (
            <Form onSubmit={(e: any) => e.preventDefault()}>
                {({ form }: any) => {
                    formRef.current = form;
                    return <form
                        className="dropzone_box"
                        onChange={onChange}
                    >
                        <div style={height && width ? { height: height, width: width } : height ? { height: height } : width ? { width: width } : { width: "100%" }} className={classNames("dropzone_area", uploadedFile && "dropzone_area_filled_bg")}>
                            <div className={classNames("file_upload_icon", loading && "disabled")}>
                                {uploadedFile ?
                                    <div className="icon" >
                                        <FileIcon extension={displayDetails.extension} {...defaultStyles[displayDetails.extension as DefaultExtensionType]} />
                                    </div>
                                    : !hideUploadIcon && <Lottie animationData={uploadcloud} loop={loading ? false : true} />}
                            </div>
                            <FileInput disabled={loading} accept={accept} name="uploaded-file" setdisplayDetails={setdisplayDetails} setUploadedFile={setUploadedFile} />
                            {!hideLabel && <h4 className={classNames("mb-3 file-info", loading && "disabled")}>{displayDetails.name}</h4>}
                            <p className="mt-3">{placeholder}</p>
                        </div>

                        <ModalActions>
                            <ButtonStrip end >
                                {formActions.map((action: any, i) =>
                                    <Button
                                        key={i}
                                        {...action}
                                    >
                                        {action.label}
                                    </Button>
                                )}
                            </ButtonStrip>
                        </ModalActions>
                    </form>
                }}
            </Form>
        )
    }
    return (
        <>
            {
                dialogMode ?
                    <Button icon={<IconUpload24 />} primary onClick={() => setOpen(true)} >{buttonLabel ? buttonLabel : "Upload Files"}</Button>
                    : <DropFile />
            }
            {open && <ModalComponent children={<DropFile />} open={open} handleClose={handleClose} title={title as unknown as string} key={"Modal-drang-&-drop"} />}
        </>
    )
}

export default DropZone