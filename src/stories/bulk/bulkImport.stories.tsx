import DataExporter from "../../components/bulk/bulkExport/DataExporter";
import type { Meta, StoryObj } from '@storybook/react';
import student from '../../utils/constants/student.json'
import program from '../../utils/constants/programConfig.json'
import { DataProvider } from "@dhis2/app-runtime";
import React from "react";
import ProcessExport from "../../components/bulk/bulkExport/processExport";

const meta = {
    title: 'Bulk Operations/Bulk Export',
    component: ProcessExport,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {},
} satisfies Meta<typeof ProcessExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const dhis2Config = {
    baseUrl: "https://emis.dhis2.org/startracker",
    auth: {
        username: "dev_admin",
        password: "Dev2023!",
    },
};

export const Enrollment_Export: Story = {
    args: {
        eventFilters: [`iDSrFrrVgmX:in:2023`],
        fileName: "custom file name",
        orgUnit: 'Shc3qNhrPAz',
        orgUnitName: 'Albion LBS',
        programConfig: program as unknown as any,
        sectionType: 'student',
        stagesToExport: [],
        selectedSectionDataStore: student as unknown as any,
        label: "Click me to export",
        module: "enrollment",
        baseURL: ""
    },

    render: (args) => (
        <DataProvider config={dhis2Config}>
            <DataExporter {...args} />
        </DataProvider>
    ),
};