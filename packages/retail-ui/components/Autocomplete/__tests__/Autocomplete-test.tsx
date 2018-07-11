// tslint:disable:jsx-no-lambda
import * as React from 'react';
import Autocomplete, { AutocompleteProps } from '../Autocomplete';
import Icon from '../../Icon';
import * as Enzyme from 'enzyme';

const render = (
  props: AutocompleteProps
): Enzyme.ReactWrapper<AutocompleteProps> =>
  Enzyme.mount(<Autocomplete {...props} />);

const renderUnc = (props: AutocompleteProps) =>
  Enzyme.mount<AutocompleteProps>(
    React.createElement(UncontrolledAutocomplete, props)
  );

describe('<Autocomplete />', () => {
  it('renders with given value', () => {
    const onChange = jest.fn();
    const source: any[] = [];
    const wrapper = render({ value: 'hello', onChange, source });
    expect(wrapper.find('Input').prop('value')).toBe('hello');
  });

  it('triggers onChange on input change', () => {
    const onChange = jest.fn();
    const source: any[] = [];
    const wrapper = render({ value: 'hello', onChange, source });
    wrapper.find('input').simulate('change', { target: { value: 'world' } });
    const [event, value] = onChange.mock.calls[0];
    expect(event.target.value).toBe('world');
    expect(value).toBe('world');
  });

  it('resolves sources as arrays', async () => {
    const onChange = jest.fn();
    const source = ['One', 'Two'];
    const wrapper = renderUnc({ source, onChange });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    const menuItems = wrapper.find('MenuItem');
    expect(menuItems).toHaveLength(1);
    expect(menuItems.text()).toBe('Two');
  });

  it('resolves sources as promises', async () => {
    const onChange = jest.fn();
    const source = () => Promise.resolve(['One', 'Two']);
    const wrapper = renderUnc({ source, onChange });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    const menuItems = wrapper.find('MenuItem');

    expect(menuItems).toHaveLength(2);
    expect(menuItems.first().text()).toBe('One');
    expect(menuItems.at(1).text()).toBe('Two');
  });

  it('passes pattern to source', async () => {
    const onChange = jest.fn();
    const source = jest.fn(() => Promise.resolve([]));
    const wrapper = renderUnc({ source, onChange });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    expect(source).toHaveBeenCalledWith('two');
  });

  it('uses renderItem prop to render items', async () => {
    const onChange = jest.fn();
    const source = () => Promise.resolve(['One', 'Two']);
    const wrapper = renderUnc({
      source,
      renderItem: x => x.toUpperCase(),
      onChange
    });
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    const menuItems = wrapper.find('MenuItem');

    expect(menuItems).toHaveLength(2);
    expect(menuItems.first().text()).toBe('ONE');
    expect(menuItems.at(1).text()).toBe('TWO');
  });

  it('passes props to input', async () => {
    const props: Partial<AutocompleteProps> = {
      align: 'center',
      alwaysShowMask: true,
      borderless: true,
      disabled: true,
      error: true,
      id: 'someId',
      leftIcon: <Icon name="Ok" />,
      mask: '***',
      maskChar: 'x',
      maxLength: 3,
      placeholder: 'OOO',
      rightIcon: <Icon name="Ok" />,
      size: 'medium',
      title: 'string',
      type: 'text',
      value: 'hel',
      warning: true,
      width: 300,
      onCopy: () => undefined,
      onCut: () => undefined,
      onInput: () => undefined,
      onKeyPress: () => undefined,
      onKeyUp: () => undefined,
      onPaste: () => undefined,
      onMouseEnter: () => undefined,
      onMouseLeave: () => undefined,
      onMouseOver: () => undefined
    };

    const wrapper = render({ ...props, onChange: () => undefined, source: [] });
    const inputProps = wrapper.find('Input').props();

    Object.keys(props).forEach(prop => {
      expect(inputProps[prop as keyof Enzyme.HTMLAttributes]).toBe(
        props[prop as keyof AutocompleteProps]
      );
    });
  });

  it('handles onKeyDown prop', () => {
    const onChange = () => undefined;
    const onKeyDown = jest.fn();
    const source: any[] = [];
    const wrapper = render({ value: 'hello', onChange, source, onKeyDown });
    wrapper.find('input').simulate('keydown', { key: 'a' });
    const [event] = onKeyDown.mock.calls[0];
    expect(event.key).toBe('a');
  });
});

interface UncontrolledAutocompleteState {
  value: string;
}

class UncontrolledAutocomplete extends React.Component<
  AutocompleteProps,
  UncontrolledAutocompleteState
> {
  public state = {
    value: ''
  };

  public render() {
    return (
      <Autocomplete
        {...this.props}
        value={this.state.value}
        onChange={(_, value) => this.setState({ value })}
      />
    );
  }
}
