
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import ComboBoxV2 from '../ComboBox';
import MenuItem from '../../MenuItem';
import MenuSeparator from '../../MenuSeparator';

storiesOf('ComboBox v2', module).add('simple combobox', () => <SimpleCombobox />).add('with error handling', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={errorStrategy}
    />
  )).add('with error skipping', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={nullStrategy}
    />
  )).add('with warning', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={warningStrategy}
    />
  )).add('with rejections', () => (
    <TestComboBox onSearch={searchWithRejections} renderItem={renderValue} />
  )).add('disabled', () => (
    <TestComboBox
      autoFocus
      disabled
      onSearch={search}
      renderItem={renderValue}
    />
  )).add('with custom elements', () => (
    <TestComboBox
      onSearch={searchWithCustomElements}
      renderItem={renderValue}
      onUnexpectedInput={errorStrategy}
    />
  )).add('autocomplete', () => (
    <TestComboBox
      autocomplete
      onSearch={search}
      renderItem={renderValue}
      totalCount={12}
      onUnexpectedInput={errorStrategy}
    />
  )).add('with autoFocus', () => (
    <TestComboBox
      autocomplete
      autoFocus
      onSearch={search}
      renderItem={renderValue}
      totalCount={12}
      onUnexpectedInput={errorStrategy}
    />
  )).add('with maxMenuHeight', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      maxMenuHeight={200}
    />
  )).add('with borderless', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={nullStrategy}
      borderless
    />
  )).add('with center align', () => (
    <SimpleCombobox
      align={'center'}
      placeholder={'placeholder'}
      noInitialValue={true}
    />
  )).add('with right align', () => (
    <SimpleCombobox
      align={'right'}
      placeholder={'placeholder'}
      noInitialValue={true}
    />
  )).add('with maxLength', () => (
    <SimpleCombobox
      maxLength={10}
      placeholder={'placeholder'}
      noInitialValue={true}
    />
  ));

type State = {
  value: Nullable<{ id: number, name: string }>,
  error: boolean,
  warning: boolean
};

class TestComboBox extends React.Component<any, State> {
  state = {
    value: null,
    error: false,
    warning: false
  };

  handleChange = (_, value) => {
    this.setState({ value, error: false });
  };

  render() {
    return (
      <div>
        <ComboBoxV2
          align={this.props.align}
          autocomplete={this.props.autocomplete}
          autoFocus={this.props.autoFocus}
          borderless={this.props.borderless}
          itemToValue={x => x.id}
          disabled={this.props.disabled}
          error={this.state.error}
          warning={this.state.warning}
          value={this.state.value}
          maxMenuHeight={this.props.maxMenuHeight}
          onFocus={() => this.setState({ error: false, warning: false })}
          getItems={this.props.onSearch}
          renderItem={this.props.renderItem}
          renderValue={renderValue}
          valueToString={x => x.name}
          placeholder="numbers"
          onChange={this.handleChange}
          onUnexpectedInput={
            this.props.onUnexpectedInput
              ? this.props.onUnexpectedInput(this.setState.bind(this))
              : undefined
          }
          totalCount={this.props.totalCount}
          renderTotalCount={(found, total) => `Найдено ${found} из ${total}`}
          ref="cb"
        />{' '}
        <button onClick={() => this.refs.cb.focus()}>Focus</button>
        {this.state.error && (
          <div style={{ color: 'red' }}>Необходимо выбрать значение</div>
        )}
        {this.state.warning && (
          <div style={{ color: '#f50' }}>Вы не выбрали значение</div>
        )}
      </div>
    );
  }
}

class SimpleCombobox extends React.Component<{}, any> {
  state = {
    value: this.props.noInitialValue ? null : { value: 1, label: 'First' }
  };
  render() {
    return (
      <ComboBoxV2
        {...this.props}
        value={this.state.value}
        getItems={this.getItems}
        onChange={(_, value) => this.setState(() => ({ value }))}
      />
    );
  }
  getItems = q =>
    Promise.resolve(
      [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
        { value: 4, label: 'Fourth' },
        { value: 5, label: 'Fifth' },
        { value: 6, label: 'Sixth' },
        { value: 7, label: 'A long long long long long long time ago' }
      ].filter(
        x =>
          x.label.toLowerCase().includes(q.toLowerCase()) ||
          x.value.toString(10) === q
      )
    );
}

function errorStrategy(setState) {
  return x => {
    x && setState({ error: true });
  };
}

function nullStrategy(setState) {
  return x => {
    x && setState({ value: null });
  };
}

function warningStrategy(setState) {
  return x => {
    x && setState({ warning: true });
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
  return Promise.resolve().then(delay).then(
      () =>
        searchCount % 2
          ? Promise.reject()
          : items.filter(x => ~x.name.indexOf(query.toLowerCase()))
    );
}

function searchWithCustomElements(query: string) {
  const _items = items.filter(x => x.name.includes(query.toLowerCase()));
  const disabled = <MenuItem disabled>Nothing was found</MenuItem>;
  return Promise.resolve([
    <MenuItem comment="Hello" icon="child" disabled>
      World
    </MenuItem>,
    <MenuSeparator />,
    ..._items.slice(0, 3),
    ...(_items.slice(0, 3).length ? [<MenuSeparator />] : []),
    ...(_items.slice(3).length ? _items.slice(3) : [disabled]),
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
