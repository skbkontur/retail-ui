import React from 'react';

import { Meta } from '../../../typings/stories';
import { Gapped, GappedProps } from '../Gapped';
import { Button } from '../../Button';

export default {
  title: 'Gapped',
  decorators: [
    Story => (
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
