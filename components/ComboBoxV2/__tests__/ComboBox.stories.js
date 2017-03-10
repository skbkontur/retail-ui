// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ComboBoxV2 from '../ComboBox';
import Button from '../../Button';
import MenuItem from '../../MenuItem';
import MenuSeparator from '../../MenuSeparator';

storiesOf('ComboBox v2', module)
  .add('simple', () => (
    <TestComboBox onSearch={search} renderItem={renderValue} totalCount={12} />
  ))
  .add('with rejections', () => (
    <TestComboBox onSearch={searchWithRejections} renderItem={renderValue} />
  ))
  .add('with custom elements', () => (
    <TestComboBox
      onSearch={searchWithCustomElements}
      renderItem={renderValue}
    />
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
        <ComboBoxV2
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
            x && this.setState({ error: true, value: null });
          }}
          totalCount={this.props.totalCount}
          renderTotalCount={(found, total) => `Found ${found} of ${total}`}
        />

        <button>Ok</button>

        {this.state.error &&
          <div style={{ color: 'red' }}>Необходимо выбрать значение</div>}

      </div>
    );
  }
}

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

function search(query: string) {

  const random = v => Math.random() * v;

  const delay = v =>
    new Promise(resolve => setTimeout(resolve, random(5) * 100, v));

  return Promise.resolve(
    items.filter(x => ~x.name.indexOf(query.toLowerCase()))
  ).then(delay);
}

let searchCount = 0;
function searchWithRejections(query: string) {
  const random = v => Math.random() * v;

  const delay = v =>
    new Promise(resolve => setTimeout(resolve, random(5) * 100, v));

  searchCount++;
  return Promise.resolve()
    .then(delay)
    .then(() => searchCount % 2 ? Promise.reject() : [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
      { id: 3, name: 'three' }
    ]);
}

function searchWithCustomElements(query: string) {
  const _items = items.filter(x => x.name.includes(query.toLowerCase()));

  return Promise.resolve([
    ..._items.slice(0, 3),
    ...(_items.slice(0, 3).length ? [<MenuSeparator />] : []),
    ...(_items.slice(3).length
      ? _items.slice(3)
      : [<MenuItem disabled>
           Nothing was found
         </MenuItem>]
    ),
    <MenuSeparator />,
    <MenuItem alkoLink onClick={() => alert('Clicked')}>
      Ha ha
    </MenuItem>
  ]);
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
