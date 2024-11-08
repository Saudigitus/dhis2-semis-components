import { useState } from 'react';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import ModalComponent from '../../components/modal/Modal';


const meta = {
  title: 'Modal/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { description: "The variable which controls the modal status. If true the modal is opened." },
    size: { description: "To set modal width.", options: ["small", "medium", "large"] },
    handleClose: { description: "To set the open value to false and close modal." },
    title: { description: "The title that appears in the modal." },
    children: { description: "The modal body content." },
    position: { description: "To set modal position on app window.", options: ["top", "middle", "bottom"] },
    isClickAway: { description: "This variable determines if the modal will be closed with click away." }
  },
  args: {
    open: false,
    size: "large",
    handleClose: fn(),
    title: 'Modal Component Title',
    children: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet'
  },
} satisfies Meta<typeof ModalComponent>;
export default meta;

type Story = StoryObj<typeof meta>;


export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return <>
      {!open && <button onClick={() => setOpen(true)}>Open Modal</button>}
      <ModalComponent
        open={open}
        size='large'
        handleClose={() => setOpen(false)}
        title='Modal Component Title'
        children='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet'
      />
    </>
  },
};

export const Medium: Story = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return <>
      {!open && <button onClick={() => setOpen(true)}>Open Modal</button>}
      <ModalComponent
        open={open}
        size='medium'
        handleClose={() => setOpen(false)}
        title='Modal Component Title'
        children='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet'
      />
    </>
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return <>
      {!open && <button onClick={() => setOpen(true)}>Open Modal</button>}
      <ModalComponent
        open={open}
        size='small'
        handleClose={() => setOpen(false)}
        title='Modal Component Title'
        children='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet'
      />
    </>
  },
};

export const ClickAwayModal: Story = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return <>
      {!open && <button onClick={() => setOpen(true)}>Open Modal</button>}
      <ModalComponent
        open={open}
        size='medium'
        isClickAway={true}
        handleClose={() => setOpen(false)}
        title='Modal Component Title'
        children='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet'
      />
    </>
  },
};