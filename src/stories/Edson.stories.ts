import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Example/EdsonButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryEdson: Story = {
  args: {
    primary: true,
    label: 'Edson Button',
  },
};

export const SecondaryEdson: Story = {
  args: {
    label: 'Edson Button',
  },
};

export const LargeEdson: Story = {
  args: {
    size: 'large',
    label: 'Edson Button',
  },
};

export const SmallEdson: Story = {
  args: {
    size: 'small',
    label: 'Edson Button',
  },
};