// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import ComboBoxV2, { ComboBoxProps } from '../ComboBox';
import MenuItem from '../../MenuItem';
import MenuSeparator from '../../MenuSeparator';
import { IconName } from '../../Icon';
import { Nullable, Omit } from '../../../typings/utility-types';
import { action } from '@storybook/addon-actions';
import Toggle from '../../Toggle';
import Button from '../../Button';

storiesOf('ComboBox v2', module)
  .add('simple combobox', () => <SimpleCombobox />)
  .add('with error handling', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={errorStrategy}
    />
  ))
  .add('with error skipping', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={nullStrategy}
    />
  ))
  .add('with warning', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={warningStrategy}
    />
  ))
  .add('with rejections', () => (
    <TestComboBox onSearch={searchWithRejections} renderItem={renderValue} />
  ))
  .add('disabled', () => (
    <TestComboBox
      autoFocus
      disabled
      onSearch={search}
      renderItem={renderValue}
    />
  ))
  .add('with custom elements', () => (
    <TestComboBox
      onSearch={searchWithCustomElements}
      renderItem={renderValue}
      onUnexpectedInput={errorStrategy}
    />
  ))
  .add('autocomplete', () => (
    <TestComboBox
      autocomplete
      onSearch={search}
      renderItem={renderValue}
      totalCount={12}
      onUnexpectedInput={errorStrategy}
    />
  ))
  .add('with autoFocus', () => (
    <TestComboBox
      autocomplete
      autoFocus
      onSearch={search}
      renderItem={renderValue}
      totalCount={12}
      onUnexpectedInput={errorStrategy}
    />
  ))
  .add('with maxMenuHeight', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      maxMenuHeight={200}
    />
  ))
  .add('with borderless', () => (
    <TestComboBox
      onSearch={search}
      renderItem={renderValue}
      onUnexpectedInput={nullStrategy}
      borderless
    />
  ))
  .add('with center align', () => (
    <SimpleCombobox
      align={'center'}
      placeholder={'placeholder'}
      noInitialValue={true}
    />
  ))
  .add('with right align', () => (
    <SimpleCombobox
      align={'right'}
      placeholder={'placeholder'}
      noInitialValue={true}
    />
  ))
  .add('with maxLength', () => (
    <SimpleCombobox
      maxLength={10}
      placeholder={'placeholder'}
      noInitialValue={true}
    />
  ))
  .add('toogle error', () => <ComboBoxWithErrorToggler />)
  .add('with `null` onUnexpectedInput', () => (
    <ComboBoxV2 onUnexpectedInput={() => null} />
  ))
  .add('with external value', () => <ComboBoxWithExternalValue />);

interface ComboBoxWithErrorTogglerState {
  error: boolean;
  value: { label: number };
}
class ComboBoxWithErrorToggler extends React.Component<
  {},
  ComboBoxWithErrorTogglerState
> {
  public state: ComboBoxWithErrorTogglerState = {
    error: false,
    value: { label: 0 }
  };

  public render() {
    return (
      <>
        <ComboBoxV2 error={this.state.error} value={this.state.value} />
        <Toggle
          onChange={value =>
            this.setState(state => ({
              error: value,
              value: { label: state.value.label + 1 }
            }))
          }
        />
      </>
    );
  }
}

interface ValueType {
  id: number;
  name: string;
}

interface ComboBoxState {
  value: Nullable<ValueType>;
  error: boolean;
  warning: boolean;
}

interface TestComboboxProps<T>
  extends Omit<ComboBoxProps<T>, 'onUnexpectedInput'> {
  onSearch?: (query: string) => Promise<T[]>;
  onUnexpectedInput?: (
    setState: (state: Partial<ComboBoxState>) => void
  ) => (x: string) => any;
}

class TestComboBox extends React.Component<
  TestComboboxProps<any>,
  ComboBoxState
> {
  public state: ComboBoxState = {
    value: null,
    error: false,
    warning: false
  };

  private combobox: Nullable<ComboBoxV2<ValueType>> = null;

  public render() {
    return (
      <div>
        <ComboBoxV2
          align={this.props.align}
          autocomplete={this.props.autocomplete}
          autoFocus={this.props.autoFocus}
          borderless={this.props.borderless}
          itemToValue={x => (x as ValueType).id}
          disabled={this.props.disabled}
          error={this.state.error}
          warning={this.state.warning}
          value={this.state.value}
          maxMenuHeight={this.props.maxMenuHeight}
          onBlur={action('blur')}
          onFocus={() =>
            this.setState({ error: false, warning: false }, action('focus'))
          }
          getItems={this.props.onSearch}
          renderItem={this.props.renderItem}
          renderValue={renderValue}
          valueToString={x => (x as ValueType).name}
          placeholder="numbers"
          onChange={this.handleChange}
          onUnexpectedInput={
            this.props.onUnexpectedInput
              ? this.props.onUnexpectedInput(this.setState.bind(this))
              : undefined
          }
          totalCount={this.props.totalCount}
          renderTotalCount={(found, total) => `Найдено ${found} из ${total}`}
          ref={el => {
            this.combobox = el;
          }}
        />{' '}
        <button
          onClick={() => {
            if (this.combobox) {
              this.combobox.focus();
            }
          }}
        >
          Focus
        </button>
        {this.state.error && (
          <div style={{ color: 'red' }}>Необходимо выбрать значение</div>
        )}
        {this.state.warning && (
          <div style={{ color: '#f50' }}>Вы не выбрали значение</div>
        )}
      </div>
    );
  }

  private handleChange = (_: any, value: ValueType) => {
    this.setState({ value, error: false });
  };
}

