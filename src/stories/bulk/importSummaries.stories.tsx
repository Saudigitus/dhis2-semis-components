import type { Meta, StoryObj } from '@storybook/react';
import program from '../../program.json'
import ModalSummaryContent from '../../components/bulk/modal/importSummary/importSummary';

const meta = {
    title: 'Bulk Operations/import summary',
    component: ModalSummaryContent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {},
} satisfies Meta<typeof ModalSummaryContent>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Data_Import: Story = {
    args: {
        invalidRecords: [],
        onSubmit: () => { },
        programConfig: program,
        setOpen: () => { },
        stats: [] as unknown as any,
        validRecords: []
    }
};