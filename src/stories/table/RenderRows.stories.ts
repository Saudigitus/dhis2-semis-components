import type { Meta, StoryObj } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import RenderRows from '../../components/table/render/RenderRows';
import { Attribute } from '../../types/generated/models';
import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns';

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

const rowsData =[
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' },
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' },
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' },
  { fistid1: 'First Name', fistid2: 'Second Name', fistid3: 'Therd Name', fistid4: 'Fourth Name' }
]

const meta = {
  title: 'Table/RenderRows',
  component: RenderRows,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: {
    headerData: headerColumns,
    rowsData: rowsData,
    searchActions: false,
    loading: false,
    viewPortWidth: 1000,
    isInactive: false,
    isOwnershipOu: false,
    showEnrollments: false,
  },
} satisfies Meta<typeof RenderRows>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WhithoutValues: Story = {
  args: {
    headerData: headerColumns,
    rowsData: rowsData,
    searchActions: false,
    loading: false,
    viewPortWidth: 1000,
    isInactive: false,
    isOwnershipOu: false,
    showEnrollments: false,
  },
};