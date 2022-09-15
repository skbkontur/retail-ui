import React from 'react';
import { Ok } from '@skbkontur/react-icons';

import { Meta, Story } from '../../../typings/stories';
import { FakeUserActionsTable } from '../../../internal/FakeUserActions/FakeUserActionsTable';
import { Link, LinkProps } from '../Link';

export default {
  title: 'Link/FakeUserActions',
  parameters: { creevey: { captureElement: '#FakeUserActionsTable' } },
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'Текст',
      name: 'children',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'disabled',
    },
    loading: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'loading',
    },
    _button: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: '_button',
    },
    _buttonOpened: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: '_buttonOpened',
    },
    icon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'icon',
    },
    theme: {
      control: { type: 'object' },
      name: 'theme',
    },
  },
} as Meta;

const uses: Array<LinkProps['use']> = ['default', 'success', 'danger', 'grayed'];

const LinkFakeUserActions: React.FunctionComponent<Partial<LinkProps>> = ({ icon, ...props }) => (
  <FakeUserActionsTable propName="use" propValues={uses}>
    <Link {...props} icon={icon && <Ok />} />
  </FakeUserActionsTable>
);

export const Customize = LinkFakeUserActions.bind({}) as Story;

export const Default = LinkFakeUserActions.bind({}) as Story;

export const IconButton = LinkFakeUserActions.bind({}) as Story;
IconButton.args = {
  icon: true,
  _button: true,
};

export const IconButtonOpened = LinkFakeUserActions.bind({}) as Story;
IconButtonOpened.args = {
  icon: true,
  _button: true,
  _buttonOpened: true,
};

export const IconLoading = LinkFakeUserActions.bind({}) as Story;
IconLoading.args = {
  icon: true,
  loading: true,
};

export const IconDisabled = LinkFakeUserActions.bind({}) as Story;
IconDisabled.args = {
  icon: true,
  disabled: true,
};

export const ThemeContrast = LinkFakeUserActions.bind({}) as Story;
ThemeContrast.args = {
  theme: {
    linkColor: 'red',
    linkHoverColor: 'green',
    linkActiveColor: 'blue',
    linkLineBorderBottomColor: 'red',
    linkLineHoverBorderBottomColor: 'green',
    linkLineActiveBorderBottomColor: 'blue',
    linkSuccessColor: 'red',
    linkSuccessHoverColor: 'green',
    linkSuccessActiveColor: 'blue',
    linkLineBorderBottomColorSuccess: 'red',
    linkLineHoverBorderBottomColorSuccess: 'green',
    linkLineActiveBorderBottomColorSuccess: 'blue',
    linkDangerColor: 'red',
    linkDangerHoverColor: 'green',
    linkDangerActiveColor: 'blue',
    linkLineBorderBottomColorDanger: 'red',
    linkLineHoverBorderBottomColorDanger: 'green',
    linkLineActiveBorderBottomColorDanger: 'blue',
    linkGrayedColor: 'red',
    linkGrayedHoverColor: 'green',
    linkGrayedActiveColor: 'blue',
    linkLineBorderBottomColorGrayed: 'red',
    linkLineHoverBorderBottomColorGrayed: 'green',
    linkLineActiveBorderBottomColorGrayed: 'blue',
  },
};
