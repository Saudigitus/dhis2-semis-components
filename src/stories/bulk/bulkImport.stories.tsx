import type { Meta, StoryObj } from '@storybook/react';
import student from '../../utils/constants/student.json'
import program from '../../utils/constants/programConfig.json'
import ProcessImport from '../../components/bulk/bulkImport/processImport'

const meta = {
    title: 'SEMIS Bulk Operations/Bulk Import',
    component: ProcessImport,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {},
} satisfies Meta<typeof ProcessImport>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Data_Import: Story = {
    args: {
        orgUnit: 'Shc3qNhrPAz',
        programConfig: program as unknown as any,
        sectionType: 'student',
        selectedSectionDataStore: student as unknown as any,
        module: "enrollment",
        importMode: 'COMMIT',
        label: "Click me to open drop zone",
        baseURL: "",
        onError: (err) => { console.log(err) }
    }
};