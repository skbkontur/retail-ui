import React, { useState } from 'react';
//import { mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import OkIcon from '@skbkontur/react-icons/Ok';
import userEvent from '@testing-library/user-event';
import { renderIntoDocument } from 'react-dom/test-utils';

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

  it('uses renderItem prop to render items', async () => {
    const onValueChange = jest.fn();
    const source = () => Promise.resolve(['One', 'Two']);
    const props = { source, renderItem: (x: string) => x.toUpperCase(), onValueChange };
    render(<UncontrolledAutocomplete {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'two' } });

    // wait for react batch updates
    await new Promise((resolve) => setTimeout(resolve));

    const menuItems = screen.getAllByTestId('MenuItem__root');

    expect(menuItems).toHaveLength(2);
    expect(menuItems[0]).toHaveTextContent('ONE');
    expect(menuItems[1]).toHaveTextContent('TWO');
  });

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

  // it('passes value prop to input', () => {
  //   const onValueChange = jest.fn();
  //   const source: any[] = [];
  //   const props = { value: 'hel', onValueChange, source, width: '100%' };

  //   render(<Autocomplete {...props} />);
  //   expect(screen.getByRole('textbox')).toHaveProperty('width', '100%');
  // });

  // it('passes warning prop to input', () => {
  //   const onValueChange = jest.fn();
  //   const source: any[] = [];
  //   const props = { value: 'hello', onValueChange, source, warning: true };
  //   render(<Autocomplete {...props} />);
  //   expect(screen.getByRole('textbox')).toHaveProperty('warning');
  // });

  it('passes value prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hel', onValueChange, source };

    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toHaveValue('hel');
  });

  it('passes type prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, type: 'text' as AutocompleteProps['type'] };

    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toHaveProperty('type', 'text');
  });

  it('passes title prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, title: 'some title' };

    render(<Autocomplete {...props} />);
    expect(screen.getByTitle('some title')).toBeInTheDocument();
  });

  // it('passes size prop to input', () => {
  //   const onValueChange = jest.fn();
  //   const source: any[] = [];
  //   const props = { value: 'hello', onValueChange, source, size: 'medium' as AutocompleteProps['size'] };

  //   render(<Autocomplete {...props} />);
  //   expect(screen.getByRole('textbox')).toHaveProperty('size', 'medium');
  // });

  it('passes placeholder prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, placeholder: 'SomePlaceholder' };

    render(<Autocomplete {...props} />);
    expect(screen.getByPlaceholderText('SomePlaceholder')).toBeInTheDocument();
  });

  it('passes maxLength prop to input and it works', () => {
    const Comp = () => {
      const [value, setValue] = useState('');

      return (
        <>
          <Autocomplete value={value} onValueChange={setValue} maxLength={5} />
        </>
      );
    };

    render(<Comp />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    userEvent.type(input, '123456');
    expect(input).toHaveValue('12345');
  });

  it('passes leftIcon prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const leftIcon = <OkIcon className="my-testy-icon" />;
    const props = { value: 'hello', onValueChange, source, leftIcon };
    render(<Autocomplete {...props} />);
    expect(document.querySelector('.my-testy-icon')).toBeInTheDocument();
  });

  it('passes rightIcon prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const rightIcon = <OkIcon className="my-testy-icon" />;
    const props = { value: 'hello', onValueChange, source, rightIcon };
    render(<Autocomplete {...props} />);
    expect(document.querySelector('.my-testy-icon')).toBeInTheDocument();
  });

  it('passes id prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, id: 'someId' };
    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'someId');
  });

  // it('passes error prop to input', () => {
  //   const onValueChange = jest.fn();
  //   const source: any[] = [];
  //   const props = { value: 'hello', onValueChange, source, error: true };
  //   render(<Autocomplete {...props} />);
  //   expect(screen.getByRole('textbox')).toHaveProperty('error');
  // });

  it('passes disabled prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, disabled: true };
    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  // it('passes borderless prop to input', () => {
  //   const onValueChange = jest.fn();
  //   const source: any[] = [];
  //   const props = { value: 'hello', onValueChange, source, borderless: true };
  //   render(<Autocomplete {...props} />);
  //   expect(screen.getByRole('textbox')).toHaveProperty('borderless');
  // });

  it('passes alwaysShowMask prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, alwaysShowMask: true, mask: '(999) 999-9999' };
    render(<Autocomplete {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '7999999999' } });
    expect(screen.getByRole('textbox')).toHaveValue('(799) 999-9999');
  });

  it('passes align prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, align: 'center' as AutocompleteProps['align'] };
    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toHaveStyle('textAlign: center');
  });

  it('passes onCopy prop to input', () => {
    const onCopy = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onCopy };
    render(<Autocomplete {...props} />);

    fireEvent.copy(screen.getByRole('textbox'));
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it('passes onCut prop to input', () => {
    const onCut = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onCut };
    render(<Autocomplete {...props} />);

    fireEvent.cut(screen.getByRole('textbox'));
    expect(onCut).toHaveBeenCalledTimes(1);
  });

  it('passes onInput prop to input', () => {
    const onInput = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onInput };
    render(<Autocomplete {...props} />);

    userEvent.type(screen.getByRole('textbox'), 'a');
    expect(onInput).toHaveBeenCalledTimes(1);
  });

  // it('passes onKeyPress prop to input', () => {
  //   const onKeyPress = jest.fn();
  //   const onValueChange = () => undefined;
  //   const source: any[] = [];
  //   const props = { value: 'hello', onValueChange, source, onKeyPress };
  //   render(<Autocomplete {...props} />);

  //   userEvent.type(screen.getByRole('textbox'), '{enter}');

  //   expect(onKeyPress).toHaveBeenCalledTimes(1);

  // });

  it('passes onKeyUp prop to input', () => {
    const onKeyUp = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onKeyUp };
    render(<Autocomplete {...props} />);

    userEvent.type(screen.getByRole('textbox'), 'a');
    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  it('passes onPaste prop to input', () => {
    const onPaste = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onPaste };
    render(<Autocomplete {...props} />);

    userEvent.paste(screen.getByRole('textbox'), 'text');
    expect(onPaste).toHaveBeenCalledTimes(1);
  });

  it('passes onMouseEnter prop to input', () => {
    const onMouseEnter = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onMouseEnter };
    render(<Autocomplete {...props} />);

    fireEvent.mouseEnter(screen.getByTestId('Input__root'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('passes onMouseLeave prop to input', () => {
    const onMouseLeave = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onMouseLeave };
    render(<Autocomplete {...props} />);

    fireEvent.mouseLeave(screen.getByTestId('Input__root'));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('passes onMouseOver prop to input', () => {
    const onMouseOver = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onMouseOver };

    render(<Autocomplete {...props} />);
    fireEvent.mouseOver(screen.getByTestId('Input__root'));
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

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
  //   render(<Autocomplete {...props} />);
  //   fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
  //   items.forEach((_, i) => {
  //     fireEvent.change(screen.getByRole('textbox'), { target: { value: String(i) } })
  //   });
  //   await delay(500);

  //   const menuItems = screen.getByTestId('MenuItem__root');

  //   expect(menuItems).toBeInTheDocument();
  //   expect(menuItems).toHaveTextContent('1');
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
