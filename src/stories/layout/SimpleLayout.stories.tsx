import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SimpleLayout from "../../components/layout/simpleLayout/SimpleLayout"

const meta = {
    title: 'Layout/Simple layout',
    component: SimpleLayout,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: { },
    args: {  },
} satisfies Meta<typeof SimpleLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple_Layout: Story = {
    args: {  
        children: <div></div>
    },
};

