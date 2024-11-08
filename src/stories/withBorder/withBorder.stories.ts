import type { Meta, StoryObj } from '@storybook/react';
import WithBorder from '../../components/template/WithBorder';

const meta = {
    title: 'Example/With border',
    component: WithBorder,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: { description: "React component wich you want to apply padding" },
        type: { description: "Tye of border that you with to apply to your children, it can be top, bottom or all", options: ["top", "bottom", 'all'] }
    },
    args: { children: "helloo", type: "all" },
} satisfies Meta<typeof WithBorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const With_padding: Story = {
    args: { children: "Hellooo", type: "all" },
};

