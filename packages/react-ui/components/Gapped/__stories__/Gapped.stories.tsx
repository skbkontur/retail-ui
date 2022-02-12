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

export const WithFalsyChilds = () => {
  const GappedWithFalsyChilds = ({
    falsyChild = null,
    ...props
  }: Partial<Omit<GappedProps, 'children'>> & { falsyChild?: React.ReactNode }) => (
    <Gapped gap={10} {...props}>
      {falsyChild}
      <Button>Button</Button>
      {falsyChild}
      <Button>Button</Button>
      {falsyChild}
    </Gapped>
  );
  const falsyValues = [false, '', 0, null, undefined];
  return falsyValues.map((value, index) => (
    <>
      <table cellPadding="4" key={index}>
        <thead>
          <tr>
            <th />
            <th>with &quot;{String(value)}&quot;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>horizontal</td>
            <td>
              <GappedWithFalsyChilds falsyChild={value} />
            </td>
          </tr>
          <tr>
            <td>vertical</td>
            <td>
              <GappedWithFalsyChilds falsyChild={value} vertical />
            </td>
          </tr>
        </tbody>
      </table>
      {index + 1 < falsyValues.length && <hr />}
    </>
  ));
};