interface SimpleComboboxProps {
  noInitialValue?: boolean;
}

interface SimpleComboboxState {
  value: Nullable<{ value: number; label: string }>;
}

class SimpleCombobox extends React.Component<
  SimpleComboboxProps & ComboBoxProps<any>,
  SimpleComboboxState
> {
  public state: SimpleComboboxState = {
    value: this.props.noInitialValue ? null : { value: 1, label: 'First' }
  };

  public render() {
    return (
      <ComboBoxV2
        {...this.props}
        value={this.state.value}
        getItems={this.getItems}
        onChange={(_, value) => this.setState({ value })}
      />
    );
  }

  private getItems = (query: string) =>
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
          x.label.toLowerCase().includes(query.toLowerCase()) ||
          x.value.toString(10) === query
      )
    );
}

function errorStrategy(
  setState: (state: Partial<ComboBoxState>) => void
): (x: any) => void {
  return x => {
    if (x) {
      setState({ error: true });
    }
  };
}

function nullStrategy(
  setState: (state: Partial<ComboBoxState>) => void
): (x: any) => void {
  return x => {
    if (x) {
      setState({ value: null });
    }
  };
}

function warningStrategy(
  setState: (state: Partial<ComboBoxState>) => void
): (x: any) => void {
  return x => {
    if (x) {
      setState({ warning: true });
    }
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

function search(query: string): Promise<any> {
  const random = (v: any) => Math.random() * v;

  const delay = (v: any) =>
    new Promise(resolve => setTimeout(resolve, random(10) * 100, v));

  return Promise.resolve(
    items.filter(x => ~x.name.toLowerCase().indexOf(query.toLowerCase()))
  ).then(delay);
}

let searchCount = 0;
function searchWithRejections(query: string): Promise<any> {
  const random = (v: number) => Math.random() * v;

  const delay = (v: any) =>
    new Promise(resolve => setTimeout(resolve, random(5) * 100, v));

  searchCount++;
  return Promise.resolve()
    .then(delay)
    .then(() => {
      searchCount % 2
        ? Promise.reject()
        : items.filter(x => ~x.name.indexOf(query.toLowerCase()));
    });
}

function searchWithCustomElements(query: string) {
  const _items = items.filter(x => x.name.includes(query.toLowerCase()));
  const disabled = <MenuItem disabled>Nothing was found</MenuItem>;
  return Promise.resolve([
    <MenuItem key={1} comment="Hello" icon={'child' as IconName} disabled>
      World
    </MenuItem>,
    <MenuSeparator key={2} />,
    ..._items.slice(0, 3),
    ...(_items.slice(0, 3).length ? [<MenuSeparator key={5} />] : []),
    ...(_items.slice(3).length ? _items.slice(3) : [disabled]),
    <MenuSeparator key={3} />,
    <MenuItem key={4} alkoLink onClick={() => alert('Clicked')}>
      Ha ha
    </MenuItem>
  ]);
}

function renderValue({ id, name }: ValueType): React.ReactNode {
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

class ComboBoxWithExternalValue extends React.Component {
  public state = {
    value: { value: 1, label: 'First' },
    warning: false
  };

  private combobox: Nullable<ComboBoxV2<any>>;

  public render = () => (
    <div>
      <ComboBoxV2
        getItems={this.getItems}
        value={this.state.value}
        onChange={this.onChange}
        onUnexpectedInput={this.onUnexpectedInput}
        warning={this.state.warning}
        ref={element => (this.combobox = element)}
      />
      <Button onClick={this.fill}>Set `First`</Button>
      <Button onClick={this.reset}>Reset</Button>
      <div>
        this.state.value:
        <code>{JSON.stringify(this.state.value)}</code>
      </div>
    </div>
  );

  private fill = () => {
    this.setState({
      value: { value: 1, label: 'First' },
      warning: false
    });
  };

  private reset = () => {
    this.setState({
      warning: false,
      value: null
    });
    if (this.combobox) {
      this.combobox.reset();
    }
  };

  private getItems = (q: string) =>
    Promise.resolve(
      [{ value: 1, label: 'First' }, { value: 2, label: 'Second' }].filter(
        x =>
          x.label.toLowerCase().includes(q.toLowerCase()) ||
          x.value.toString(10) === q
      )
    );

  private onChange = (_: any, value: { value: number; label: string }) =>
    this.setState({ value, warning: false });

  private onUnexpectedInput = (query: string) => {
    this.setState({
      warning: true
    });
    return null;
  };
}
