import React, { useState } from 'react';
//import { mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import OkIcon from '@skbkontur/react-icons/Ok';
import userEvent from '@testing-library/user-event';

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
    const props = { value: 'Hello', onValueChange, source };
    render(<Autocomplete {...props} />);

    expect(screen.getByRole('textbox')).toHaveValue('Hello');
  });

  it('triggers onValueChange on input change', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source };
    render(<Autocomplete {...props} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'world' } });
    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe('world');
  });

  it('resolves sources as arrays', async () => {
    const onValueChange = jest.fn();
    const source = ['One', 'Two'];
    const props = { source, onValueChange };
    render(<UncontrolledAutocomplete {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'two' } });

    await new Promise((resolve) => setTimeout(resolve));

    const menuItems = screen.getByTestId('MenuItem__root');
    expect(menuItems).toBeInTheDocument();
    expect(menuItems).toHaveTextContent('Two');
  });

  it('resolves sources as promises', async () => {
    const onValueChange = jest.fn();
    const source = () => Promise.resolve(['One', 'Two']);
    const props = { source, onValueChange };
    render(<UncontrolledAutocomplete {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise((resolve) => setTimeout(resolve));

    const menuItems = screen.getAllByTestId('MenuItem__root');

    expect(menuItems).toHaveLength(2);
    expect(menuItems[0]).toHaveTextContent('One');
    expect(menuItems[1]).toHaveTextContent('Two');
  });

  it('passes pattern to source', async () => {
    const onValueChange = jest.fn();
    const source = jest.fn(() => Promise.resolve([]));
    const props = { source, onValueChange };
    render(<UncontrolledAutocomplete {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise((resolve) => setTimeout(resolve));

    expect(source).toHaveBeenCalledWith('two');
  });

  // it('uses renderItem prop to render items', async () => {
  //   const onValueChange = jest.fn();
  //   const source = () => Promise.resolve(['One', 'Two']);
  //   const props = { source, renderItem: (x: string) => x.toUpperCase(), onValueChange };
  //   const wrapper = mount<AutocompleteProps>(<UncontrolledAutocomplete {...props} />);
  //   wrapper.find('input').simulate('change', { target: { value: 'two' } });

  //   // wait for react batch updates
  //   await new Promise((resolve) => setTimeout(resolve));
  //   wrapper.update();

  //   const menuItems = wrapper.find('MenuItem');

  //   expect(menuItems).toHaveLength(2);
  //   expect(menuItems.first().text()).toBe('ONE');
  //   expect(menuItems.at(1).text()).toBe('TWO');
  // });

  // it('passes props to input', () => {
  //   const props = {
  //     align: 'center' as AutocompleteProps['align'],
  //     alwaysShowMask: true,
  //     borderless: true,
  //     disabled: true,
  //     error: true,
  //     id: 'someId',
  //     leftIcon: <OkIcon />,
  //     mask: '***',
  //     maskChar: 'x',
  //     maxLength: 3,
  //     placeholder: 'OOO',
  //     rightIcon: <OkIcon />,
  //     size: 'medium' as AutocompleteProps['size'],
  //     title: 'string',
  //     type: 'text' as AutocompleteProps['type'],
  //     value: 'hel',
  //     warning: true,
  //     width: '100%',
  //     onCopy: () => undefined,
  //     onCut: () => undefined,
  //     onInput: () => undefined,
  //     onKeyPress: () => undefined,
  //     onKeyUp: () => undefined,
  //     onPaste: () => undefined,
  //     onMouseEnter: () => undefined,
  //     onMouseLeave: () => undefined,
  //     onMouseOver: () => undefined,
  //   };

  //   render(<Autocomplete {...props} onValueChange={() => undefined} source={[]} />);
  //   const inputProps = wrapper.find('Input').props();

  //   expect(inputProps).toMatchObject(props);
  // });

  it('handles onKeyDown prop', () => {
    const onValueChange = () => undefined;
    const onKeyDown = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onKeyDown };
    render(<Autocomplete {...props} />);
    userEvent.type(screen.getByRole('textbox'), 'a');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    const [event] = onKeyDown.mock.calls[0];
    expect(event.key).toBe('a');
  });

  // it('handle concurrent source requests', async () => {
  //   const items = Array.from({ length: 5 }).map((_, i) => String(i + 1));
  //   const onValueChange = jest.fn();
  //   const source = jest.fn(async (query: string) => {
  //     const diff = items.length - Number(query);
  //     await delay(Math.max(100, diff * 100));
  //     return items.slice(0, diff);
  //   });
  //   const props = { value: '1', onValueChange, source };
  //   const wrapper = mount<Autocomplete>(<Autocomplete {...props} />);
  //   wrapper.find('input').simulate('change', { target: { value: '' } });
  //   items.forEach((_, i) => {
  //     wrapper.setProps({ value: String(i) });
  //   });
  //   await delay(500);
  //   expect(wrapper.state('items')).toEqual(['1']);
  // });

  it(`don't call handleBlur() method when where is no focus`, () => {
    const handleBlur = jest.fn();
    const props = { value: '', source: [], onValueChange: () => '' };
    render(<Autocomplete {...props} />);

    document.body.click;
    expect(handleBlur).not.toHaveBeenCalled();
  });

  it('should clear the value when an empty string passed', () => {
    const Comp = () => {
      const [value, setValue] = useState('');

      return (
        <>
          <Autocomplete value={value} onValueChange={setValue} />
          <button onClick={() => setValue('')}>Clear</button>
        </>
      );
    };

    render(<Comp />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
  });
});

type UncontrolledAutocompleteProps = Omit<AutocompleteProps, 'value'>;
class UncontrolledAutocomplete extends React.Component<UncontrolledAutocompleteProps> {
  public static defaultProps = Autocomplete.defaultProps;
  public state = {
    value: '',
  };

  public render() {
    return (
      <Autocomplete {...this.props} value={this.state.value} onValueChange={(value) => this.setState({ value })} />
    );
  }
}
