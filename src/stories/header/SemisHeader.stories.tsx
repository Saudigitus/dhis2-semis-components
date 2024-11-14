import type { Meta, StoryObj } from '@storybook/react';
import MainHeader from '../../components/header/mainHeader';


const meta = {
    title: 'Header/Semis Header',
    component: MainHeader,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
    },
} satisfies Meta<typeof MainHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SEMISHeader: Story = {
    args: {
        semisHeader: {
            academicYears: {
                dataElement: { displayName: "Acadeic Year", id: "fnwfdhha0" },
                options: [
                    {
                        label: "2024",
                        value: "2024",
                    },
                    {
                        label: "2023",
                        value: "2023",
                    },
                    {
                        label: "2022",
                        value: "2022",
                    },
                ]
            },
            restItems: [
                {
                    dataElement: { displayName: "Grade", id: "fnwfdhha1" },
                    options: [
                        {
                            label: "Grade 1",
                            value: "Grade 1",
                        },
                        {
                            label: "Grade 2",
                            value: "Grade 2",
                        },
                        {
                            label: "Grade 3",
                            value: "Grade 3",
                        },
                    ]
                },
                {
                    dataElement: { displayName: "Class", id: "fnwfdhha3" },
                    options: [
                        {
                            label: "A",
                            value: "A",
                        },
                        {
                            label: "B",
                            value: "B",
                        },
                        {
                            label: "D",
                            value: "D",
                        },
                    ]
                }
            ],
            orgunits: {
                roots:["ImspTQPwCqd"]
            }
        }
    },
};