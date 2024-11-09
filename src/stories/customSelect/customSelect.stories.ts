import type { Meta, StoryObj } from '@storybook/react';
import CustomSingleSelect from '../../components/singleSelect/singleSelect';

const meta = {
    title: 'Group form/Auto complete select',
    component: CustomSingleSelect,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: { required: { control: false } },
} satisfies Meta<typeof CustomSingleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Auto_complete: Story = {
    args: {
        onChange: (e) => { console.log(e) },
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
        name: "fieldName",
        style: { width: "300px" },
        disabled: false,
        required: false
    },
};
