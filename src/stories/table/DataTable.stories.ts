import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns';
import type { Meta, StoryObj } from '@storybook/react';
import { Attribute } from '../../types/generated/models';
import Table from '../../components/table/render/Table';
import { fn } from '@storybook/test';

const headerColumns = [
  {
    id: "fistid1",
    displayName: "First Name",
    header: "First Name",
    required: false,
    name: "firstName",
    valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
    disabled: false,
    visible: true,
    options: {
      optionSet: {
        id: "optionSetId",
        options: [
          {
            value: "option1",
            label: "Option 1"
          }
        ]
      }
    },
    labelName: "First Name",
    type: VariablesTypes.Attribute,
    trackedEntity: "trackedEntity",
    placeholder: "First Name",
    unique: false
  },
  {
    id: "fistid2",
    displayName: "Second Name",
    header: "First Name",
    required: false,
    name: "firstName",
    valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
    disabled: false,
    visible: true,
    options: {
      optionSet: {
        id: "optionSetId",
        options: [
          {
            value: "option1",
            label: "Option 1"
          }
        ]
      }
    },
    labelName: "First Name",
    type: VariablesTypes.Attribute,
    trackedEntity: "trackedEntity",
    placeholder: "First Name",
    unique: false
  },
  {
    id: "fistid3",
    displayName: "Therd Name",
    header: "First Name",
    required: false,
    name: "firstName",
    valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
    disabled: false,
    visible: true,
    options: {
      optionSet: {
        id: "optionSetId",
        options: [
          {
            value: "option1",
            label: "Option 1"
          }
        ]
      }
    },
    labelName: "First Name",
    type: VariablesTypes.Attribute,
    trackedEntity: "trackedEntity",
    placeholder: "First Name",
    unique: false
  },
  {
    id: "fistid4",
    displayName: "Fourth Name",
    header: "First Name",
    required: false,
    name: "firstName",
    valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
    disabled: false,
    visible: true,
    options: {
      optionSet: {
        id: "optionSetId",
        options: [
          {
            value: "option1",
            label: "Option 1"
          }
        ]
      }
    },
    labelName: "First Name",
    type: VariablesTypes.Attribute,
    trackedEntity: "trackedEntity",
    placeholder: "First Name",
    unique: false
  }
]

const rowsData = [
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' },
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' },
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' },
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' }
]

const meta = {
  title: 'Table/DataTable',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    viewPortWidth: 1040,
    columns: headerColumns,
    totalElements: 4,
    loading: false,
    createSortHandler: () => { },
    order: "asc",
    orderBy: "fistid1",
    tableData: rowsData,
    sortable: true,
    isInactive: false,
    isOwnershipOu: false,
    showEnrollments: false,
  },

} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    viewPortWidth: 1040,
    columns: headerColumns,
    totalElements: 4,
    loading: false,
    createSortHandler: () => { },
    order: "asc",
    orderBy: "fistid1",
    tableData: rowsData,
    sortable: true,
    isInactive: false,
    isOwnershipOu: false,
    showEnrollments: false,
  },
};

export default meta;