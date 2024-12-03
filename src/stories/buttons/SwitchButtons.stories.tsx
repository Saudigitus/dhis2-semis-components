import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SimpleButtonType } from '../../types/buttons/switchButtonsProps';
import { fn } from '@storybook/test';
import SwitchButtonView from '../../components/buttons/switchButtons/switchButtonsView';

const meta = {
    title: 'Buttons/Switch Buttons',
    component: SwitchButtonView,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: "The `SwitchButtonView` component displays a set of toggleable buttons. It can be configured to show items either in a linear arrangement or within a dropdown menu, based on the `maxLinearItems` property. Ideal for applications where users need to switch between multiple options efficiently.",
            },
        },
    },
    
    tags: ['autodocs'],
    argTypes: {
        selected: { 
            control: 'object',
            description: "The currently selected item in the component. This defines which button appears active."
        },
        items: { 
            control: 'object',
            description: "An array of items to display as buttons or options. Each item includes an `id` and `label`."
        },
        maxLinearItems: { 
            control: 'number',
            description: "Specifies the maximum number of items displayed in a linear layout before switching to a dropdown view."
        },
        setSelected: { 
            action: 'selected', 
            description: "Callback function to update the `selected` when a different button is clicked. Handles the selection change."
        },
        onSelect: { 
            action: 'selected', 
            description: "An auxiliary callback function triggered when an item is selected. This function can be customized to perform additional actions upon selection."
        }
        
    }
    
} satisfies Meta<typeof SwitchButtonView>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialItems: SimpleButtonType[] = [
    { id: "item1", label: "Item 1" },
    { id: "item2", label: "Item 2" },
    { id: "item3", label: "Item 3" },
    { id: "item4", label: "Item 4" }
];

export const Multiple_Buttons: Story = {
    render: (args) => {
        const [selected, setSelected] = useState(initialItems[0]);

        return (
            <SwitchButtonView
                {...args}
                selected={selected}
                setSelected={setSelected}
                onSelect={() => {}}
            />
        );
    },
    args: { items: initialItems, selected: initialItems[1], setSelected: fn(), maxLinearItems: 4, onSelect: fn() },
    parameters: {
        docs: {
            description: {
                story: "This story demonstrates multiple switch buttons displayed in a linear layout with a maximum of 4 visible items.",
            },
        },
    },
};

export const Simple_Dropdown: Story = {
    render: (args) => {
        const [selected, setSelected] = useState();

        return (
            <SwitchButtonView
                {...args}
                selected={selected}
                setSelected={setSelected}
                onSelect={() => {}}
            />
        );
    },
    args: { items: initialItems, selected: initialItems[1], setSelected: fn(), maxLinearItems: 3, onSelect: fn() },
    parameters: {
        docs: {
            description: {
                story: "This story showcases a dropdown layout for switch buttons with a maximum of 3 visible items before collapsing into a dropdown.",
            },
        },
    },
};
