import type { Meta, StoryObj } from '@storybook/react';
import DropDownCalendar from '../../components/calendar/DropDownCalendar';

const meta = {
    title: 'Calendar/Dropdown Calendar',
    component: DropDownCalendar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof DropDownCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownCalendar: Story = {
    args: {
        label: "Button label",
        setValue: ({ selectedDate }: { selectedDate: Date }) => console.log('Selected date:', selectedDate),
    },
};

