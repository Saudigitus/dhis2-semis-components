import { Meta, StoryObj } from "@storybook/react";
import icon from "../../assets/escolha.png"
import calendar from "../../assets/attendance.png"
import books from "../../assets/pilha-de-livros.png"


import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MemoryIcon from '@material-ui/icons/Memory';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import { DashboardCard } from "../../components";
import { Action } from "../../types/cardDashboardProps";

const meta = {
    title: 'Card/Dashboard Card',
    component: DashboardCard,
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
        icon: calendar,
        alignActions: "end",
        contents: [{ label: "Attendances" }],
        size: 'small',
        actions: [
            {
                icon: <AddIcon />,
                label: "New attendance",
                onAction: () => { alert("Added attendace") },
            },
            {
                icon: <MenuIcon />,
                label: "List attendances",
                onAction: () => { alert("Listing attendaces") },
            }
        ]
    },
} satisfies Meta<typeof DashboardCard>;

export default meta;

type Story = StoryObj<typeof meta>;


export const ComposedCard: Story = {
    // args: {
    //     // actions: [],
    //     // icon: undefined,
    //     // title: undefined
    // },
};

const actions: Action[] = [
    {
        onAction: () => { alert("Clicked") },
        icon: <MenuBookIcon />,
        label: "New graduation"
    },
    {
        onAction: () => { alert("Clicked") },
        icon: <MemoryIcon />,
        label: "New graduation"
    },
    {
        onAction: () => { alert("Clicked") },
        icon: <CameraEnhanceIcon />,
        label: "New graduation"
    },
    {
        onAction: () => { alert("Clicked") },
        icon: <AddIcon />,
        label: "New graduation"
    },
    {
        onAction: () => { alert("Clicked") },
        icon: <AddIcon />,
        label: "New graduation"
    },
    {
        onAction: () => { alert("Clicked") },
        icon: <AddIcon />,
        label: "New graduation"
    }
]

export const DefaultCard: Story = {
    args: {
        icon: undefined,
        actions: undefined,
        contents: undefined
    },
};

export const WithMoreActions: Story = {
    args: {
        contents: [{ label: "Multi Actions" }],
        icon: icon,
        actions: actions
    },
};

const actions1: Action[] = [
    {
        onAction: () => { alert("Clicked") },
        icon: <AddIcon />,
        label: "New graduation"
    },
    {
        onAction: () => { alert("Clicked") },
        icon: <MenuIcon />,
        label: "New graduation"
    }
]

export const WithLabelAndValues: Story = {
    args: {
        contents: [
            { label: "Used books", value: 15, infoMsg: "Total of books purchased this year that can still be used" },
            { label: "Burn books", value: 10, infoMsg: "Total of books purchased this year that can still be used" },
        ],
        icon: books,
        actions: actions1
    },
};