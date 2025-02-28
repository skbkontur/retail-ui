import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import OkIcon from '@skbkontur/react-icons/Ok';
import userEvent from '@testing-library/user-event';
import { mount } from 'enzyme';

import { Input, InputDataTids } from '../../../components/Input';
import { Autocomplete, AutocompleteProps, AutocompleteIds, AutocompleteDataTids } from '../Autocomplete';
import { delay, clickOutside } from '../../../lib/utils';

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

  it('passes placeholder prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, placeholder: 'SomePlaceholder' };

    render(<Autocomplete {...props} />);
    expect(screen.getByPlaceholderText('SomePlaceholder')).toBeInTheDocument();
  });

  it('passes maxLength prop to input and it works', async () => {
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

    await userEvent.type(input, '123456');
    expect(input).toHaveValue('12345');
  });

  it('passes leftIcon prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const leftIcon = <OkIcon data-tid="my-testy-icon" />;
    const props = { value: 'hello', onValueChange, source, leftIcon };
    render(<Autocomplete {...props} />);
    expect(screen.getByTestId('my-testy-icon')).toBeInTheDocument();
  });

  it('passes rightIcon prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const rightIcon = <OkIcon data-tid="my-testy-icon" />;
    const props = { value: 'hello', onValueChange, source, rightIcon };
    render(<Autocomplete {...props} />);
    expect(screen.getByTestId('my-testy-icon')).toBeInTheDocument();
  });

  it('passes showClearIcon prop to input', async () => {
    const ControlledAutocomplete = () => {
      const [value, setValue] = useState<string>('hello');
      return <Input showClearIcon="always" value={value} onValueChange={setValue} />;
    };
    render(<ControlledAutocomplete />);

    const cleanCross = screen.getByTestId(InputDataTids.cleanCross);
    expect(cleanCross).toBeInTheDocument();
    await userEvent.click(cleanCross);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(cleanCross).not.toBeInTheDocument();
  });

  it('passes id prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, id: 'someId' };
    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'someId');
  });

  it('passes disabled prop to input', () => {
    const onValueChange = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, disabled: true };
    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

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

  it('passes onInput prop to input', async () => {
    const onInput = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onInput };
    render(<Autocomplete {...props} />);

    await userEvent.type(screen.getByRole('textbox'), 'a');
    expect(onInput).toHaveBeenCalledTimes(1);
  });

  it('passes onKeyUp prop to input', async () => {
    const onKeyUp = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onKeyUp };
    render(<Autocomplete {...props} />);

    await userEvent.type(screen.getByRole('textbox'), 'a');
    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  it('passes onPaste prop to input', async () => {
    const onPaste = jest.fn();
    const onValueChange = () => undefined;
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onPaste };
    render(<Autocomplete {...props} />);

    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.paste('text');
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

  it('handles onKeyDown prop', async () => {
    const onValueChange = () => undefined;
    const onKeyDown = jest.fn();
    const source: any[] = [];
    const props = { value: 'hello', onValueChange, source, onKeyDown };

    render(<Autocomplete {...props} />);
    await userEvent.type(screen.getByRole('textbox'), 'a');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    const [event] = onKeyDown.mock.calls[0];
    expect(event.key).toBe('a');
  });

  it('should clear the value when an empty string passed', async () => {
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

    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    await userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
  });

  //TODO: Придумать как перевести на RTL
  it('handle concurrent source requests', async () => {
    const items = Array.from({ length: 5 }).map((_, i) => String(i + 1));
    const onValueChange = jest.fn();
    const source = jest.fn(async (query: string) => {
      const diff = items.length - Number(query);
      await delay(Math.max(100, diff * 100));
      return items.slice(0, diff);
    });
    const props = { value: '1', onValueChange, source };
    render(<UncontrolledAutocomplete {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
    items.forEach((_, i) => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: String(i) } });
    });
    await delay(500);
    const menuItems = screen.getByTestId('MenuItem__root');
    expect(menuItems).toBeInTheDocument();
    expect(menuItems).toHaveTextContent('1');
  });

  it('should disable default browser autofill', () => {
    const props = { value: '', source: [], onValueChange: () => '' };
    render(<Autocomplete {...props} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  describe('a11y', () => {
    it('should connect dropdown with input through aria-controls', async () => {
      const Comp = () => {
        const [value, setValue] = useState('');

        return <Autocomplete source={['one', 'oneone', 'oneoneone']} value={value} onValueChange={setValue} />;
      };
      render(<Comp />);

      const input = screen.getByTestId(InputDataTids.root);
      await userEvent.type(input, 'one');

      expect(input).toHaveAttribute('aria-controls', expect.stringContaining(AutocompleteIds.menu));
      await waitFor(() => {
        expect(screen.getByTestId(AutocompleteDataTids.menu)).toHaveAttribute(
          'id',
          expect.stringContaining(AutocompleteIds.menu),
        );
      });
    });
  });

  it('sets value for aria-label attribute', () => {
    const ariaLabel = 'aria-label';
    render(<Autocomplete aria-label={ariaLabel} source={['one']} value={'one'} onValueChange={jest.fn()} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
  });
});

describe('<Autocomplete Enzyme/>', () => {
  //TODO: при имитации RTL ввода с клавиш символов не вызывается onKeyPress
  //если заданное условие для вызова выполнилось, поэтому пока оставили на Enzyme
  it('passes props to input', () => {
    const props = {
      value: 'hello',
      onKeyPress: () => undefined,
    };

    const wrapper = mount<Autocomplete>(<Autocomplete {...props} onValueChange={() => undefined} source={[]} />);
    const inputProps = wrapper.find('Input').props();

    expect(inputProps).toMatchObject(props);
  });

  //TODO: Придумать как перевести на RTL
  it(`don't call handleBlur() method when where is no focus`, () => {
    const handleBlur = jest.fn();
    const props = { value: '', source: [], onValueChange: () => '' };
    const wrapper = mount<Autocomplete>(<Autocomplete {...props} />);

    // @ts-expect-error: Use of private property.
    wrapper.instance().handleBlur = handleBlur;

    clickOutside();

    expect(handleBlur).not.toHaveBeenCalled();
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
