import { Meta, StoryObj } from "@storybook/react";
import AppWrapper from "../../components/appWrapper/test/appWrapperTest"
import React from 'react';

const meta = {
    title: 'Wrapper/Semis Wrapper',
    component: AppWrapper,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    // argTypes: {

    // },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        dataStoreKey: "celso-testing/config"
    },
} satisfies Meta<typeof AppWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SemisWrapper: Story = {
    args: {
        children:<div>App</div>,
        dataStoreKey: "celso-testing/config"
    }
};