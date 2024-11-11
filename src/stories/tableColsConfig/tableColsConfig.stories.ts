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
        listItems: [
            { id: "item1", visible: true, label: "item 1" },
            { id: "item2", visible: true, label: "item 2" },
            { id: "item3", visible: true, label: "item 3" },
            { id: "item4", visible: true, label: "item 4" },
            { id: "item5", visible: true, label: "item 5" }
        ],
        width: "350px",
        checkable: true,
        title: "Table Columns",
        style: {},
        setListItems: () => { }
    },
};
