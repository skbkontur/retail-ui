import React from 'react';

import { Center } from '../Center';

export default {
  title: 'Center',
  parameters: {
    creevey: {
      kind: {
        skip: [true],
      },
    },
  },
};

export const Simple = () => (
  <div style={{ width: 200, height: 200, border: '1px solid #dfdede' }}>
    <Center>Hola</Center>
  </div>
);
Simple.storyName = 'simple';
