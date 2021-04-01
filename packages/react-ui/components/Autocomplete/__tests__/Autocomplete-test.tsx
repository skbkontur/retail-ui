import React from 'react';
import { mount } from 'enzyme';
import OkIcon from '@skbkontur/react-icons/Ok';

import { Autocomplete, AutocompleteProps } from '../Autocomplete';
import { delay } from '../../../lib/utils';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
}
describe('<Autocomplete />', () => {
  it('renders with given value', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source };
    const wrapper = mount<Autocomplete>(<Autocomplete {...props} />);
    expect(wrapper.find('Input').prop('value')).toBe('hello');
  });

  it('triggers onValueChange on input change', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source };
    const wrapper = mount<Autocomplete>(<Autocomplete {...props} />);
    wrapper.find('input').simulate('change', { target: { value: 'world' } });
    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('world');
  });

  it('resolves sources as arrays', async () => {
    const onValueChange = jest.fn();
    const source = ['One', 'Two'];
    const props = { source, onValueChange };
    const wrapper = mount<AutocompleteProps>(<UncontrolledAutocomplete {...props} />);
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    const menuItems = wrapper.find('MenuItem');
    expect(menuItems).toHaveLength(1);
    expect(menuItems.text()).toBe('Two');
  });

  it('resolves sources as promises', async () => {
    const onValueChange = jest.fn();
    const source = () => Promise.resolve(['One', 'Two']);
    const props = { source, onValueChange };
    const wrapper = mount<AutocompleteProps>(<UncontrolledAutocomplete {...props} />);
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
    const onValueChange = jest.fn();
    const source = jest.fn(() => Promise.resolve([]));
    const props = { source, onValueChange };
    const wrapper = mount<AutocompleteProps>(<UncontrolledAutocomplete {...props} />);
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    expect(source).toHaveBeenCalledWith('two');
  });

  it('uses renderItem prop to render items', async () => {
    const onValueChange = jest.fn();
    const source = () => Promise.resolve(['One', 'Two']);
    const props = { source, renderItem: (x: string) => x.toUpperCase(), onValueChange };
    const wrapper = mount<AutocompleteProps>(<UncontrolledAutocomplete {...props} />);
    wrapper.find('input').simulate('change', { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    const menuItems = wrapper.find('MenuItem');

    expect(menuItems).toHaveLength(2);
    expect(menuItems.first().text()).toBe('ONE');
    expect(menuItems.at(1).text()).toBe('TWO');
  });

  it('passes props to input', () => {
    const props = {
      align: 'center' as AutocompleteProps['align'],
      alwaysShowMask: true,
      borderless: true,
      disabled: true,
      error: true,
      id: 'someId',
      leftIcon: <OkIcon />,
      mask: '***',
      maskChar: 'x',
      maxLength: 3,
      placeholder: 'OOO',
      rightIcon: <OkIcon />,
      size: 'medium' as AutocompleteProps['size'],
      title: 'string',
      type: 'text' as AutocompleteProps['type'],
      value: 'hel',
      warning: true,
      width: '100%',
      onCopy: () => undefined,
      onCut: () => undefined,
      onInput: () => undefined,
      onKeyPress: () => undefined,
      onKeyUp: () => undefined,
      onPaste: () => undefined,
      onMouseEnter: () => undefined,
      onMouseLeave: () => undefined,
      onMouseOver: () => undefined,
    };

    const wrapper = mount<Autocomplete>(<Autocomplete {...props} onValueChange={() => undefined} source={[]} />);
    const inputProps = wrapper.find('Input').props();

    expect(inputProps).toMatchObject(props);
  });

  it('handles onKeyDown prop', () => {
    const onValueChange = () => undefined;
    const onKeyDown = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onKeyDown };
    const wrapper = mount<Autocomplete>(<Autocomplete {...props} />);
    wrapper.find('input').simulate('keydown', { key: 'a' });
    const [event] = onKeyDown.mock.calls[0];
    expect(event.key).toBe('a');
  });

  it('handle concurrent source requests', async () => {
    const items = Array.from({ length: 5 }).map((_, i) => String(i + 1));
    const onValueChange = jest.fn();
    const source = jest.fn(async (query: string) => {
      const diff = items.length - Number(query);
      await delay(Math.max(100, diff * 100));
      return items.slice(0, diff);
    });
    const props = { value: '1', onValueChange, source };
    const wrapper = mount<Autocomplete>(<Autocomplete {...props} />);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    items.forEach((_, i) => {
      wrapper.setProps({ value: String(i) });
    });
    await delay(500);
    expect(wrapper.state('items')).toEqual(['1']);
  });

  it(`don't call handleBlur() method when where is no focus`, () => {
    const handleBlur = jest.fn();
    const props = { value: '', source: [], onValueChange: () => '' };
    const wrapper = mount<Autocomplete>(<Autocomplete {...props} />);
    // @ts-ignore
    wrapper.instance().handleBlur = handleBlur;

    clickOutside();

    expect(handleBlur).not.toBeCalled();
  });
});

interface UncontrolledAutocompleteState {
  value: string;
}

class UncontrolledAutocomplete extends React.Component<
  Omit<AutocompleteProps, 'value'>,
  UncontrolledAutocompleteState
> {
  public static defaultProps = Autocomplete.defaultProps;
  public state = {
    value: '',
  };

  public render() {
    return <Autocomplete {...this.props} value={this.state.value} onValueChange={value => this.setState({ value })} />;
  }
}
