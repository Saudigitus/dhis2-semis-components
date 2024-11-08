import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'custom-background',
      values: [
        { name: 'custom-background', value: '#F6F6F6' }, // Custom background color
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};

export default preview;
