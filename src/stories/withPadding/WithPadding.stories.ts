import type { Meta, StoryObj } from '@storybook/react';
import WithPadding from '../../components/template/WithPadding';

const meta = {
    title: 'Layout/With padding',
    component: WithPadding,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: { description: "React component wich you want to apply padding" },
        p: { description: "Your padding value the same as the css padding. Eg: 5px 10px 15px 20px" }
    },
    args: { children: "helloo" },
} satisfies Meta<typeof WithPadding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const With_padding: Story = {
    args: { children: "Hellooo" },
};

