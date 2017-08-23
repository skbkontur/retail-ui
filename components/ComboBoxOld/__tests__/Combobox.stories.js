// @flow
/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import ComboBox from '../ComboBox';

function source() {
  return Promise.resolve({
    values: ['One', 'Two', 'Three'],
    infos: ['One', 'Two', 'Three']
  });
}

function renderValue(value) {
  return (
    <span>
      {value}
    </span>
  );
}

function renderItem(value) {
  return (
    <span>
      {value}
    </span>
  );
}

storiesOf('Combobox OLD', module)
  .add('Simple combobox', () =>
    <ComboBox
      source={source}
      value={'One'}
      renderValue={renderValue}
      renderItem={renderItem}
    />
  )
  .add('combobox with text', () =>
    <div>
      <ComboBox
        source={source}
        value={'One'}
        renderValue={renderValue}
        renderItem={renderItem}
      />{' '}
      Some text here
    </div>
  );
