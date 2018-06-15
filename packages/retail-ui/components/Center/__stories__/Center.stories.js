import React from 'react';
import { storiesOf } from '@storybook/react';
import Center from '../Center';

storiesOf('Center', module).add('simple', () => (
  <div style={{ width: 200, height: 200, border: '1px solid #dfdede' }}>
    <Center>Hola</Center>
  </div>
));
