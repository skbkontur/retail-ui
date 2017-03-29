// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import View from '../ComboBoxView';

storiesOf('ComboBoxV2 View', module)
  .add('idle input', () => (
    <View
      value={{ id: 1, name: 'hello' }}
      renderValue={renderValue}
    />
  ))
  .add('active input', () => (
    <View
      editing
      textValue="hello"
    />
  ))
  .add('with items', () => (
    <View
      editing
      textValue="one"
      opened
      items={[
        { id: 2, name: 'two' },
        { id: 3, name: 'three' },
        { id: 4, name: 'four' },
        { id: 5, name: 'five' },
        { id: 6, name: 'six' },
        { id: 7, name: 'seven' },
        { id: 8, name: 'eight' },
        { id: 9, name: 'nine' },
        { id: 10, name: 'ten' },
        { id: 11, name: 'eleven' },
        { id: 12, name: 'twelve' }
      ]}
      renderItem={renderValue}
    />
  ))
  .add('with error', () => (
    <View
      editing
      error
      textValue="error"
    />
  ))
  .add('loading', () => (
    <View
      editing
      loading
      opened
      textValue="loading"
    />
  ))
  .add('loading with items', () => (
    <View
      editing
      loading
      opened
      textValue="loading"
      items={[
        { id: 2, name: 'two' },
        { id: 3, name: 'three' }
      ]}
      renderItem={renderValue}
    />
  ))
  .add('not found', () => (
    <View
      editing
      items={[]}
      opened
      textValue="nothing"
      renderNotFound={x => 'Не найдено'}
    />
  ))
  .add('with total count', () => (
    <View
      editing
      textValue="one"
      opened
      items={[
        { id: 2, name: 'two' },
        { id: 3, name: 'three' }
      ]}
      renderItem={renderValue}
      totalCount={221}
      renderTotalCount={(found, total) => `Показано ${found} из ${total}`}
    />
  ))

  .add('idle with placeholder', () => (
    <View
      placeholder="placeholder"
    />
  ))
  .add('active with placeholder', () => (
    <View
      editing
      placeholder="placeholder"
    />
  ))
  .add('idle disabled', () => (
    <View
      placeholder="placeholder"
      disabled
    />
  ))
  .add('active disabled', () => (
    <View
      editing
      placeholder="placeholder"
      disabled
    />
  ));

function renderValue({ id, name }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{name}</span>
      <span>{id}</span>
    </div>
  );
}
