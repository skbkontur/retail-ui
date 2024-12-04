import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon';

import type { Story } from '../../../typings/stories';
import { ComponentTable } from '../../../internal/ComponentTable';
import type { LinkProps } from '../Link';
import { Link } from '../Link';
import { Button } from '../../Button';
import { Toast } from '../../Toast';
import { Gapped } from '../../Gapped';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default {
  title: 'Link',
};

export const Simple: Story = () => <Link>Simple Link</Link>;

export const WithIcon: Story = () => {
  return (
    <Gapped vertical>
      <Gapped gap={20}>
        <Link icon={<CheckAIcon16Light />}>Left Icon Link</Link>
        <Link icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>
          Both Icons Link
        </Link>
        <Link rightIcon={<CheckAIcon16Light />}>Right Icon Link</Link>
        <Link icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />} error>
          Both Icons Link Error
        </Link>
      </Gapped>
      <Gapped gap={20}>
        <Link loading icon={<CheckAIcon16Light />}>
          Left Icon Link
        </Link>
        <Link loading icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>
          Both Icons Link
        </Link>
        <Link loading rightIcon={<CheckAIcon16Light />}>
          Right Icon Link
        </Link>
        <Link loading icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />} warning>
          Both Icons Link Warning
        </Link>
      </Gapped>
    </Gapped>
  );
};

export const Danger: Story = () => (
  <Link icon={<OkIcon />} use="danger">
    Simple Link
  </Link>
);

export const Grayed: Story = () => <Link use="grayed">Simple link</Link>;

export const Disabled: Story = () => <Link disabled>Simple link</Link>;

export const WithOnClick = () => <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>;
WithOnClick.storyName = 'With onClick';
WithOnClick.parameters = { creevey: { skip: true } };

export const Loading: Story = () => (
  <Gapped vertical>
    <Link loading>Simple loading </Link>
    <div style={{ width: '300px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <div style={{ width: '150px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <Link loading icon={<OkIcon />}>
      Loading link with icon
    </Link>
  </Gapped>
);
export const FocusedStyledLink: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider value={ThemeFactory.create({ linkHoverTextDecorationStyle: 'dotted' }, theme)}>
            <Link icon={<OkIcon />}>Simple Link</Link>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};

type LinkState = Partial<LinkProps<'a' | 'button'>>;

const linkUseStates: LinkState[] = [{ use: 'default' }, { use: 'danger' }, { use: 'success' }, { use: 'grayed' }];
const componentPropStates: LinkState[] = [
  { children: 'Button' },
  { disabled: true },
  { icon: <CheckAIcon16Light /> },
  { icon: <CheckAIcon16Light />, loading: true },
  { rightIcon: <CheckAIcon16Light /> },
  { rightIcon: <CheckAIcon16Light />, loading: true },
  { icon: <CheckAIcon16Light />, rightIcon: <CheckAIcon16Light /> },
  { icon: <CheckAIcon16Light />, rightIcon: <CheckAIcon16Light />, loading: true },
  { warning: true },
  { error: true },
];

export const LinkAsButton: Story = () => {
  return (
    <ComponentTable
      Component={Link}
      cols={linkUseStates.map((state) => ({ props: state }))}
      rows={componentPropStates.map((x) => ({ props: x }))}
      presetProps={{ children: 'Button', component: 'button' }}
    />
  );
};

export const LinkAsButtonValidation: Story = () => {
  return (
    <Gapped vertical gap={10}>
      <Button use="link" warning>
        Warning
      </Button>
      <Link warning>Warning</Link>
      <Button use="link" error>
        Error
      </Button>
      <Link error>Error</Link>
    </Gapped>
  );
};

export const MultilineLink: Story = () => {
  return (
    <div style={{ width: 300 }}>
      <ComponentTable
        Component={Link}
        cols={[{ props: {} }, { props: { error: true } }, { props: { warning: true } }]}
        rows={[{ props: {} }]}
        presetProps={{ children: 'Mul tilyi  Multili ne Link Multiline' }}
      />
    </div>
  );
};
