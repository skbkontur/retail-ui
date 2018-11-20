// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import View from '../ComboBoxView';
import Gapped from '../../Gapped';

storiesOf('ComboBoxView', module)
  .add('input like text', () => (
    <Gapped vertical>
      <View value={{ id: 1, name: 'hello' }} renderValue={renderValue} />
      <View
        value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
        renderValue={renderValue}
      />
      <div>
        <View
          value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
          renderValue={renderValue}
        />{' '}
        hello
      </div>
      <div>
        <View
          size="medium"
          value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
          renderValue={renderValue}
        />{' '}
        hello
      </div>
      <div>
        <View
          size="large"
          value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
          renderValue={renderValue}
        />{' '}
        hello
      </div>
      <View placeholder="placeholder" disabled />
      <View error textValue="error" />
    </Gapped>
  ))
  .add('input like text with placeholder', () => (
    <Gapped vertical>
      <View placeholder="placeholder" />
      <View placeholder="looooooooooooooooooooooong placeholder" />
      <div>
        <View placeholder="looooooooooooooooooooooong placeholder" />
        Hello
      </div>
    </Gapped>
  ))
  .add('opened', () => (
    <table>
      <tbody>
        <tr>
          <td style={{ paddingBottom: 60, paddingRight: 10 }}>
            <View editing opened />
          </td>
          <td style={{ paddingBottom: 60 }}>
            <View editing loading opened textValue="loading" />
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: 120, paddingRight: 10 }}>
            <View
              editing
              items={[]}
              opened
              textValue="nothing"
              renderNotFound={() => 'Не найдено'}
            />
          </td>
          <td style={{ paddingBottom: 120 }}>
            <View
              editing
              textValue="one"
              opened
              items={[{ id: 2, name: 'two' }, { id: 3, name: 'three' }]}
              renderItem={renderValue}
              totalCount={221}
              renderTotalCount={(found, total) =>
                `Показано ${found} из ${total}`
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  ))
  .add('with items', () => (
    <div style={{ paddingBottom: 400 }}>
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
    </div>
  ));

function renderValue({
  id,
  name
}: {
  id: React.ReactNode;
  name: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{name}</span>
      <span>{id}</span>
    </div>
  );
}
