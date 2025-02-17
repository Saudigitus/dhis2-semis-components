import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HeaderBarLayout from "../../components/layout/headerBarLayout/HeaderBarLayout"

const meta = {
    title: 'Layout/Header bar layout',
    component: HeaderBarLayout,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: { },
    args: {  },
} satisfies Meta<typeof HeaderBarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header_Bar_Layout: Story = {
    args: {  
        header: <div></div>,
        children: <div></div>
    },
};

