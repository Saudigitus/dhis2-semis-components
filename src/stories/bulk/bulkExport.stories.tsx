import DataExporter from "../../components/bulk/bulkExport/DataExporter";
import type { Meta, StoryObj } from '@storybook/react';
import student from '../../utils/constants/student.json';
import program from '../../utils/constants/programConfig.json';
import { DataProvider } from "@dhis2/app-runtime";
import React from "react";
import ProcessExport from "../../components/bulk/bulkExport/processExport";

const meta = {
    title: 'Bulk Operations/Bulk Export',
    component: DataExporter,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
} satisfies Meta<typeof DataExporter>;

export default meta;
type Story = StoryObj<typeof meta>;

const dhis2Config = {
    baseUrl: "https://emis.dhis2.org/startracker",
    auth: { username: "dev_admin", password: "Dev2023!" },
};

const renderWithProvider = (args: any) => (
    <DataProvider config={dhis2Config}>
        <ProcessExport {...args} />
    </DataProvider>
);

const baseArgs = {
    fileName: "custom file name",
    orgUnit: "Shc3qNhrPAz",
    orgUnitName: "Albion LBS",
    programConfig: program as any,
    sectionType: "student",
    selectedSectionDataStore: student as any,
    baseURL: "",
};

export const Data_export: Story = {
    args: {
        ...baseArgs as unknown as any,
        eventFilters: [`iDSrFrrVgmX:in:2023`],
        stagesToExport: [student["final-result"].programStage],
        label: "Click me to export data",
        module: "final-result",
    },
    render: renderWithProvider,
};

export const Attendance_export: Story = {
    args: {
        ...baseArgs as unknown as any,
        eventFilters: [`iDSrFrrVgmX:in:2023`, `kNNoif9gASf:in:Grade 1`, `RhABRLO2Fae:in:A`],
        stagesToExport: [student.attendance.programStage],
        label: "Click me to export Attendance Data",
        module: "attendance",

    },
    render: renderWithProvider,
};

export const Empty_enrollment_template: Story = {
    args: {
        ...baseArgs as unknown as any,
        eventFilters: [`iDSrFrrVgmX:in:2023`],
        stagesToExport: [student.registration.programStage],
        label: "Click me to export empty sheet",
        module: "enrollment",
        empty: true,
    },
    render: renderWithProvider,
};
