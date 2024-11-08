import DropZone from "../../components/dropzone/DropZone";
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
    title: 'Drop zone/Drop zone',
    component: DropZone,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onSave: { action: 'onSave', description: "Function to handle the Save button event" },
        accept: {
            control: { type: "select" }, options: ['.csv', '.xlsx', '.csv,.xlsx'], description: "All known file types and if you want to allow several file types, you can combine them into a single string separated by commas, Eg: tick the last option in the select component of the control column."
        },
        placeholder: { type: "string" },
        hideIcon: {},
        hideLabel: {},
        height: { description: "Fixed or relative values" },
        width: { description: "Fixed or relative values" }
    },
    args: { onSave: fn(), accept: ".csv", placeholder: "Your placeholder here..." },
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Drop_Zone: Story = {
    args: { onSave: fn(), accept: '.csv', hideIcon: false, hideLabel: false, height: "", width: "", buttonLabel: "", dialogMode: false, title: "", placeholder: "" },
};

export const Dialog_Mode: Story = {
    args: { onSave: fn(), accept: '.csv', hideIcon: false, hideLabel: false, height: "", width: "", buttonLabel: "", dialogMode: true, title: "", placeholder: "" },
};