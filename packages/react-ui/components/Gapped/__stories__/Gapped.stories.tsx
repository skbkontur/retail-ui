import React from 'react';
import times from 'lodash/times';
import { ComponentStory } from '@storybook/react';

import { Meta } from '../../../typings/stories';
import { Gapped, GappedProps } from '../Gapped';
import { Button } from '../../Button';

export default {
  title: 'components/Gapped',
  decorators: [
    (Story) => (
      <div style={{ padding: '5px', border: '1px solid black', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: ComponentStory<typeof Gapped> = ({ children, ...rest }) => <Gapped {...rest}>{children}</Gapped>;

const commonArgs = {
  gap: 20,
  wrap: false,
  vertical: false,
};

const generateButtons = (amount: number) => {
  let counter = 0;

  return times(amount, () => {
    counter++;
    return <Button key={counter}>Button</Button>;
  });
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  ...commonArgs,
  children: generateButtons(2),
};

export const Vertical = Template.bind({});
Vertical.args = {
  ...commonArgs,
  vertical: true,
  children: generateButtons(2),
};

export const HorizontalWrap = Template.bind({});
HorizontalWrap.args = {
  ...commonArgs,
  gap: 100,
  wrap: true,
  children: generateButtons(4),
};

export const HorizontalNoWrap = Template.bind({});
HorizontalNoWrap.args = {
  ...commonArgs,
  children: generateButtons(4),
};

export const WithNullChilds = () => {
  const GappedWithNulls = (props: Partial<Pick<GappedProps, 'vertical' | 'wrap'>>) => (
    <Gapped gap={10} {...props}>
      {null}
      <Button>Button</Button>
      {null}
      <Button>Button</Button>
      {null}
    </Gapped>
  );
  return (
    <table cellPadding="10">
      <thead>
        <tr>
          <th />
          <th>with null childs</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>no wrap</td>
          <td>
            <GappedWithNulls />
          </td>
        </tr>
        <tr>
          <td>wrap</td>
          <td>
            <GappedWithNulls wrap />
          </td>
        </tr>
        <tr>
          <td>vert / no wrap</td>
          <td>
            <GappedWithNulls vertical />
          </td>
        </tr>
        <tr>
          <td>vert / wrap</td>
          <td>
            <GappedWithNulls wrap vertical />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
