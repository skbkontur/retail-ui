import React from 'react';

import { Meta } from '../../../typings/stories';
import { Gapped, GappedProps } from '../Gapped';
import { Button } from '../../Button';

export default {
  title: 'Gapped',
  decorators: [
    (Story) => (
      <div style={{ padding: '5px', border: '1px solid black', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Horizontal = () => (
  <Gapped gap={20}>
    <Button>Button</Button>
    <Button>Button</Button>
  </Gapped>
);

export const Vertical = () => (
  <Gapped gap={20} vertical>
    <Button>Button</Button>
    <Button>Button</Button>
  </Gapped>
);

export const HorizontalWrap = () => (
  <Gapped gap={100} wrap>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Gapped>
);

export const HorizontalNoWrap = () => (
  <Gapped gap={20}>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Gapped>
);

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
            <td>no wrap</td>
            <td>
              <GappedWithFalsyChilds falsyChild={value} />
            </td>
          </tr>
          <tr>
            <td>wrap</td>
            <td>
              <GappedWithFalsyChilds falsyChild={value} wrap />
            </td>
          </tr>
          <tr>
            <td>vert / no wrap</td>
            <td>
              <GappedWithFalsyChilds falsyChild={value} vertical />
            </td>
          </tr>
          <tr>
            <td>vert / wrap</td>
            <td>
              <GappedWithFalsyChilds falsyChild={value} wrap vertical />
            </td>
          </tr>
        </tbody>
      </table>
      {index + 1 < falsyValues.length && <hr />}
    </>
  ));
};
