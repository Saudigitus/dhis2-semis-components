import type { Meta, StoryObj } from '@storybook/react';
import DragDropList from '../../components/drag&drop/DragDropList';
import { Attribute } from '../../types/generated/models';
import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns';

const meta = {
    title: 'Columns config/Columns config',
    component: DragDropList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: { setListItems: { type: 'function' } },
} satisfies Meta<typeof DragDropList>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerColumns = [
    {
        id: "fistid1",
        displayName: "First Name",
        header: "First Name",
        required: false,
        name: "firstName",
        valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        disabled: false,
        visible: true,
        options: {
            optionSet: {
                id: "optionSetId",
                options: [
                    {
                        value: "option1",
                        label: "Option 1"
                    }
                ]
            }
        },
        labelName: "First Name",
        type: VariablesTypes.Attribute,
        trackedEntity: "trackedEntity",
        placeholder: "First Name",
        unique: false,
        searchable: true,
    },
    {
        id: "fistid2",
        displayName: "Second Name",
        header: "First Name",
        required: false,
        name: "firstName",
        valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        disabled: false,
        visible: true,
        options: {
            optionSet: {
                id: "optionSetId",
                options: [
                    {
                        value: "option1",
                        label: "Option 1"
                    }
                ]
            }
        },
        labelName: "First Name",
        type: VariablesTypes.Attribute,
        trackedEntity: "trackedEntity",
        placeholder: "First Name",
        unique: false,
        searchable: true,
    },
    {
        id: "fistid3",
        displayName: "Therd Name",
        header: "First Name",
        required: false,
        name: "firstName",
        valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        disabled: false,
        visible: true,
        options: {
            optionSet: {
                id: "optionSetId",
                options: [
                    {
                        value: "option1",
                        label: "Option 1"
                    }
                ]
            }
        },
        labelName: "First Name",
        type: VariablesTypes.Attribute,
        trackedEntity: "trackedEntity",
        placeholder: "First Name",
        unique: false,
        searchable: true,
    },
    {
        id: "fistid4",
        displayName: "Fourth Name",
        header: "First Name",
        required: false,
        name: "firstName",
        valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
        disabled: false,
        visible: true,
        options: {
            optionSet: {
                id: "optionSetId",
                options: [
                    {
                        value: "option1",
                        label: "Option 1"
                    }
                ]
            }
        },
        labelName: "First Name",
        type: VariablesTypes.Attribute,
        trackedEntity: "trackedEntity",
        placeholder: "First Name",
        unique: false,
        searchable: true,
    }
]

export const Columns_config: Story = {
    args: {
        listItems: headerColumns,
        width: "350px",
        checkable: true,
        title: "Table Columns",
        setListItems: () => { }
    },
};
