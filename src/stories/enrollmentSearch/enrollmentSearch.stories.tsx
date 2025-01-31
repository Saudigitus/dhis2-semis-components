import type { Meta, StoryObj } from '@storybook/react';
import ModalSearchEnrollmentContent from "../../components/searchEnrollment/ModalSearchEnrollmentContent";
import program from '../../utils/constants/programConfig.json'
import { ProgramConfig } from 'dhis2-semis-types';

const meta = {
    title: 'Enrollment/Enrollment search',
    component: ModalSearchEnrollmentContent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<typeof ModalSearchEnrollmentContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enrollment_search: Story = {
    args: {
        open: true,
        sectionName: 'student',
        setOpen: () => { },
        programConfig: program as unknown as ProgramConfig,
    },
};
