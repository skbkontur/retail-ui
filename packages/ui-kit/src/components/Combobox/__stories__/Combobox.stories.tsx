import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Combobox from '../';
import MenuItem from '../../MenuItem';
import Button from '../../Button';
import Input from '../../Input';

interface Item {
  value: number;
  label: string;
}

const ITEMS: Array<React.ReactElement<any> | Item> = [
  <MenuItem.Static key="static1">
    <Input width="100%" />
  </MenuItem.Static>,
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  <MenuItem.Header key="23">Header</MenuItem.Header>,
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  <MenuItem.Separator key="static2" />,
  <MenuItem.Static key="static3">
    <Button key="static4">Button is here!</Button>
  </MenuItem.Static>,
  <MenuItem.Separator key="static5" />,
  { value: 5, label: 'Fifth' },
  { value: 6, label: 'Sixth' },
  // tslint:disable-next-line:jsx-no-lambda
  <MenuItem disabled key="static6" onClick={e => e.preventDefault()}>
    Button
  </MenuItem>
];

const getItems = (query: string) => {
  const items = ITEMS.filter(item => {
    return (
      React.isValidElement(item) ||
      (item as Item).label.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      (item as Item).value.toString().indexOf(query.toLowerCase()) > -1
    );
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
