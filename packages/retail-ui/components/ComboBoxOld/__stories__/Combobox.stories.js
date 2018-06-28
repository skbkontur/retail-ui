
/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import ComboBoxOld from '../index';

function source(v) {
  return Promise.resolve({
    values: ['One', 'Two', 'Three'].filter(x =>
      x.toLowerCase().includes(v.toLowerCase())
    ),
    infos: ['One', 'Two', 'Three']
  });
}

function renderValue(value) {
  return <span>{value}</span>;
}

function renderItem(value) {
  return <span>{value}</span>;
}

storiesOf('Combobox OLD', module)
  .add('Simple combobox', () => (
    <ComboBoxOld
      source={source}
      value={'One'}
      renderValue={renderValue}
      renderItem={renderItem}
    />
  ))
  .add('combobox with text', () => (
    <div style={{ marginTop: 400 }}>
      <ComboBoxOld
        source={source}
        value={'One'}
        renderValue={renderValue}
        renderItem={renderItem}
      />{' '}
      Some text here
    </div>
  ));
