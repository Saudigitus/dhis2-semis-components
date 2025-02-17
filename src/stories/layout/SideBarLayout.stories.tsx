import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SideBarLayout from "../../components/layout/sideBarLayout/SideBarLayout"

const meta = {
    title: 'Layout/Side bar layout',
    component: SideBarLayout,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: { },
    args: {  },
} satisfies Meta<typeof SideBarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Side_Bar_Layout: Story = {
    args: {  
        sidebar: <div></div>,
        children: <div></div>
    },
};

