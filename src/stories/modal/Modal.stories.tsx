import React from 'react';
import { useState } from 'react';
import { Button } from '@dhis2/ui';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import ModalComponent from '../../components/modal/Modal';

const actions = [
  { id: "cancel", small: true, name: "Cancel", disabled: false, primary: true, onClick: () => { } },
  { id: "saveandnew", name: "Save and add new", color: "gray", disabled: false, onClick: () => { } },
  { id: "saveandcontinue", name: "Save and close", primary: true, disabled: false, loading: true, onClick: () => { } }
];

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
    position: { description: "To set modal position on app window.", options: ["top", "middle", "bottom"], value: "middle" },
    isClickAway: { description: "This variable determines if the modal will be closed with click away." }
  },
  args: {
    open: false,
    size: "large",
    handleClose: fn(),
    actions: actions,
    position: "middle",
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
      {!open && <Button onClick={() => setOpen(true)}>Open Modal</Button>}
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
      {!open && <Button onClick={() => setOpen(true)}>Open Modal</Button>}
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
      {!open && <Button onClick={() => setOpen(true)}>Open Modal</Button>}
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
      {!open && <Button onClick={() => setOpen(true)}>Open Modal</Button>}
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

export const ModalWithActions: Story = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return <>
      {!open && <Button onClick={() => setOpen(true)}>Open Modal</Button>}
      <ModalComponent
        open={open}
        size='large'
        actions={actions}
        isClickAway={false}
        handleClose={() => setOpen(false)}
        title='Modal Component Title'
        children='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet'
      />
    </>
  },
};