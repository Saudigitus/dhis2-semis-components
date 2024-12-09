import React from "react";
function FileInput(props: any) {
    const { name, setUploadedFile, accept = ".csv", setdisplayDetails } = props

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setUploadedFile(file);
            setdisplayDetails({ name: file.name, extension: file.name.split(".")[file.name.split(".").length - 1] })
        };
        reader.readAsDataURL(file);
    };

    return (
        <input
            type="file"
            required
            id="upload-file"
            name={name}
            accept={accept}
            onChange={handleFileChange}
        />
    )
}

export default FileInput