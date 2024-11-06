import type { Meta, StoryObj } from '@storybook/react';
import InfoPage from "../../components/info/InfoPage";

const meta = {
    title: 'Example/Info page',
    component: InfoPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        sections: { description: "Uma lista de secções das possiveis instruções" },
        title: { description: "Título do card" }
    },
} satisfies Meta<typeof InfoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info_page: Story = {
    args: {
        title: "SEMIS-Enrollment",
        sections: [{
            sectionTitle: "Follow the instructions to proceed:",
            instructions: ["Select the Organization unit you want to view data",
                "Use global filters(Class, Grade and Academic Year)"
            ]
        }]
    },
};
