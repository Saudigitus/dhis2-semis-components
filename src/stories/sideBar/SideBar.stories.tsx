import type { Meta, StoryObj } from '@storybook/react';
import SideBarComponent from '../../components/sidebar/SideBar';
import gauge from "../../assets/images/sidebar/gauge.svg"
import fileDocument from "../../assets/images/sidebar/file-document.svg"
import glyph from "../../assets/images/sidebar/Glyph.svg"
import listAdd from "../../assets/images/sidebar/listAdd.svg"
import logOut from "../../assets/images/sidebar/log-out.svg"
import userGroup from "../../assets/images/sidebar/user-group.svg"
import home from "../../assets/images/sidebar/home.svg"
import { SideBarItemProps } from '../../types/sideBar/SideBarTypes';



const sideBarData: SideBarItemProps[] = [
    {
        title: "Navigation",
        displayInMenu: true,
        subItems: [
            {
                icon: home,
                displayInMenu: true,
                label: "Home",
               
                disabled: false,
                appName: "SEMIS",
                route: `home`,
                appUrl: "/home",
                active: true,
                action: () => console.log("You clicked menu")
            }
        ]
    },
    {
        title: "Students",
        displayInMenu: true,
        subItems: [
            {
                icon: listAdd,
                displayInMenu: true,
                label: "Enrollment",
               
                disabled: false,
                appName: "SEMIS-Enrollment",
                route: `enrollment?`,
                appUrl: "/enrollment/student",
                active: false,
                action: () => console.log("You clicked menu")
            },
            {
                icon: glyph,
                displayInMenu: true,
                label: "Attendance",
               
                disabled: false,
                appName: "SEMIS-Attendance",
                route: `attendance?`,
                appUrl: "/attendance/student",
                active: false,
                action: () => console.log("You clicked menu")
            },
            {
                icon: fileDocument,
                displayInMenu: true,
                label: "Performance",
               
                disabled: false,
                appName: "SEMIS-Performance",
                route: `performance?`,
                appUrl: "/performance/student",
                active: false,
                action: () => console.log("You clicked menu")
            },
            {
                icon: gauge,
                displayInMenu: true,
                label: "Final result",
               
                disabled: false,
                appName: "SEMIS-Final-Result",
                route: `final-result?`,
                appUrl: "/final-result/student",
                active: false,
                action: () => console.log("You clicked menu")
            },
            {
                icon: logOut,
                displayInMenu: true,
                label: "Transfer",
               
                disabled: false,
                appName: "SEMIS-Transfer",
                route: `transfer`,
                appUrl: "/transfer/student",
                active: false,
                action: () => console.log("You clicked menu")
            }
        ]
    },
    {
        title: "Staff",
        displayInMenu: true,
        subItems: [
            {
                icon: userGroup,
                displayInMenu: true,
                label: "Staff registry",
               
                disabled: false,
                appName: "SEMIS-Enrollment",
                route: `enrollment`,
                appUrl: "/enrollment/staff",
                active: false,
                action: () => console.log("You clicked menu")
            },
            {
                icon: glyph,
                displayInMenu: true,
                label: "Attendance",
               
                disabled: false,
                appName: "SEMIS-Attendance",
                route: `attendance`,
                appUrl: "/attendance/staff",
                active: false,
                action: () => console.log("You clicked menu")
            },
            {
                icon: logOut,
                displayInMenu: true,
                label: "Transfer",
               
                disabled: false,
                appName: "SEMIS-Transfer",
                route: `transfer`,
                appUrl: "/transfer/staff",
                active: false,
                action: () => console.log("You clicked menu")
            }
        ]
    }
]

const meta = {
    title: 'SideBar/SideBar',
    component: SideBarComponent,
    parameters: {
        layout: 'centered',
    },
    args: { sideBarData: sideBarData, collapsed: true},
    argTypes: {
        collapsed: { 
            control: { type: 'boolean' },
            description: "Collapse the sidebar",
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SideBarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBar: Story = {

    args: {
        collapsed: true
    },
};

export const Expandend: Story = {
    args: {
        collapsed: false
    },
};
