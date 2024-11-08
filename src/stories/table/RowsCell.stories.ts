import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-select/dist/react-select.css";
import RowCell from '../../components/table/components/row/RowCell';


const meta = {
  title: 'Table/RowsCell',
  component: RowCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof RowCell>;

export default meta;
