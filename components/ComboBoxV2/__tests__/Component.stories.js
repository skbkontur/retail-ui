// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Component from '../Component';

storiesOf('ComboBox v2', module).add('simple', () => <TestComboBox />);

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
      <Component
        error={this.state.error}
        value={this.state.value}
        onSearchRequest={search}
        renderItem={renderValue}
        renderValue={renderValue}
        valueToString={x => x.name}
        placeholder="number"
        onChange={this.handleChange}
        onUnexpectedInput={x => {
          x && this.setState({ error: true, value: null });
        }}
        renderNotFound={() => 'Not found'}
        totalCount={12}
        renderTotalCount={(found, total) => `Found ${found} of ${total}`}
      />
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
    { id: 12, name: 'twelve' }
  ];

  const random = v => Math.random() * v;

  const delay = v =>
    new Promise(resolve => setTimeout(resolve, random(5) * 100, v));

  return Promise.resolve(
    items.filter(x => ~x.name.indexOf(query.toLowerCase()))
  ).then(delay);
}

function renderValue({ id, name }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{name}</span>
      <span>{id}</span>
    </div>
  );
}
