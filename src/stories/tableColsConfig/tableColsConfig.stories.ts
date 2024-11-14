import type { Meta, StoryObj } from '@storybook/react';
import DragDropList from '../../components/drag&drop/DragDropList';

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

export const Columns_config: Story = {
    args: {
        listItems: [],
        width: "350px",
        checkable: true,
        title: "Table Columns",
        style: {},
        setListItems: () => { }
    },
};
