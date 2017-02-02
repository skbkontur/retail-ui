// @flow
import React from 'react';
import {storiesOf} from '@kadira/storybook';

import ComboBox from '../../components/ComboBox';

function source() {
  return Promise.resolve({
    values: [1, 2, 3],
    infos: [1, 2, 3],
  });
}

function renderValue(value) {
  return <span>{value}</span>;
}

function renderItem(value) {
  return <span>{value}</span>;
}

storiesOf('Combobox', module).
  add('Simple combobox', () => (
    <ComboBox
      source={source}
      value={1}
      renderValue={renderValue}
      renderItem={renderItem}
    />
  )).
  add('combobox with text', () => (
    <div>
      <ComboBox
        source={source}
        value={1}
        renderValue={renderValue}
        renderItem={renderItem}
      />{' '}
      Some text here
    </div>
  ));
