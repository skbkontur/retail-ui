// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ComboBox from '../Component';
import Button from '../../Button';

storiesOf('ComboBox v2', module)
  .add('simple', () => (
    <TestComboBox onSearch={search} renderItem={renderValue} />
  ))
  .add('with rejections', () => (
    <TestComboBox onSearch={searchWithRejections} renderItem={renderValue} />
  ));

class TestComboBox extends React.Component {
  state = {
    value: null,
    error: false
  };

  handleChange = value => {
    this.setState({ value, error: false });
  };

  render() {
    return (
      <div>
        <ComboBox
          error={this.state.error}
          value={this.state.value}
          onFocus={() => this.setState({ error: false })}
          onSearchRequest={this.props.onSearch}
          renderItem={this.props.renderItem}
          renderValue={renderValue}
          valueToString={x => x.name}
          placeholder="number"
          onChange={this.handleChange}
          onUnexpectedInput={x => {
            x && this.setState({ error: true });
          }}
          renderNotFound={() => 'Not found'}
          totalCount={12}
          renderTotalCount={(found, total) => `Found ${found} of ${total}`}
        />
        {this.state.error &&
          <div style={{ color: 'red' }}>Необходимо выбрать значение</div>}
        <button>Ok</button>
      </div>
    );
  }
}

function search(query: string) {
  const items = [
    { id: 1, name: 'one' },
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
    { id: 12, name: 'twelve' },
    { id: 13, name: 'very long long long long long long name' }
  ];

  const random = v => Math.random() * v;

  const delay = v =>
    new Promise(resolve => setTimeout(resolve, random(5) * 100, v));

  return Promise.resolve(
    items.filter(x => ~x.name.indexOf(query.toLowerCase()))
  ).then(delay);
}

function searchWithRejections(query: string) {
  const random = v => Math.random() * v;

  const delay = v =>
    new Promise(resolve => setTimeout(resolve, random(5) * 100, v));

  return Promise.resolve()
    .then(delay)
    .then(() => Promise.reject({ error: 'error' }));
}

function renderValue({ id, name }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: 250
      }}
    >
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginRight: 20
        }}
      >
        {name}
      </span>
      <span>{id}</span>
    </div>
  );
}

function renderError(errorItem, index, search, input) {
  return (
    <div>
      <div>Не удалось получить данные с сервера </div>
      <Button use="link" onClick={() => search(input)}>Повторить запрос</Button>
    </div>
  );
}
