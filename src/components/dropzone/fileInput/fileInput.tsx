function FileInput(props: any) {
    const { name, setUploadedFile, accept = ".csv" } = props

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setUploadedFile(file);
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