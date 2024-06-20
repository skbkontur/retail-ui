import React from 'react';

import { Center } from '../Center';
import { Meta } from '../../../typings/stories';

export default {
  title: 'Layout/Center',
  component: Center,
  parameters: { creevey: { skip: true } },
  tags: ['autodocs'],
} as Meta;

export const Simple = () => (
  <div style={{ width: 200, height: 200, border: '1px solid #dfdede' }}>
    <Center>Hola</Center>
  </div>
);
Simple.storyName = 'simple';
