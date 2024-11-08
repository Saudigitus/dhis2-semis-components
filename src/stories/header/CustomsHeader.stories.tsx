import type { Meta, StoryObj } from '@storybook/react';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GradeIcon from '@material-ui/icons/Grade';
import ClassIcon from '@material-ui/icons/Class';

import MainHeader from '../../components/header/mainHeader';


const meta = {
    title: 'Header/Custom Header',
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

export const WithCustomActionOnOptionSelection: Story = {
    args: {
        headerItems: [
            {
                label: "school",
                searchInputPlaceholder: "Search for a organization unit",
                valuePlaceholder: "Select a school",
            },
            {
                label: "Grade",
                onSelectOption: () => { alert("Give me a custom action. eg: Add value to url") },
                searchInputPlaceholder: "Search for a grade",
                valuePlaceholder: "Select a grade",
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
                ]
            },
            {
                label: "Class",
                searchInputPlaceholder: "Search for a class",
                valuePlaceholder: "Select a class",
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
                ]
            }
        ]
    },
};

export const WithIcon: Story = {
    args: {
        headerItems: [
            {
                label: "school",
                searchInputPlaceholder: "Search for a organization unit",
                valuePlaceholder: "Select a school",
                icon: <AccountTreeIcon />
            },
            {
                label: "Grade",
                searchInputPlaceholder: "Search for a grade",
                valuePlaceholder: "Select a grade",
                icon: <GradeIcon />,
                options: [
                    {
                        label: "Grade 1",
                        value: "Grade 1",
                        icon: <ClassIcon />
                    },
                    {
                        label: "Grade 2",
                        value: "Grade 2",
                        icon: <ClassIcon />
                    },
                    {
                        label: "Grade 3",
                        value: "Grade 3",
                        icon: <ClassIcon />
                    },
                    {
                        label: "Grade 4",
                        value: "Grade 4",
                        icon: <ClassIcon />
                    },
                    {
                        label: "Grade 5",
                        value: "Grade 5",
                        icon: <ClassIcon />
                    },
                    {
                        label: "Grade 6",
                        value: "Grade 6",
                        icon: <ClassIcon />
                    },
                    {
                        label: "Grade 7",
                        value: "Grade 7",
                        icon: <ClassIcon />
                    }
                ]
            },
            {
                label: "Class",
                searchInputPlaceholder: "Search for a class",
                valuePlaceholder: "Select a class",
                icon: <ClassIcon />,
                options: [
                    {
                        label: "A",
                        value: "A",
                        icon: <ClassIcon />
                    },
                    {
                        label: "B",
                        value: "B",
                        icon: <ClassIcon />
                    },
                    {
                        label: "C",
                        value: "C",
                        icon: <ClassIcon />
                    },
                    {
                        label: "D",
                        value: "D",
                        icon: <ClassIcon />
                    },
                    {
                        label: "E",
                        value: "E",
                        icon: <ClassIcon />
                    },
                    {
                        label: "F",
                        value: "F",
                        icon: <ClassIcon />
                    }
                ]
            }
        ]
    },
};

export const NoSearchableItems: Story = {
    args: {
        headerItems: [
            {
                label: "school",
                searchInputPlaceholder: "Search for a organization unit",
                valuePlaceholder: "Select a school",
                isSeachable: false
            },
            {
                label: "Grade",
                searchInputPlaceholder: "Search for a grade",
                valuePlaceholder: "Select a grade",
                isSeachable: false
            },
            {
                label: "Class",
                searchInputPlaceholder: "Search for a class",
                valuePlaceholder: "Select a class",
                isSeachable: false
            }
        ]
    },
};

export const NoSelection: Story = {
    args: {
        headerItems: [
            {
                label: "school",
                searchInputPlaceholder: "Search for a organization unit",
                valuePlaceholder: "Select a school",
                withDropDown: false
            },
            {
                label: "Grade",
                searchInputPlaceholder: "Search for a grade",
                valuePlaceholder: "Select a grade",
                withDropDown: false
            },
            {
                label: "Class",
                searchInputPlaceholder: "Search for a class",
                valuePlaceholder: "Select a class",
                withDropDown: false
            }
        ]
    },
};

export const WithCustomAction: Story = {
    args: {
        headerItems: [
            {
                label: "school",
                customAction: () => {
                    alert("This is a custom action")
                },
                searchInputPlaceholder: "Search for a organization unit",
                valuePlaceholder: "Select a school",
                withDropDown: false
            },
            {
                label: "Grade",
                customAction: () => {
                    alert("This is a custom action")
                },
                searchInputPlaceholder: "Search for a grade",
                valuePlaceholder: "Select a grade",
                withDropDown: false
            },
            {
                label: "Class",
                customAction: () => {
                    alert("This is a custom action")
                },
                searchInputPlaceholder: "Search for a class",
                valuePlaceholder: "Select a class",
                withDropDown: false
            }
        ]
    },
};