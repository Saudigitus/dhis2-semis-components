import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Form, Field } from "react-final-form"
import { DataProvider } from "@dhis2/app-runtime"
import { RecoilRoot } from "recoil"
import ImageField from "../../components/genericFields/fields/ImageField"
import { FileResourceDemo } from "../../components/form/FileResourceDemo"

const meta = {
    title: "Hooks/useFileResource/ImageField",
    component: ImageField,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof ImageField>

export default meta
type Story = StoryObj<typeof meta>

// Configuração do DHIS2
const dhis2Config = {
    baseUrl: "http://localhost:8080", // ou o URL real
    apiVersion: 41
}

// Wrapper com RecoilRoot + DataProvider
const renderWithForm = (args: any) => (
    <RecoilRoot>
        <DataProvider baseUrl={dhis2Config.baseUrl} apiVersion={dhis2Config.apiVersion}>
            
            <Form
                onSubmit={(values) => console.log("Submitted:", values)}
                initialValues={{ [args.name]: args.value }}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name={args.name}
                            render={() => (
                                <ImageField
                                    {...args}
                                    form={form}
                                    storyBook={false} // faz chamadas reais
                                />
                            )}
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            />
            {/* <FileResourceDemo/> */}
        </DataProvider>
    </RecoilRoot>
)

export const Default: Story = {
    args: {
        name: "cFYnzcqZyZ9",
        trackedEntity: "p2RexZB11kc", // ajusta com um TE existente
        disabled: false,
        value: "P0GWarX74ap"
    },
    render: renderWithForm,
}

export const Disabled: Story = {
    args: {
        name: "cFYnzcqZyZ9",
        trackedEntity: "p2RexZB11kc",
        disabled: true,
        value: "P0GWarX74ap"
    },
    render: renderWithForm,
}
