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
            academicYears: { options: [
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
            ], loader: false },
            classes: { options: [
                {
                    label: "A",
                    value: "A",
                },
                {
                    label: "B",
                    value: "B",
                },
                {
                    label: "C",
                    value: "C",
                },
                {
                    label: "D",
                    value: "D",
                },
                {
                    label: "E",
                    value: "E",
                },
                {
                    label: "F",
                    value: "F",
                }
            ], loader: false },
            grades: {
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
                    {
                        label: "Grade 4",
                        value: "Grade 4",
                    },
                    {
                        label: "Grade 5",
                        value: "Grade 5",
                    },
                    {
                        label: "Grade 6",
                        value: "Grade 6",
                    },
                    {
                        label: "Grade 7",
                        value: "Grade 7",
                    }
                ], loader: false
            },
            orgunits: {
                options: [
                    
                ], loader: false
            }
        }
        // headerItems: [
        //     {
        //         label: "school",
        //         searchInputPlaceholder: "Search for a organization unit",
        //         valuePlaceholder: "Select a school",
        //         withDropDown: true
        //     },
        //     {
        //         label: "Grade",
        //         withDropDown: true,
        //         searchInputPlaceholder: "Search for a grade",
        //         valuePlaceholder: "Select a grade",
        //         options: [
        //             {
        //                 label: "Grade 1",
        //                 value: "Grade 1",
        //             },
        //             {
        //                 label: "Grade 2",
        //                 value: "Grade 2",
        //             },
        //             {
        //                 label: "Grade 3",
        //                 value: "Grade 3",
        //             },
        //             {
        //                 label: "Grade 4",
        //                 value: "Grade 4",
        //             },
        //             {
        //                 label: "Grade 5",
        //                 value: "Grade 5",
        //             },
        //             {
        //                 label: "Grade 6",
        //                 value: "Grade 6",
        //             },
        //             {
        //                 label: "Grade 7",
        //                 value: "Grade 7",
        //             }
        //         ]
        //     },
        //     {
        //         label: "Class",
        //         withDropDown: true,
        //         searchInputPlaceholder: "Search for a class",
        //         valuePlaceholder: "Select a class",
        //         options: [
        //             {
        //                 label: "A",
        //                 value: "A",
        //             },
        //             {
        //                 label: "B",
        //                 value: "B",
        //             },
        //             {
        //                 label: "C",
        //                 value: "C",
        //             },
        //             {
        //                 label: "D",
        //                 value: "D",
        //             },
        //             {
        //                 label: "E",
        //                 value: "E",
        //             },
        //             {
        //                 label: "F",
        //                 value: "F",
        //             }
        //         ]
        //     }
        // ]
    },
};