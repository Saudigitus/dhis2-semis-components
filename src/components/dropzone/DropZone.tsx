import "./dropzone.css"
import Lottie from "lottie-react";
import { Form } from "react-final-form";
import { useState, useRef, useEffect } from "react";
import uploadcloud from "../../assets/images/bulkImport/uploadcloud.json"
import Excel from "../../assets/images/bulkImport/excel.svg"
import { ModalActions, Button, ButtonStrip, IconUpload24 } from "@dhis2/ui";
import classNames from "classnames";
import FileInput from "./fileInput/fileInput";
import { FormApi } from 'final-form';
import { type DropZoneProps } from "../../types/dropzone/dropZoneTypes";
import ModalComponent from "../modal/Modal";

interface IForm { }

function DropZone(props: DropZoneProps) {
    const { onSave, accept, placeholder, hideIcon, hideLabel, height, width, dialogMode, title, buttonLabel } = props;
    const [uploadedFile, setUploadedFile] = useState<any>('');
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<FormApi<IForm, Partial<IForm>> | null>(null);
    const inputFiles = document.querySelectorAll(".dropzone_area input[type='file']");
    const inputElement: any = inputFiles[0];
    const dropZoneElement: any = inputElement?.closest(".dropzone_area");

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
        { id: "cancel", type: "reset", label: "Cancel", disabled: false, onClick: () => { setUploadedFile(undefined); setOpen(false) }, secondary: true },
        { id: "continue", label: "Continue", success: "success", disabled: !Boolean(uploadedFile), onClick: () => onSave([uploadedFile]), primary: true }
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
                        <div style={height && width ? { height: height, width: width } : height ? { height: height } : width ? { width: width } : { width: "900px" }} className={classNames("dropzone_area", uploadedFile && "dropzone_area_filled_bg")}>
                            <div className="file_upload_icon">
                                {uploadedFile ? <img src={Excel} className="mb-5 mt-5" /> : !hideIcon && <Lottie animationData={uploadcloud} loop={true} />}
                            </div>
                            <FileInput accept={accept} name="uploaded-file" setUploadedFile={setUploadedFile} />
                            {!hideLabel && <h4 className="mb-3 file-info">Drag & drop files or browse</h4>}
                            <p className="mt-3">{placeholder}</p>
                        </div>

                        <ModalActions>
                            <ButtonStrip end >
                                {formActions.map((action: any, i) =>
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