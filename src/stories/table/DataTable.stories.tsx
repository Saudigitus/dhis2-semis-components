import React from "react";
import { CustomAttributeProps, VariablesTypes } from '../../types/variables/AttributeColumns';
import type { Meta, StoryObj } from '@storybook/react';
import { Attribute } from '../../types/generated/models';
import Table from '../../components/table/render/Table';
import { RowActionsType } from '../../types/table/TableRowActionsProps';
import { IconEdit24, IconDelete24, IconCheckmarkCircle24 } from "@dhis2/ui";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";

const rowsActions: RowActionsType[] = [
  { icon: <IconEdit24 />, color: '#277314', label: `Edition`, disabled: true, loading: false, onClick: () => { alert("Edition") } },
  { icon: <IconDelete24 />, color: '#d64d4d', label: `Delete`, disabled: false, loading: false, onClick: () => { alert("Delete") } },
  { icon: <IconCheckmarkCircle24 />, color: '#147cd7', disabled: false, loading: false, label: 'Complete', onClick: () => { alert("Complete") } }
];

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
    unique: false,
    searchable: true,
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
    unique: false,
    searchable: true,
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
    unique: false,
    searchable: true,
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
    unique: false,
    searchable: true,
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
    title:"Enrollments",
    viewPortWidth: 1040,
    columns: headerColumns,
    totalElements: 4,
    tableData: rowsData,
    rowAction: rowsActions,
    showRowActions: false,
    defaultFilterNumber: 3,
    rightElements: <div>Right Elements</div>
  },

} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    title:"Enrollments",
    loading: true,
    viewPortWidth: 1040,
    columns: headerColumns,
    totalElements: 4,
    tableData: rowsData,
    rowAction: rowsActions,
    showRowActions: false,
    defaultFilterNumber: 3,
    rightElements: <div>Right Elements</div>
  },
};

export default meta;