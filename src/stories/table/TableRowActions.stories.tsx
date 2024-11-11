import type { Meta, StoryObj } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import { RowActionsType } from '../../types/table/TableRowActionsProps';
import { IconEdit24, IconDelete24, IconCheckmarkCircle24 } from "@dhis2/ui";
import TableRowActions from '../../components/table/components/rowsActions/TableRowActions';

const rowsActions: RowActionsType[] = [
    { icon: <IconEdit24 />, color: '#277314', label: `Edition`, disabled: true, loading: false, onClick: () => { alert("Edition") } },
    { icon: <IconDelete24 />, color: '#d64d4d', label: `Delete`, disabled: false, loading: false, onClick: () => { alert("Delete") } },
    { icon: <IconCheckmarkCircle24 />, color: '#147cd7', disabled: false, loading: false, label: 'Complete', onClick: () => { alert("Complete") } }
];

const meta = {
    title: 'Table/TableRowActions',
    component: TableRowActions,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

    args: {
        loading: false, disabled: false, actions: rowsActions
    },
} satisfies Meta<typeof TableRowActions>;
export default meta;

type Story = StoryObj<typeof meta>;

export const IconsDisplay: Story = {
    args: {
        displayType: 'icon',
    }
}

export const MenuDisplay: Story = {
    args: {
        displayType: "menu",
    }
}