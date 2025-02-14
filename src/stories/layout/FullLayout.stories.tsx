import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FullLayout from "../../components/layout/fullLayout/FullLayout"

const meta = {
    title: 'Layout/Full layout',
    component: FullLayout,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: { },
    args: {  },
} satisfies Meta<typeof FullLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full_Layout: Story = {
    args: {  
        header: <div></div>,
        sidebar: <div></div>,
        children: <div></div>
    },
};

