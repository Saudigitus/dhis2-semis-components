import type { Meta, StoryObj } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";

import Pagination from '../../components/table/components/pagination/Pagination';

const meta = {
  title: 'Table/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    page: 1,
    rowsPerPage: 10,
    onPageChange: () => { },
    onRowsPerPageChange: () => { },
    loading: false,
    totalPerPage: 100,
    disablePreviousPage: true,
    disableNextPage: false,
    rowsPerPages: [
      { value: 10, label: '10' },
      { value: 20, label: '20' },
      { value: 50, label: '50' },
      { value: 100, label: '100' },
    ]

  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingPagination: Story = {
  args: {
    page: 10,
    rowsPerPage: 10,
    onPageChange: () => { },
    onRowsPerPageChange: () => { },
    loading: true,
    totalPerPage: 100,
    disablePreviousPage: true,
    disableNextPage: false,
    rowsPerPages: [
      { value: 10, label: '10' },
      { value: 20, label: '20' },
      { value: 50, label: '50' },
      { value: 100, label: '100' },
    ]
  },
};
