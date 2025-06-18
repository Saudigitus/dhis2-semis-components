
import { useEffect, useState } from 'react'
import { IconUpload24, IconCross24, Center, CircularLoader } from "@dhis2/ui"
import { useField, type FieldRenderProps } from "react-final-form"
import style from "./fields.module.css"
import { FormFieldsProps } from '../../../types/form/GenericFieldsTypes'
import { useFileResource } from 'dhis2-semis-functions'
import { Box, Button } from '@mui/material'

interface imageFieldSpecificProps {
    storyBook: boolean
}

interface CombinedProps extends FormFieldsProps, imageFieldSpecificProps { }


function ImageField(props: CombinedProps) {
    const { disabled, name, form, storyBook } = props
    const { input }: FieldRenderProps<any, HTMLElement> = useField(name)
    const [uploadedImage, setUploadedImage] = useState<any>()
    const { createFileResource, getFileResource, loading } = useFileResource()

    const handleFileChange = async (event: any) => {
        const image = event.target.files[0]

        form.batch(() => {
            form.change(name, image)
        })

        const reader = new FileReader()
        reader.onloadend = () => {
            setUploadedImage(reader.result)
        }
        reader.readAsDataURL(image)

        if (!storyBook)
            await createFileResource({ file: image }).then((response) => {
                input.onChange(response?.fileId)
            })
    }

    async function getImage() {
        await getFileResource({ trackedEntity: props.trackedEntity, attribute: input.name }).then((response: { file: any }) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUploadedImage(reader.result)
            }
            reader.readAsDataURL(response.file)
        })
    }

    useEffect(() => {
        if (input.value && !uploadedImage && !storyBook) {
            getImage()
        }
    }, [input.value])

    const onRemove = () => {
        setUploadedImage("")
        input.onChange("")
    }

    if (loading) {
        return <Center><CircularLoader small /></Center>
    }

    return (
        <Box className={style.image_field_box}>
            {
                uploadedImage ? (
                    <span>
                        {!(loading) &&
                            <img src={uploadedImage} alt="Uploaded" className={style.image_field_photo} />
                        }
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
                                loading={loading}
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
                        loading={loading}
                        disabled={disabled}
                    >
                        Remove
                    </Button>
                </div>
            }
        </Box>
    )
}

export default ImageField