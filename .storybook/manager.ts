import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light, // ou themes.dark, dependendo do tema que prefere
    brandTitle: "SEMIS Components",
    brandUrl: "https://saudigitus.com",
    // brandImage: "/src/assets/react.png", // Caminho para o logo
  },
});