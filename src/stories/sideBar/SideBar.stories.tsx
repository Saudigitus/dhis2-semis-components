import type { Meta, StoryObj } from '@storybook/react';
import { SideBar as SideBarComponent } from '../../components/layout';

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
                showBadge: false,
                disabled: false,
                appName: "SEMIS",
                route: `home`,
                appUrl: "/home",
                active: true,
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
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Enrollment",
                route: `enrollment?`,
                appUrl: "/enrollment/student",
                active: false,
            },
            {
                icon: glyph,
                displayInMenu: true,
                label: "Attendance",
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Attendance",
                route: `attendance?`,
                appUrl: "/attendance/student",
                active: false,
            },
            {
                icon: fileDocument,
                displayInMenu: true,
                label: "Performance",
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Performance",
                route: `performance?`,
                appUrl: "/performance/student",
                active: false,
            },
            {
                icon: gauge,
                displayInMenu: true,
                label: "Final result",
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Final-Result",
                route: `final-result?`,
                appUrl: "/final-result/student",
                active: false,
            },
            {
                icon: logOut,
                displayInMenu: true,
                label: "Transfer",
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Transfer",
                route: `transfer`,
                appUrl: "/transfer/student",
                active: false,
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
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Enrollment",
                route: `enrollment`,
                appUrl: "/enrollment/staff",
                active: false,
            },
            {
                icon: glyph,
                displayInMenu: true,
                label: "Attendance",
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Attendance",
                route: `attendance`,
                appUrl: "/attendance/staff",
                active: false,
            },
            {
                icon: logOut,
                displayInMenu: true,
                label: "Transfer",
                showBadge: false,
                disabled: false,
                appName: "SEMIS-Transfer",
                route: `transfer`,
                appUrl: "/transfer/staff",
                active: false,
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
    args: { sideBarData: sideBarData },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colapsed: Story = {

    args: {
        collapsed: true
    },
};

export const Expandend: Story = {
    args: {
        collapsed: false
    },
};
