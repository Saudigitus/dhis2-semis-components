import type { Meta, StoryObj } from '@storybook/react';
import CustomDropdown from '../../components/buttons/dropdown/DropdownButton';

const meta = {
    title: 'Buttons/Custom Dropdown',
    component: CustomDropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof CustomDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
    args: {
        name: "Button label",
        options: Array.from({ length: 5 }, (_, i) => i + 1).map((x) => ({
            label: `Option ${x}`,
            onClick: () => console.log(`Option ${x}`),
        })),
        disabled: false
    },
};

