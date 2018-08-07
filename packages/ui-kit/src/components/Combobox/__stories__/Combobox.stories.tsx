import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Combobox from '../';

const items = ['One', 'Two', 'Three'];

storiesOf('Combobox', module)
  .addDecorator(story => (
    <div
      style={{
        padding: '20px 120px 150px',
        border: '1px solid #dfdede',
        overflow: 'hidden'
      }}
    >
      {story()}
    </div>
  ))
  // @ts-ignore
  .add('Simple example', () => <Combobox items={items} />);
