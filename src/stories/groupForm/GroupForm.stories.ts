import type { Meta, StoryObj } from '@storybook/react';
import SDCustomForm from "../../components/form/form";
import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns';
// import { fn } from '@storybook/test';

const meta = {
    title: 'Group form/Group form',
    component: SDCustomForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        formFields: { description: "Array of form sections, look at the structure at the Control column. Section name and description are not required!" },
        initialValues: { description: "Initial state of the form, its an object containing field name as key and value Eg: {age: 14, name: Zelton}" },
        loading: { description: "After submit we expect some operation, right? So, when you're processing your data you can send a loading state as true to appear the load icon in the submit button" },
        onFormSubtmit: { description: "Form submission function" },
        onInputChange: { description: "It receives the onchange event, and you can do whatever you want with the response" }
    },
} satisfies Meta<typeof SDCustomForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group_form: Story = {
    args: {
        withButtons: true,
        formFields: [
            {
                name: "Text Inputs",
                description: "No description",
                fields: [
                    {
                        required: false,
                        name: "label",
                        labelName: "Input Label",
                        valueType: "TEXT" as unknown as CustomAttributeProps["valueType"],
                        disabled: false,
                        visible: true,
                        description: "label",
                        id: "label",
                        displayName: "label",
                        type: VariablesTypes.DataElement
                    },
                ]
            },
            {
                name: "Number Input",
                description: "No description",
                fields: [
                    {
                        required: false,
                        name: "Number",
                        labelName: "Number Input",
                        valueType: "NUMBER" as unknown as CustomAttributeProps["valueType"],
                        disabled: false,
                        visible: true,
                        description: "Number",
                        id: "Number",
                        displayName: "Number",
                        type: VariablesTypes.DataElement
                    }
                ]
            },
            {
                name: "Radio input",
                description: "No description",
                fields: [
                    {
                        required: false,
                        name: "boolean",
                        labelName: "Boolean Input",
                        valueType: "BOOLEAN" as unknown as CustomAttributeProps["valueType"],
                        disabled: false,
                        visible: true,
                        description: "Boolean",
                        id: "Boolean",
                        displayName: "Boolean",
                        type: VariablesTypes.DataElement
                    }
                ]
            },
            {
                name: "Long text Input",
                description: "No description",
                fields: [
                    {
                        required: false,
                        name: "longText",
                        labelName: "Long text Input",
                        valueType: "LONG_TEXT" as unknown as CustomAttributeProps["valueType"],
                        disabled: false,
                        visible: true,
                        description: "Long text",
                        id: "longText",
                        displayName: "Long text",
                        type: VariablesTypes.DataElement
                    }
                ]
            },
            {
                name: "Date Input",
                description: "No description",
                fields: [
                    {
                        required: false,
                        name: "Date",
                        labelName: "Date Input",
                        valueType: "DATE" as unknown as CustomAttributeProps["valueType"],
                        disabled: false,
                        visible: true,
                        description: "Date",
                        id: "date",
                        displayName: "Date",
                        type: VariablesTypes.DataElement
                    }
                ]
            },
            {
                name: "Check Input",
                description: "No description",
                fields: [
                    {
                        required: false,
                        name: "Check",
                        labelName: "Check Input",
                        valueType: "TRUE_ONLY" as unknown as CustomAttributeProps["valueType"],
                        disabled: false,
                        visible: true,
                        description: "Check",
                        id: "Check",
                        displayName: "Check",
                        type: VariablesTypes.DataElement
                    }
                ]
            },
            {
                name: "List Input",
                description: "No description",
                fields: [
                    {
                        required: false,
                        name: "List",
                        labelName: "List Input",
                        valueType: "LIST" as unknown as CustomAttributeProps["valueType"],
                        disabled: false,
                        visible: true,
                        options: {
                            optionSet: {
                                id: "option set id",
                                options: [
                                    { label: "Option 1", value: "Option1" },
                                    { label: "Option 2", value: "Option2" },
                                    { label: "Option 3", value: "Option3" },
                                    { label: "Option 4", value: "Option4" }
                                ]
                            }
                        },
                        description: "List",
                        id: "List",
                        displayName: "List",
                        type: VariablesTypes.DataElement
                    }
                ]
            },
        ],
        onFormSubtmit: () => { },
        onInputChange: (e) => { alert(e.target.value) },
        initialValues: {},
        style: { width: "900px" },
        loading: false
    },
};
