import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import RenderHeader from '../../components/table/render/RenderHeader';
import { Attribute } from '../../types/generated/models';

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

const meta = {
  title: 'Table/RenderHeader',
  component: RenderHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    rowsHeader: headerColumns,
    order: "asc",
    orderBy: "",
    createSortHandler: fn(),
    isCheckbox: false,
    checked: false,
    indeterminate: false,
    onChange: fn(),
    sortable: false
  },

} satisfies Meta<typeof RenderHeader>;

type Story = StoryObj<typeof meta>;

export const Sortable: Story = {
  args: {
    rowsHeader: headerColumns,
    orderBy: "",
    order: "asc",
    loading: false,
    isCheckbox: false,
    checked: false,
    indeterminate: false,
    sortable: true
  },
};

export const Checkable: Story = {
  args: {
    rowsHeader: headerColumns,
    orderBy: "",
    order: "asc",
    loading: false,
    isCheckbox: true,
    checked: false,
    indeterminate: false,
    sortable: false
  },
};

export default meta;