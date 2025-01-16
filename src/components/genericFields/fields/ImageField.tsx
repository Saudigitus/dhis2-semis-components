
import { useEffect, useState } from 'react'
import { IconUpload24, IconCross24 } from "@dhis2/ui";
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useField, type FieldRenderProps } from "react-final-form";
import style from "./fields.module.css";
import { FormFieldsProps } from '../../../types/form/GenericFieldsTypes';

function ImageField(props: FormFieldsProps) {
    const { disabled, name, required, form } = props
    const { input }: FieldRenderProps<any, HTMLElement> = useField(name);
    const [uploadedImage, setUploadedImage] = useState<any>();

    const handleFileChange = async (event: any) => {
        const image = event.target.files[0];

        form.batch(() => {
            form.change(name, image);
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);
        };
        reader.readAsDataURL(image);

    };

    useEffect(() => {
        if (input.value && !uploadedImage) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(input?.value);
        }
    }, [input.value])

    const onRemove = () => {
        setUploadedImage("");
        input.onChange("");
    }

    return (
        <Box className={style.image_field_box}>
            {
                uploadedImage ? (
                    <span>
                        <img src={uploadedImage} alt="Uploaded" className={style.image_field_photo} />
                    </span>
                ) :
                    <span>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleFileChange}
                            disabled={disabled}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                className={style.customDhis2Button}
                                component="span"
                                startIcon={<IconUpload24 />}
                                disabled={disabled}
                            >
                                Choose File
                            </Button>
                        </label>

                    </span>
            }

            {uploadedImage &&
                <div style={{ margin: "auto", display: "flex" }}>
                    <Button
                        className={style.customDhis2Button}
                        component="span"
                        startIcon={<IconCross24 />}
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                </div>
            }
        </Box>
    )
}

export default ImageField