import React from 'react';
import { Ok } from '@skbkontur/react-icons';

import { Meta, Story } from '../../../typings/stories';
import { Button, ButtonProps, ButtonUse } from '../Button';
import { FakeUserActionsTable } from '../../../internal/FakeUserActions/FakeUserActionsTable';

export default {
  title: 'Button/FakeUserActions',
  parameters: { creevey: { captureElement: '#FakeUserActionsTable' } },
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'Текст',
      name: 'children',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'small',
      name: 'size',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      defaultValue: '',
      name: 'align',
    },
    width: {
      control: { type: 'text' },
      defaultValue: 'auto',
      name: 'width',
    },
    arrow: {
      control: { type: 'select' },
      options: [false, true, 'left'],
      defaultValue: false,
      name: 'arrow',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'disabled',
    },
    borderless: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'borderless',
    },
    error: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'error',
    },
    warning: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'warning',
    },
    loading: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'loading',
    },
    narrow: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'narrow',
    },
    checked: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'checked',
    },
    icon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'icon',
    },
  },
} as Meta;

const uses: ButtonUse[] = ['default', 'primary', 'success', 'danger', 'pay', 'link', 'text', 'backless'];

const ButtonFakeUserActions: React.FunctionComponent<Partial<ButtonProps>> = ({ icon, ...props }) => (
  <FakeUserActionsTable propName="use" propValues={uses}>
    <Button {...props} icon={icon && <Ok />} />
  </FakeUserActionsTable>
);

export const Default = ButtonFakeUserActions.bind({}) as Story;

export const Customize = ButtonFakeUserActions.bind({}) as Story;

export const Borderless = ButtonFakeUserActions.bind({}) as Story;
Borderless.args = {
  borderless: true,
};

export const ArrowDisabled = ButtonFakeUserActions.bind({}) as Story;
ArrowDisabled.args = {
  arrow: true,
  disabled: true,
};
