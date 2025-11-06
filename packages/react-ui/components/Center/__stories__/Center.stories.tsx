import React from 'react';

import { Center } from '../Center';
import type { Meta } from '../../../typings/stories';

const meta: Meta = {
  title: 'Center',
  component: Center,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Simple = () => (
  <div style={{ width: 200, height: 200, border: '1px solid #dfdede' }}>
    <Center>Hola</Center>
  </div>
);
Simple.storyName = 'simple';
