import Text from '../../components/text/Text';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Components/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
    args: { label: "Hellooo", type: "title" },
};

export const SubTitle: Story = {
    args: { label: "Hellooo", type: "subtitle" },
};