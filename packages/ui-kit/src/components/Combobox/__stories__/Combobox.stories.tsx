import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Combobox from '../';

const ITEMS = ['One', 'Two', 'Three'];

const getItems = (query: string) => {
  const items = ITEMS.filter(item => {
    return item.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
  return Promise.resolve(items);
};

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
  .add('Simple example', () => <Combobox getItems={getItems} />);
