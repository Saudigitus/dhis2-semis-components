import type { Meta, StoryObj } from '@storybook/react';
import EnrollmentFilters from '../../components/filters/enrollment/EnrollmentFilters';
import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns';

const meta = {
    title: 'Table/Filters',
    component: EnrollmentFilters,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        defaultFilterNumber: { control: { type: "number" } }
    },
} satisfies Meta<typeof EnrollmentFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filters: Story = {
    args: {
        defaultFilterNumber: 3,
        filterState: { attributes: [], dataElements: [] },
        setFilterState: () => { },
        variables: [
            {
                id: 'age',
                displayName: 'Age',
                header: 'age',
                required: false,
                name: 'age',
                labelName: 'age',
                valueType: 'TEXT' as unknown as CustomAttributeProps["valueType"],
                options: undefined,
                visible: true,
                disabled: false,
                searchable: true,
                error: false,
                displayInFilters: true,
                type: VariablesTypes.Attribute
            },
            {
                id: 'name',
                displayName: 'Name',
                header: 'name',
                required: false,
                name: 'name',
                labelName: 'name',
                valueType: 'TEXT' as unknown as CustomAttributeProps["valueType"],
                options: undefined,
                visible: true,
                disabled: false,
                searchable: true,
                error: false,
                displayInFilters: true,
                type: VariablesTypes.Attribute
            },
            {
                id: 'Surname',
                displayName: 'Surname',
                header: 'Surname',
                required: false,
                name: 'Surname',
                labelName: 'Surname',
                valueType: 'TEXT' as unknown as CustomAttributeProps["valueType"],
                options: undefined,
                visible: true,
                disabled: false,
                searchable: true,
                error: false,
                displayInFilters: true,
                type: VariablesTypes.Custom
            },
            {
                id: 'Date of birth',
                displayName: 'Date of birth',
                header: 'Date of birth',
                required: false,
                name: 'Date of birth',
                labelName: 'Date of birth',
                valueType: 'DATE' as unknown as CustomAttributeProps["valueType"],
                options: undefined,
                visible: true,
                disabled: false,
                searchable: true,
                error: false,
                displayInFilters: true,
                type: VariablesTypes.Custom
            },
            {
                id: 'Sex',
                displayName: 'Sex',
                header: 'Sex',
                required: false,
                name: 'Sex',
                labelName: 'Sex',
                valueType: 'LIST' as unknown as CustomAttributeProps["valueType"],
                options: { optionSet: { id: "sex", options: [{ label: "M", value: "m" }, { label: "M", value: "m" }] } },
                visible: true,
                disabled: false,
                searchable: true,
                error: false,
                displayInFilters: true,
                type: VariablesTypes.Custom
            },
            {
                id: 'Attribute',
                displayName: 'Attribute',
                header: 'Attribute',
                required: false,
                name: 'Attribute',
                labelName: 'Attribute',
                valueType: 'TEXT' as unknown as CustomAttributeProps["valueType"],
                options: undefined,
                visible: true,
                disabled: false,
                searchable: true,
                error: false,
                displayInFilters: true,
                type: VariablesTypes.Custom
            },
            {
                id: 'Attribute name',
                displayName: 'Attribute name',
                header: 'Attribute name',
                required: false,
                name: 'Attribute name',
                labelName: 'Attribute name',
                valueType: 'TEXT' as unknown as CustomAttributeProps["valueType"],
                options: undefined,
                visible: true,
                disabled: false,
                searchable: true,
                error: false,
                displayInFilters: true,
                type: VariablesTypes.Custom
            }
        ]
    },
};
