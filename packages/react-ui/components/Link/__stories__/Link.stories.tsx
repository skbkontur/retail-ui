import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon';

import { Story } from '../../../typings/stories';
import { Link } from '../Link';
import { Toast } from '../../Toast';
import { Gapped } from '../../Gapped';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default {
  title: 'Link',
  component: Link,
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },
      },
    },
  },
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
          <ThemeContext.Provider value={ThemeFactory.create({ linkLineHoverBorderBottomStyle: 'dotted' }, theme)}>
            <Link icon={<OkIcon />}>Simple Link</Link>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
