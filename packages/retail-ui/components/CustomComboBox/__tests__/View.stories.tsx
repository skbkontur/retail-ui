
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import View from '../ComboBoxView';

storiesOf('ComboBoxV2 View', module).add('idle input', () => (
    <View value={{ id: 1, name: 'hello' }} renderValue={renderValue} />
  )).add('idle input with long value', () => (
    <View
      value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
      renderValue={renderValue}
    />
  )).add('idle input with long value and text', () => (
    <div>
      <View
        value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
        renderValue={renderValue}
      />{' '}
      hello
    </div>
  )).add('idle medium input with long value and text', () => (
    <div>
      <View
        size="medium"
        value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
        renderValue={renderValue}
      />{' '}
      hello
    </div>
  )).add('idle large input with long value and text', () => (
    <div>
      <View
        size="large"
        value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
        renderValue={renderValue}
      />{' '}
      hello
    </div>
  )).add('idle empty input and text', () => (
    <div>
      <View value={null} renderValue={renderValue} /> hello
    </div>
  )).add('idle medium empty input and text', () => (
    <div>
      <View size="medium" value={null} renderValue={renderValue} /> hello
    </div>
  )).add('idle large empty input and text', () => (
    <div>
      <View size="large" value={null} renderValue={renderValue} /> hello
    </div>
  )).add('active input', () => <View editing textValue="hello" />).add('with items', () => (
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
  )).add('with error', () => <View editing error textValue="error" />).add('loading', () => <View editing loading opened textValue="loading" />).add('loading with items', () => (
    <View
      editing
      loading
      opened
      textValue="loading"
      items={[{ id: 2, name: 'two' }, { id: 3, name: 'three' }]}
      renderItem={renderValue}
    />
  )).add('not found', () => (
    <View
      editing
      items={[]}
      opened
      textValue="nothing"
      renderNotFound={x => 'Не найдено'}
    />
  )).add('with total count', () => (
    <View
      editing
      textValue="one"
      opened
      items={[{ id: 2, name: 'two' }, { id: 3, name: 'three' }]}
      renderItem={renderValue}
      totalCount={221}
      renderTotalCount={(found, total) => `Показано ${found} из ${total}`}
    />
  )).add('idle with placeholder', () => <View placeholder="placeholder" />).add('idle with long placeholder', () => (
    <View placeholder="looooooooooooooooooooooong placeholder" />
  )).add('idle with long placeholder and text', () => (
    <div>
      <View placeholder="looooooooooooooooooooooong placeholder" />
      Hello
    </div>
  )).add('idle large with long placeholder and text', () => (
    <div>
      <View size="large" placeholder="looooooooooooooooooooooong placeholder" />
      Hello
    </div>
  )).add('active with placeholder', () => (
    <View editing placeholder="placeholder" />
  )).add('active with long placeholder', () => (
    <View editing placeholder="looooooooooooooooooooooong placeholder" />
  )).add('idle disabled', () => <View placeholder="placeholder" disabled />).add('active disabled', () => (
    <View editing placeholder="placeholder" disabled />
  ));

function renderValue({ id, name }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{name}</span>
      <span>{id}</span>
    </div>
  );
}
