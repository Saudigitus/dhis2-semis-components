import type { Meta, StoryObj } from '@storybook/react';
import DragDropList from '../../components/drag&drop/DragDropList';

const meta = {
    title: 'Drag and drop/Drag and drop',
    component: DragDropList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof DragDropList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Drag_and_drop: Story = {
    args: {
        listItems: [
            { id: "item1", visible: "true", header: "item 1" },
            { id: "item2", visible: "true", header: "item 2" },
            { id: "item3", visible: "true", header: "item 3" },
            { id: "item4", visible: "true", header: "item 4" },
            { id: "item4", visible: "true", header: "item 5" }
        ],
        handleToggle: (e) => { console.log(e) },
        handleUpdateListOrder: () => { },
        width: "350px"
    },
};
