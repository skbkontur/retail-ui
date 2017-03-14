// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ComboBoxV3 from '../ComboBox';
import MenuItem from '../../MenuItem';
import MenuSeparator from '../../MenuSeparator';

storiesOf('ComboBox v3', module)
  .add('with error handling', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      totalCount={12}
      onUnexpectedInput={errorStrategy}
    />
  ))
  .add('with error skipping', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      totalCount={12}
      onUnexpectedInput={nullStrategy}
    />
  ))
  .add('with warning', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      totalCount={12}
      onUnexpectedInput={warningStrategy}
    />
  ))
  .add('with rejections', () => (
    <TestComboBox onSearch={searchWithRejections} renderItem={renderValue} />
  ))
  .add('with custom elements', () => (
    <TestComboBox
      onSearch={searchWithCustomElements}
      renderItem={renderValue}
      onUnexpectedInput={errorStrategy}
    />
  ))
  .add('scanner', () => (
    <ScannerInput />
  ));

class TestComboBox extends React.Component {
  state = {
    value: null,
    error: false,
    warning: false
  };

  handleChange = value => {
    this.setState({ value, error: false });
  };

  render() {
    return (
      <div>
        <ComboBoxV3
          error={this.state.error}
          warning={this.state.warning}
          value={this.state.value}
          onFocus={() => this.setState({ error: false, warning: false })}
          onSearchRequest={this.props.onSearch}
          renderItem={this.props.renderItem}
          renderValue={renderValue}
          valueToString={x => x.name}
          placeholder="number"
          onChange={this.handleChange}
          onUnexpectedInput={
            this.props.onUnexpectedInput
              ? this.props.onUnexpectedInput(this.setState.bind(this))
              : undefined
          }
          totalCount={this.props.totalCount}
          renderTotalCount={(found, total) => `Найдено ${found} из ${total}`}
        />

        <button>Ok</button>

        {this.state.error &&
          <div style={{ color: 'red' }}>Необходимо выбрать значение</div>}

        {this.state.warning &&
          <div style={{ color: '#f50' }}>Вы не выбрали значение</div>}

      </div>
    );
  }
}

class ScannerInput extends React.Component {
  state = {
    loading: false,
    value: null,
    error: false
  };

  checkSum = textValue => {
    if (textValue && textValue === '0000000000') {
      this.setState({ loading: true });
      this.handleCodeSearch(textValue);
      return true;
    }
    this.setState({ error: true });
    return false;
  };

  handleCodeSearch = code => {
    const delay = v => new Promise(resolve => setTimeout(resolve, 2000, v));
    Promise.resolve({ id: 99, name: 'Putinka' })
      .then(delay)
      .then((value) => {
        console.log('setting', value);
        this.setState({ loading: false, value }, this.refs.input.blur);
      });
  };

  render() {
    return (
      <div>
        <ComboBoxV3
          ref="input"
          error={this.state.error}
          placeholder="Enter name or code"
          value={this.state.value}
          onChange={value => {
            this.setState({ value });
            this.props.onChange(value.id);
          }}
          onFocus={() => this.setState({ error: false })}
          onSearchRequest={search}
          onInputChange={this.checkSum}
          onUnexpectedInput={this.checkSum}
          disabled={this.state.loading}
          renderItem={renderValue}
          renderValue={renderValue}
          valueToString={x => x.name}
        />
      </div>
    );
  }
}

function errorStrategy(setState) {
  return x => {
    x && setState({ error: true, value: null });
  };
}

function nullStrategy(setState) {
  return x => {
    x && setState({ value: null });
    return true;
  };
}

function warningStrategy(setState) {
  return x => {
    x && setState({ value: null, warning: true });
  };
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
  { id: 13, name: 'very long long long long long long name' },
  { id: 99, name: 'Putinka' }
];

function search(query: string) {
  const random = v => Math.random() * v;

  const delay = v =>
    new Promise(resolve => setTimeout(resolve, random(10) * 100, v));

  return Promise.resolve(
    items.filter(x => ~x.name.toLowerCase().indexOf(query.toLowerCase()))
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
    .then(
      () =>
        searchCount % 2
          ? Promise.reject()
          : items.filter(x => ~x.name.indexOf(query.toLowerCase()))
    );
}

function searchWithCustomElements(query: string) {
  const _items = items.filter(x => x.name.includes(query.toLowerCase()));

  return Promise.resolve([
    <MenuItem comment="Hello" icon="child" disabled>
      World
    </MenuItem>,
    <MenuSeparator />,
    ..._items.slice(0, 3),
    ...(_items.slice(0, 3).length ? [<MenuSeparator />] : []),
    ...(_items.slice(3).length
      ? _items.slice(3)
      : [
        <MenuItem disabled>
          Nothing was found
        </MenuItem>
      ]),
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
