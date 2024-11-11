import { Meta, StoryObj } from "@storybook/react";
import { SummaryCard } from "../../components";

const meta = {
    title: 'Card/Summary Card',
    component: SummaryCard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    // argTypes: {

    // },
    argTypes: {
        label: {
            description: "Text describing the displayed number",
        },
        color: {
            description: "The background color of the card",
            options: [ 'default', 'primary', 'success', 'error', 'warning' ]
        },
        className: {
            description: "To customize the style of the card",
            type: "string"
        }
      },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SummaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCard: Story = {
    args: {
        value: 34,
        label: "Ignored",
        color: "default"
    },
};

export const PrimaryCard: Story = {
    args: {
        value: 34,
        label: "Updated",
        color: "primary"
    },
};

export const WarningCard: Story = {
    args: {
        value: 34,
        label: "Duplicates",
        color: "warning"
    },
};

export const SuccessCard: Story = {
    args: {
        value: 34,
        label: "Imported",
        color: "success"
    },
};

export const ErrorCard: Story = {
    args: {
        value: 34,
        label: "Failed",
        color: "error"
    },
};