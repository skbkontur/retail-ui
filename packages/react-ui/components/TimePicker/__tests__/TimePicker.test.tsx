import { act, createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { InputLikeText } from '../../../internal/InputLikeText/index.js';
import { LangCodes, LocaleContext } from '../../../lib/locale/index.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import { MenuFooter } from '../../MenuFooter/index.js';
import { MenuHeader } from '../../MenuHeader/index.js';
import { MenuItem, MenuItemDataTids } from '../../MenuItem/index.js';
import { MenuSeparator } from '../../MenuSeparator/index.js';
import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR, TimePickerDataTids } from '../helpers/TimePicker.constants.js';
import type { TimeItem, TimePickerExtendedItem } from '../helpers/TimePicker.shared.js';
import type { TimePickerProps, TimePickerRef } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';

const ControlledTimePicker = (props: Omit<TimePickerProps<TimeItem>, 'value' | 'onValueChange'>) => {
  const [value, setValue] = React.useState('');

  return <TimePicker {...props} value={value} onValueChange={setValue} />;
};

const testItems = [
  { value: '09:00' },
  { value: '10:00' },
  { value: '11:00' },
  { value: '12:00' },
  { value: '13:00' },
  { value: '14:00' },
  { value: '15:00' },
  { value: '16:00' },
  { value: '17:00' },
  { value: '18:00' },
];

const getSelectionText = () => window.getSelection()?.toString() ?? '';

describe('<TimePicker />', () => {
  describe('validate', () => {
    it('validates complete value in default HH:mm format', () => {
      expect(TimePicker.validate('00:00')).toBe(true);
      expect(TimePicker.validate('23:59')).toBe(true);
      expect(TimePicker.validate('9:30')).toBe(false);
      expect(TimePicker.validate('25:88')).toBe(false);
      expect(TimePicker.validate('12')).toBe(false);
      expect(TimePicker.validate('')).toBe(false);
    });

    it('validates complete value in HH:mm:ss format', () => {
      expect(TimePicker.validate('09:30:45', { format: 'HH:mm:ss' })).toBe(true);
      expect(TimePicker.validate('09:30', { format: 'HH:mm:ss' })).toBe(false);
      expect(TimePicker.validate('09:30:99', { format: 'HH:mm:ss' })).toBe(false);
    });

    it('validates empty value', () => {
      expect(TimePicker.validate(null)).toBe(false);
      expect(TimePicker.validate(undefined)).toBe(false);
    });

    it('validates value against range', () => {
      expect(TimePicker.validate('09:00', { minTime: '09:00', maxTime: '18:00' })).toBe(true);
      expect(TimePicker.validate('18:00', { minTime: '09:00', maxTime: '18:00' })).toBe(true);
      expect(TimePicker.validate('08:59', { minTime: '09:00', maxTime: '18:00' })).toBe(false);
      expect(TimePicker.validate('18:01', { minTime: '09:00', maxTime: '18:00' })).toBe(false);
    });

    it('supports cross-midnight range', () => {
      expect(TimePicker.validate('20:00', { minTime: '18:00', maxTime: '09:00' })).toBe(true);
      expect(TimePicker.validate('07:30', { minTime: '18:00', maxTime: '09:00' })).toBe(true);
      expect(TimePicker.validate('10:00', { minTime: '18:00', maxTime: '09:00' })).toBe(false);
    });

    it('normalizes minTime and maxTime to the requested format before comparing', () => {
      expect(
        TimePicker.validate('14:00:30', {
          format: 'HH:mm:ss',
          minTime: '09:00',
          maxTime: '18:00',
        }),
      ).toBe(true);

      expect(
        TimePicker.validate('14:00:30', {
          format: 'HH:mm:ss',
          minTime: '09:00',
          maxTime: '14:00',
        }),
      ).toBe(false);
    });
  });

  it('focuses on mount when autoFocus is set', async () => {
    render(<TimePicker autoFocus />);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });

  it('uses russian aria-placeholder by default', () => {
    render(<TimePicker />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-placeholder', 'чч:мм');
  });

  it('uses english aria-placeholder from LocaleContext', () => {
    render(
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <TimePicker format={'HH:mm:ss'} />
      </LocaleContext.Provider>,
    );

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-placeholder', 'hh:mm:ss');
  });

  it('supports custom TimePicker locale override', () => {
    render(
      <LocaleContext.Provider
        value={{
          locale: {
            TimePicker: {
              ariaPlaceholderHHMM: 'hours:minutes',
            },
          },
        }}
      >
        <TimePicker />
      </LocaleContext.Provider>,
    );

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-placeholder', 'hours:minutes');
  });

  it('selects hours on focus', async () => {
    render(<TimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(input).toHaveTextContent(
      `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );

    await waitFor(() => {
      expect(getSelectionText()).toBe(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('selects clicked filled segment on mouse click', async () => {
    render(<TimePicker value={'12:34'} />);

    const input = screen.getByRole('textbox');
    const minutes = screen.getByText('34');

    fireEvent.mouseDown(minutes);
    fireEvent.focus(input);

    fireEvent.mouseUp(minutes);

    await waitFor(() => {
      expect(getSelectionText()).toBe('34');
    });
  });

  it('turns one hour digit into 09 and moves selection to minutes', async () => {
    const onInputValueChange = vi.fn();
    render(<TimePicker onInputValueChange={onInputValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '9' });

    expect(onInputValueChange).toHaveBeenLastCalledWith('09');
    expect(input).toHaveTextContent(`09${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);

    await waitFor(() => {
      expect(getSelectionText()).toBe(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('keeps hours selected after first digit 1 and emits partial raw value', async () => {
    const onInputValueChange = vi.fn();
    render(<TimePicker onInputValueChange={onInputValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });

    expect(onInputValueChange).toHaveBeenLastCalledWith('01');
    expect(input).toHaveTextContent(
      `1${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );

    await waitFor(() => {
      expect(getSelectionText()).toBe(`1${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('keeps minutes pending after first digit 6', async () => {
    render(<ControlledTimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });
    fireEvent.keyDown(input, { key: '6' });

    expect(input).toHaveTextContent(
      `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}6${TIME_PLACEHOLDER_CHAR}`,
    );

    await waitFor(() => {
      expect(getSelectionText()).toBe(`6${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('blinks and keeps hours pending for invalid second digit after 2', async () => {
    const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);

    try {
      render(<TimePicker />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '5' });

      expect(input).toHaveTextContent(
        `2${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
      );
      expect(blinkSpy).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(getSelectionText()).toBe(`2${TIME_PLACEHOLDER_CHAR}`);
      });
    } finally {
      blinkSpy.mockRestore();
    }
  });

  it('blinks and keeps minutes pending for invalid second digit after 6', async () => {
    const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);

    try {
      render(<ControlledTimePicker />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Tab' });
      fireEvent.keyDown(input, { key: '6' });
      fireEvent.keyDown(input, { key: '5' });

      expect(input).toHaveTextContent(
        `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}6${TIME_PLACEHOLDER_CHAR}`,
      );
      expect(blinkSpy).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(getSelectionText()).toBe(`6${TIME_PLACEHOLDER_CHAR}`);
      });
    } finally {
      blinkSpy.mockRestore();
    }
  });

  it('normalizes pending minutes on blur', async () => {
    render(<ControlledTimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });
    fireEvent.keyDown(input, { key: '6' });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveTextContent('00:06');
    });
  });

  it('blinks on unsupported non-digit key input', () => {
    const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);

    try {
      const onValueChange = vi.fn();

      render(<TimePicker onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'a' });

      expect(input).toHaveTextContent(
        `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
      );
      expect(onValueChange).not.toHaveBeenCalled();
      expect(blinkSpy).toHaveBeenCalledTimes(1);
    } finally {
      blinkSpy.mockRestore();
    }
  });

  it('supports blink through public ref', () => {
    const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);

    try {
      const ref = React.createRef<TimePickerRef>();

      render(<TimePicker ref={ref} />);

      ref.current?.blink();

      expect(blinkSpy).toHaveBeenCalledTimes(1);
    } finally {
      blinkSpy.mockRestore();
    }
  });

  it('keeps empty value empty on blur', async () => {
    const onValueChange = vi.fn();
    render(<TimePicker onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).not.toHaveTextContent(TIME_SEPARATOR);
    });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('does not call onValueChange on blur when value stays unchanged', () => {
    const onValueChange = vi.fn();
    render(<TimePicker value={'12:34'} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('shows normalized value right after paste', () => {
    render(<TimePicker />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '88:88',
      },
    });

    expect(input).toHaveTextContent('23:59');
  });

  it('does not apply min and max range to pasted value', () => {
    const onInputValueChange = vi.fn();

    render(<TimePicker minTime={'09:00'} maxTime={'18:00'} onInputValueChange={onInputValueChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '25:88',
      },
    });

    expect(input).toHaveTextContent('23:59');
    expect(onInputValueChange).toHaveBeenLastCalledWith('23:59');
  });

  it('opens dropdown on focus and arrow down highlights first item', async () => {
    render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const items = screen.getAllByTestId(TimePickerDataTids.item);
    expect(items[0].closest('[data-visual-state-hover]')).not.toBeNull();

    await waitFor(() => {
      expect(getSelectionText()).toBe(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('starts arrow down navigation from the selected item', () => {
    render(<TimePicker source={testItems} value={'12:00'} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const items = screen.getAllByTestId(TimePickerDataTids.item);
    expect(items[4].closest('[data-visual-state-hover]')).not.toBeNull();
  });

  it('highlights the first filtered item and selects it on Enter', async () => {
    const onValueChange = vi.fn();
    render(<TimePicker source={testItems} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });

    const firstFilteredItem = screen.getAllByTestId(TimePickerDataTids.item)[0];

    await waitFor(() => {
      expect(firstFilteredItem.closest('[data-visual-state-hover]')).not.toBeNull();
      expect(input).toHaveAttribute('aria-activedescendant', firstFilteredItem.closest('[role="option"]')?.id);
    });

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onValueChange).toHaveBeenCalledWith('10:00');
    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });

  it('preserves manual item highlight when array source rerenders with the same filter query', async () => {
    const { rerender } = render(<TimePicker source={[...testItems]} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });

    await waitFor(() => {
      expect(screen.getByText('10:00').closest('[data-visual-state-hover]')).not.toBeNull();
    });

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByText('11:00').closest('[data-visual-state-hover]')).not.toBeNull();

    rerender(<TimePicker source={[...testItems]} />);

    expect(screen.getByText('11:00').closest('[data-visual-state-hover]')).not.toBeNull();
    expect(screen.getByText('10:00').closest('[data-visual-state-hover]')).toBeNull();

    fireEvent.keyDown(input, { key: '0' });

    await waitFor(() => {
      expect(screen.getByText('10:00').closest('[data-visual-state-hover]')).not.toBeNull();
    });
  });

  it('closes the dropdown on Enter when the filter has no matching items', () => {
    const { rerender } = render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '2' });
    fireEvent.keyDown(input, { key: '2' });

    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input).toHaveTextContent('22:00');

    rerender(<TimePicker source={[{ value: '22:00' }]} />);

    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });

  it('closes dropdown when becomes disabled', async () => {
    const { rerender } = render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();

    rerender(<TimePicker source={testItems} disabled />);

    await waitFor(() => {
      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    });
  });

  it('commits the pending value when the control becomes disabled', async () => {
    const onValueChange = vi.fn();
    const { rerender } = render(<TimePicker source={testItems} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '1' });

    rerender(<TimePicker disabled source={testItems} onValueChange={onValueChange} />);

    await waitFor(() => {
      expect(input).toHaveTextContent('11:00');
    });
    expect(onValueChange).toHaveBeenCalledWith('11:00');
    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });

  it('allows arrow keys to go beyond min and max range', () => {
    const onInputValueChange = vi.fn();

    render(<TimePicker value={'18:00'} minTime={'09:00'} maxTime={'18:00'} onInputValueChange={onInputValueChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveTextContent('19:00');
    expect(onInputValueChange).toHaveBeenLastCalledWith('19:00');
  });

  it('changes segment on arrow keys when items are empty', () => {
    render(<TimePicker source={[]} value={'09:00'} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveTextContent('10:00');
  });

  it('changes segment on arrow keys when all items are disabled', () => {
    const onValueChange = vi.fn();

    render(
      <TimePicker
        value={'10:00'}
        minTime={'09:00'}
        maxTime={'18:00'}
        onValueChange={onValueChange}
        source={[{ value: '07:00' }, { value: '19:00' }]}
      />,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveTextContent('11:00');
  });

  it('disables items outside range and does not allow selecting them', async () => {
    const onValueChange = vi.fn();

    render(
      <TimePicker
        minTime={'09:00'}
        maxTime={'18:00'}
        onValueChange={onValueChange}
        source={[{ value: '07:00' }, { value: '09:00' }, { value: '19:00' }]}
      />,
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);

    const disabledBeforeMinItem = screen.getByText('07:00').closest('button');
    const enabledItem = screen.getByText('09:00').closest('button');
    const disabledAfterMaxItem = screen.getByText('19:00').closest('button');

    expect(disabledBeforeMinItem).toBeNull();
    expect(enabledItem).not.toBeDisabled();
    expect(disabledAfterMaxItem).toBeNull();

    fireEvent.click(screen.getByText('07:00'));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();

    await waitFor(() => {
      expect(input).toHaveFocus();
    });

    fireEvent.click(enabledItem as HTMLButtonElement);

    expect(onValueChange).toHaveBeenCalledWith('09:00');
  });

  it('selects item by click and keeps input focused', async () => {
    render(<ControlledTimePicker source={testItems} />);

    const controlledInput = screen.getByRole('textbox');
    fireEvent.focus(controlledInput);

    fireEvent.click(screen.getByText('09:00'));

    await waitFor(() => {
      expect(controlledInput).toHaveTextContent('09:00');
      expect(controlledInput).toHaveFocus();
    });
  });

  it('calls onValueChange when selecting item by click', () => {
    const onValueChange = vi.fn();
    render(<TimePicker source={testItems} value={''} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.click(screen.getByText('09:00'));

    expect(onValueChange).toHaveBeenCalledWith('09:00');
  });

  it('keeps dropdown opened after completing the last segment with keyboard in dropdown mode', async () => {
    render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '2' });
    fireEvent.keyDown(input, { key: '0' });
    fireEvent.keyDown(input, { key: '0' });

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();

    await waitFor(() => {
      expect(input).toHaveFocus();
      expect(getSelectionText()).toBe('00');
    });
  });

  it('moves selection to next segment on Tab and prevents default', () => {
    render(<ControlledTimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const tabEvent = createEvent.keyDown(input, { key: 'Tab' });
    fireEvent(input, tabEvent);
    fireEvent.keyDown(input, { key: '5' });

    expect(tabEvent.defaultPrevented).toBe(true);
    expect(input).toHaveTextContent(
      `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}5${TIME_PLACEHOLDER_CHAR}`,
    );
  });

  it('commits hours on Tab without filling untouched trailing segments in onInputValueChange', () => {
    const onInputValueChange = vi.fn();

    const Controlled = () => {
      const [value, setValue] = React.useState('');

      const handleInputValueChange = React.useCallback((nextValue: string) => {
        onInputValueChange(nextValue);
        setValue(nextValue);
      }, []);

      return <TimePicker value={value} onInputValueChange={handleInputValueChange} />;
    };

    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });

    expect(onInputValueChange).toHaveBeenLastCalledWith('01');

    const tabEvent = createEvent.keyDown(input, { key: 'Tab' });
    fireEvent(input, tabEvent);

    expect(tabEvent.defaultPrevented).toBe(true);
    expect(onInputValueChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveTextContent(`01${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);

    fireEvent.keyDown(input, { key: '3' });

    expect(onInputValueChange).toHaveBeenLastCalledWith('01:03');
    expect(input).toHaveTextContent(`01${TIME_SEPARATOR}3${TIME_PLACEHOLDER_CHAR}`);
  });

  it('moves selection to previous segment on Shift+Tab and prevents default', () => {
    render(<ControlledTimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });

    const shiftTabEvent = createEvent.keyDown(input, { key: 'Tab', shiftKey: true });
    fireEvent(input, shiftTabEvent);
    fireEvent.keyDown(input, { key: '5' });

    expect(shiftTabEvent.defaultPrevented).toBe(true);
    expect(input).toHaveTextContent(`05${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
  });

  it('does not prevent default on Tab from the last segment', () => {
    render(<ControlledTimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });
    fireEvent.keyDown(input, { key: '5' });

    const tabEvent = createEvent.keyDown(input, { key: 'Tab' });
    fireEvent(input, tabEvent);

    expect(tabEvent.defaultPrevented).toBe(false);
  });

  it('does not prevent default on Shift+Tab from the first segment', () => {
    render(<TimePicker value={'12:34'} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const shiftTabEvent = createEvent.keyDown(input, { key: 'Tab', shiftKey: true });
    fireEvent(input, shiftTabEvent);

    expect(shiftTabEvent.defaultPrevented).toBe(false);
  });

  it('opens dropdown by default right icon click', () => {
    const { container } = render(<TimePicker source={testItems} />);

    const icon = container.querySelector('svg');

    expect(icon).not.toBeNull();

    fireEvent.click(icon as SVGElement);

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
  });

  it('does not render the default right icon when rightIcon is null', () => {
    const { container } = render(<TimePicker rightIcon={null} value={'12:34'} />);

    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders custom right icon and suffix', () => {
    const { container } = render(
      <TimePicker value={'12:34'} rightIcon={<span data-tid={'custom-right-icon'}>★</span>} suffix={'МСК'} />,
    );

    expect(screen.getByTestId('custom-right-icon')).toBeInTheDocument();
    expect(screen.getByText('МСК')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('adds gap between value and suffix', () => {
    render(<TimePicker value={'12:34'} rightIcon={null} suffix={'МСК'} />);

    expect(screen.getByText('МСК')).toHaveStyle({ marginLeft: '4px' });
  });

  it('keeps gap between suffix and right icon', () => {
    render(<TimePicker value={'12:34'} rightIcon={<span data-tid={'custom-right-icon'}>★</span>} suffix={'МСК'} />);

    expect(screen.getByText('МСК')).toHaveStyle({ marginLeft: '4px' });
    expect(screen.getByTestId('custom-right-icon').parentElement).toHaveStyle({ marginLeft: '4px' });
  });

  it('takes content width by default and keeps baseline min-width with default icon', () => {
    render(<TimePicker value={'12:34'} />);

    expect(screen.getByRole('textbox')).toHaveStyle({ width: 'auto', minWidth: '78px' });
  });

  it('takes content width by default and keeps baseline min-width without icon', () => {
    render(<TimePicker value={'12:34'} rightIcon={null} suffix={'МСК'} />);

    expect(screen.getByRole('textbox')).toHaveStyle({ width: 'auto', minWidth: '58px' });
  });

  it('keeps baseline min-width for empty value without icon', () => {
    render(<TimePicker rightIcon={null} value={''} />);

    expect(screen.getByRole('textbox')).toHaveStyle({ width: 'auto', minWidth: '58px' });
  });

  it('preserves explicit width prop', () => {
    render(<TimePicker value={'12:34'} width={240} />);

    expect(screen.getByRole('textbox')).toHaveStyle({ width: '240px' });
  });

  it('opens dropdown by custom right icon click', () => {
    render(<TimePicker source={testItems} rightIcon={<span data-tid={'custom-right-icon'}>★</span>} />);

    fireEvent.click(screen.getByTestId('custom-right-icon'));

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
  });

  it('supports close through public ref', async () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();

    act(() => {
      ref.current?.close();
    });

    await waitFor(() => {
      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    });
  });

  it('supports open through public ref', () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} source={testItems} />);

    act(() => {
      ref.current?.open();
    });

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
  });

  it('focuses the field on open through public ref so the dropdown can be closed', () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} source={testItems} />);

    act(() => {
      ref.current?.open();
    });

    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();

    fireEvent.blur(input);

    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });

  it('focuses the field through public ref and opens the dropdown', () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} source={testItems} />);

    act(() => {
      ref.current?.focus();
    });

    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
  });

  it('does not focus or open a disabled control through public ref', () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} disabled source={testItems} />);

    act(() => {
      ref.current?.focus();
      ref.current?.open();
    });

    expect(screen.getByRole('textbox')).not.toHaveFocus();
    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });

  it('focuses the field through public ref without opening the dropdown', () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} source={testItems} />);

    act(() => {
      ref.current?.focus({ withoutOpenDropdown: true });
    });

    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });

  it('opens the dropdown on the click that follows focus without dropdown', () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} source={testItems} />);

    act(() => {
      ref.current?.focus({ withoutOpenDropdown: true });
    });

    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
  });

  it('props aria-describedby applied correctly', () => {
    render(
      <div>
        <TimePicker aria-describedby={'timepicker-description'} />
        <p id={'timepicker-description'}>Description</p>
      </div>,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('aria-describedby', 'timepicker-description');
    expect(input).toHaveAccessibleDescription('Description');
  });

  it('passes correct value to `aria-label` attribute', () => {
    const label = 'Select time';

    render(<TimePicker aria-label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('has `aria-haspopup` when source is passed', () => {
    const { rerender } = render(<TimePicker />);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-haspopup');

    rerender(<TimePicker source={testItems} />);
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('sets `aria-expanded` when dropdown is opened and removes when closed', async () => {
    render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-expanded');

    fireEvent.focus(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');

    fireEvent.blur(input);
    await waitFor(() => {
      expect(input).not.toHaveAttribute('aria-expanded');
    });
  });

  it('sets `aria-controls` to popup id when dropdown is open', () => {
    render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-controls');

    fireEvent.focus(input);

    const listbox = screen.getByRole('listbox');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
    expect(listbox.id).not.toBe('');
  });

  it('removes `aria-expanded` and `aria-controls` when filtering hides all items', () => {
    render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls');

    fireEvent.keyDown(input, { key: '2' });
    fireEvent.keyDown(input, { key: '2' });

    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute('aria-expanded');
    expect(input).not.toHaveAttribute('aria-controls');
  });

  it('sets `aria-activedescendant` to highlighted item when navigating with arrow keys', () => {
    render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(input).not.toHaveAttribute('aria-activedescendant');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const options = screen.getAllByRole('option');
    expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
    expect(options[0].id).not.toBe('');
  });

  it('marks the dropdown as a listbox with options', () => {
    render(<TimePicker source={testItems} value={'10:00'} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const listbox = screen.getByRole('listbox');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
    expect(screen.getAllByRole('option')).toHaveLength(testItems.length);
    expect(screen.getByRole('option', { selected: true })).toHaveTextContent('10:00');
  });

  it('clears stale highlight when the items list shrinks below the highlighted index', () => {
    const { rerender } = render(<TimePicker source={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-activedescendant');

    rerender(<TimePicker source={testItems.slice(0, 2)} />);

    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('calls forwarded input event handlers', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const onPaste = vi.fn();

    render(<TimePicker onFocus={onFocus} onBlur={onBlur} onClick={onClick} onKeyDown={onKeyDown} onPaste={onPaste} />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.click(input);
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.paste(input, {
      clipboardData: {
        getData: () => {
          '12:34';
        },
      },
    });
    fireEvent.blur(input);

    expect(onFocus).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
    expect(onPaste).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  it('selects only input content on Ctrl + A', async () => {
    render(
      <>
        <span>before</span>
        <TimePicker value={'12:34'} />
        <span>after</span>
      </>,
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });

    await waitFor(() => {
      expect(getSelectionText()).toBe('12:34');
    });
  });

  it('starts typing from hours after Ctrl + A', async () => {
    const ControlledTimePickerWithValue = () => {
      const [value, setValue] = React.useState('12:34');

      return <TimePicker value={value} onValueChange={setValue} />;
    };

    render(<ControlledTimePickerWithValue />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });
    fireEvent.keyDown(input, { key: '1' });

    expect(input).toHaveTextContent(
      `1${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );

    await waitFor(() => {
      expect(getSelectionText()).toBe(`1${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('restarts input from hours after Ctrl + A even if minutes were selected before', async () => {
    const ControlledTimePickerWithValue = () => {
      const [value, setValue] = React.useState('12:34');

      return <TimePicker value={value} onValueChange={setValue} />;
    };

    render(<ControlledTimePickerWithValue />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });

    await waitFor(() => {
      expect(getSelectionText()).toBe('34');
    });

    fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });
    fireEvent.keyDown(input, { key: '1' });

    expect(input).toHaveTextContent(
      `1${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );

    await waitFor(() => {
      expect(getSelectionText()).toBe(`1${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('clears all value on Delete after Ctrl + A', async () => {
    const ControlledTimePickerWithValue = () => {
      const [value, setValue] = React.useState('12:34');

      return <TimePicker value={value} onValueChange={setValue} />;
    };

    render(<ControlledTimePickerWithValue />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });
    fireEvent.keyDown(input, { key: 'Delete' });

    expect(input).toHaveTextContent(
      `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );

    await waitFor(() => {
      expect(getSelectionText()).toBe(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('clears all value on Backspace after Ctrl + A', async () => {
    const ControlledTimePickerWithValue = () => {
      const [value, setValue] = React.useState('12:34');

      return <TimePicker value={value} onValueChange={setValue} />;
    };

    render(<ControlledTimePickerWithValue />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(input).toHaveTextContent(
      `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
    );

    await waitFor(() => {
      expect(getSelectionText()).toBe(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('emits partial value while typing and committed value on blur', async () => {
    const callbackOrder: string[] = [];
    const onValueChange = vi.fn();
    const onInputValueChange = vi.fn();
    const onBlur = vi.fn(() => callbackOrder.push('onBlur'));
    const Controlled = () => {
      const [value, setValue] = React.useState('');
      const handleChange = React.useCallback((time: string) => {
        callbackOrder.push('onValueChange');
        onValueChange(time);
        setValue(time);
      }, []);
      const handleInputValueChange = React.useCallback((v: string) => {
        callbackOrder.push('onInputValueChange');
        onInputValueChange(v);
      }, []);
      return (
        <TimePicker
          value={value}
          onBlur={onBlur}
          onValueChange={handleChange}
          onInputValueChange={handleInputValueChange}
        />
      );
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '9' });
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onInputValueChange).toHaveBeenCalledTimes(1);
    expect(onInputValueChange).toHaveBeenLastCalledWith('09');

    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveTextContent('09:00');
    });
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith('09:00');
    expect(onInputValueChange).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(callbackOrder).toEqual(['onInputValueChange', 'onValueChange', 'onBlur']);
  });

  it('applies common props to the root node only', () => {
    const { container } = render(
      <TimePicker className={'custom-class'} style={{ opacity: 0.5 }} data-custom={'value'} value={'12:30'} />,
    );

    const root = screen.getByTestId(TimePickerDataTids.root);

    expect(container.querySelectorAll('.custom-class')).toHaveLength(1);
    expect(container.querySelectorAll('[data-custom="value"]')).toHaveLength(1);
    expect(root).toHaveClass('custom-class');
    expect(root).toHaveStyle({ opacity: '0.5' });
    // Поле ввода — фокусируемый элемент, и повторно примененные стили ломали бы его вид.
    expect(screen.getByTestId(TimePickerDataTids.input)).not.toHaveClass('custom-class');
  });

  it('passes the remaining props to the input', () => {
    render(<TimePicker id={'time-field'} aria-label={'Время'} value={'12:30'} />);

    const input = screen.getByTestId(TimePickerDataTids.input);

    expect(input).toHaveAttribute('id', 'time-field');
    expect(input).toHaveAttribute('aria-label', 'Время');
  });

  it('gives the committed value to the onBlur handler', async () => {
    const blurValues: Array<string | null> = [];
    const Controlled = () => {
      const [value, setValue] = React.useState('');

      return <TimePicker value={value} onValueChange={setValue} onBlur={() => blurValues.push(value)} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '0' });
    fireEvent.keyDown(input, { key: '3' });
    fireEvent.keyDown(input, { key: '0' });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(blurValues).toEqual(['10:30']);
    });
  });

  it('calls onBlur even when the value change removes the field', async () => {
    const onBlur = vi.fn();
    const Consumer = () => {
      const [isShown, setIsShown] = React.useState(true);

      return isShown ? <TimePicker value={''} onValueChange={() => setIsShown(false)} onBlur={onBlur} /> : null;
    };
    render(<Consumer />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '0' });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onValueChange when selecting the item with the current value', () => {
    const onValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('09:00');
      const handleChange = React.useCallback((time: string) => {
        onValueChange(time);
        setValue(time);
      }, []);
      return <TimePicker source={testItems} value={value} onValueChange={handleChange} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.click(screen.getByText('09:00'));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('09:00');
  });

  it('calls onValueChange once when selecting different value item', () => {
    const onValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('10:00');
      const handleChange = React.useCallback((time: string) => {
        onValueChange(time);
        setValue(time);
      }, []);
      return <TimePicker source={testItems} value={value} onValueChange={handleChange} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.click(screen.getByText('09:00'));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('09:00');
  });

  it('calls onValueChange again when the controlled parent rejects the same item after refocus', () => {
    const onValueChange = vi.fn();
    render(<TimePicker source={testItems} value={'10:00'} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.click(screen.getByText('09:00'));
    fireEvent.blur(input);
    fireEvent.focus(input);
    fireEvent.click(screen.getByText('09:00'));

    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it('calls onInputValueChange again when the controlled parent rejects the same input after refocus', () => {
    const onInputValueChange = vi.fn();
    render(<TimePicker value={''} onInputValueChange={onInputValueChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '9' });
    fireEvent.blur(input);
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '9' });

    expect(onInputValueChange).toHaveBeenCalledTimes(2);
  });

  it('does not call onValueChange on blur when input value was already reflected in value', async () => {
    const onValueChange = vi.fn();
    const onInputValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('');
      const handleInputValueChange = React.useCallback((v: string) => {
        onInputValueChange(v);
        setValue(v);
      }, []);
      return <TimePicker value={value} onValueChange={onValueChange} onInputValueChange={handleInputValueChange} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });
    fireEvent.keyDown(input, { key: '6' });
    expect(onInputValueChange).toHaveBeenCalledTimes(1);
    expect(onInputValueChange).toHaveBeenLastCalledWith('00:06');

    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveTextContent('00:06');
    });
    expect(onInputValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  describe('filtering', () => {
    it('marks the value as selected in the menu, not the time being typed', async () => {
      const source = vi.fn(() => Promise.resolve(testItems.slice(0, 3)));

      render(<ControlledTimePicker source={source} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(3);
      });

      fireEvent.keyDown(input, { key: '1' });
      fireEvent.keyDown(input, { key: '0' });

      // Набранное время еще не выбрано: пока запрос выполняется, отмеченных элементов быть не должно.
      expect(screen.getAllByRole('option').map((option) => option.getAttribute('aria-selected'))).toEqual(['false']);

      await waitFor(() => {
        expect(source).toHaveBeenLastCalledWith('10');
      });
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');

      fireEvent.click(screen.getByRole('option'));
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByRole('option', { name: /10:00/ })).toHaveAttribute('aria-selected', 'true');
      });
    });

    it('marks the value shown in the field when it was changed with arrows before opening the menu', () => {
      render(<ControlledTimePicker source={testItems.slice(0, 3)} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.click(screen.getByText('10:00'));
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      fireEvent.click(input);

      expect(input).toHaveTextContent('11:00');
      expect(screen.getByRole('option', { name: /11:00/ })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('option', { name: /10:00/ })).toHaveAttribute('aria-selected', 'false');
    });

    it('filters items by typed hours prefix', () => {
      render(<TimePicker source={testItems} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(10);

      fireEvent.keyDown(input, { key: '1' });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(9);

      fireEvent.keyDown(input, { key: '2' });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(1);
      expect(screen.getByText('12:00')).toBeInTheDocument();
    });

    it('filters items by minutes prefix', () => {
      render(<TimePicker source={[{ value: '12:00' }, { value: '12:30' }, { value: '12:35' }, { value: '13:30' }]} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '1' });
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '3' });

      const items = screen.getAllByTestId(TimePickerDataTids.item);
      expect(items).toHaveLength(2);
      expect(screen.getByText('12:30')).toBeInTheDocument();
      expect(screen.getByText('12:35')).toBeInTheDocument();
    });

    it('hides dropdown when no items match the input', () => {
      render(<TimePicker source={testItems} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '2' });

      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    });

    it('hides the dropdown when only menu decorations are left', () => {
      render(
        <TimePicker source={[<MenuHeader key={'header'}>Рабочее время</MenuHeader>, { value: '09:00' }]} value={''} />,
      );

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();

      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '2' });

      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
      expect(input).not.toHaveAttribute('aria-expanded');
    });

    it('shows a source of menu decorations only when nothing is typed', () => {
      render(<TimePicker source={[<MenuHeader key={'header'}>Рабочее время</MenuHeader>]} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('Рабочее время')).toBeInTheDocument();
    });

    it('shows all items again after reopening the dropdown', () => {
      render(<TimePicker source={testItems} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '1' });
      fireEvent.keyDown(input, { key: '2' });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(1);

      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.click(input);

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(10);
    });

    it('reopens the dropdown filtered by the typed digit after Escape', () => {
      render(<TimePicker source={testItems} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();

      fireEvent.keyDown(input, { key: '1' });

      expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
      expect(screen.getAllByTestId(TimePickerDataTids.item).map((item) => item.textContent)).toEqual([
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
      ]);
    });

    it('reopens the dropdown when the value is erased after Escape', () => {
      render(<TimePicker source={testItems} value={'12:00'} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.keyDown(input, { key: 'Backspace' });

      expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
    });

    it('reopens the dropdown on paste after Escape', () => {
      render(<TimePicker source={testItems} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.paste(input, { clipboardData: { getData: () => '12:00' } });

      expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
    });

    it('keeps arrow keys editing the value while the dropdown stays closed', () => {
      render(<TimePicker source={testItems} value={'12:00'} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
      expect(input).toHaveTextContent('13:00');
    });

    it('shows the whole list when the value was edited with arrows while the dropdown was closed', () => {
      render(<TimePicker source={testItems} value={'12:00'} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      fireEvent.click(input);

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(testItems.length);
    });
  });

  describe('source', () => {
    it('filters function source results and calls it with the current query', async () => {
      const source = vi.fn(() => testItems);
      render(<TimePicker source={source} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await waitFor(() => {
        expect(source).toHaveBeenCalledWith('');
        expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(10);
      });

      fireEvent.keyDown(input, { key: '1' });

      await waitFor(() => {
        expect(source).toHaveBeenLastCalledWith('1');
        expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(9);
      });
    });

    it('highlights the first received item and selects it on Enter', async () => {
      const onValueChange = vi.fn();
      const source = () => Promise.resolve(testItems);
      render(<TimePicker source={source} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '1' });

      await waitFor(() => {
        const firstFilteredItem = screen.getAllByTestId(TimePickerDataTids.item)[0];
        expect(firstFilteredItem.closest('[data-visual-state-hover]')).not.toBeNull();
        expect(input).toHaveAttribute('aria-activedescendant', firstFilteredItem.closest('[role="option"]')?.id);
      });

      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onValueChange).toHaveBeenCalledWith('10:00');
      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    });

    it.each([
      ['items are loading', () => new Promise<Array<{ value: string }>>(() => undefined)],
      ['items are empty', (): Array<{ value: string }> => []],
      ['all items are disabled', () => [{ value: '12:00', disabled: true }]],
    ])('calls source after ArrowUp and ArrowDown when %s', async (_caseName, sourceImplementation) => {
      const source = vi.fn(sourceImplementation);
      render(<TimePicker source={source} value={'09:00'} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await waitFor(() => {
        expect(source).toHaveBeenLastCalledWith('');
      });

      fireEvent.keyDown(input, { key: 'ArrowUp' });

      await waitFor(() => {
        expect(source).toHaveBeenLastCalledWith('10:00');
      });

      fireEvent.keyDown(input, { key: 'ArrowDown' });

      await waitFor(() => {
        expect(source).toHaveBeenLastCalledWith('09:00');
      });
    });

    it.each([
      ['Space', ' '],
      ['ArrowRight', 'ArrowRight'],
    ])('calls source after %s normalizes a pending segment', async (_keyName, key) => {
      const source = vi.fn((): Array<{ value: string }> => []);
      render(<TimePicker source={source} value={'1'} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await waitFor(() => {
        expect(source).toHaveBeenLastCalledWith('');
      });

      fireEvent.keyDown(input, { key });

      await waitFor(() => {
        expect(source).toHaveBeenLastCalledWith('01');
      });
    });

    it('shows loading spinner while source is pending', async () => {
      let resolveItems: (items: Array<{ value: string }>) => void = () => undefined;
      const source = () =>
        new Promise<Array<{ value: string }>>((resolve) => {
          resolveItems = resolve;
        });
      render(<TimePicker source={source} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      expect(screen.getByTestId(TimePickerDataTids.loading)).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-busy', 'true');

      await act(async () => {
        resolveItems(testItems.slice(0, 2));
      });

      expect(screen.queryByTestId(TimePickerDataTids.loading)).not.toBeInTheDocument();
      expect(input).not.toHaveAttribute('aria-busy');
      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(2);
    });

    it('shows a retry action when source throws synchronously', async () => {
      const source = () => {
        throw new Error('sync source failure');
      };
      render(<TimePicker source={source} />);

      const input = screen.getByRole('textbox');

      expect(() => fireEvent.focus(input)).not.toThrow();

      await waitFor(() => {
        expect(screen.queryByTestId(TimePickerDataTids.loading)).not.toBeInTheDocument();
      });
      expect(screen.getByTestId(TimePickerDataTids.failed)).toBeInTheDocument();
      expect(
        screen.getByText('Что-то пошло не так. Проверьте соединение с интернетом и попробуйте еще раз'),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Обновить' })).toBeInTheDocument();
      expect(screen.queryByTestId(TimePickerDataTids.item)).not.toBeInTheDocument();
      expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
      expect(input).not.toHaveAttribute('aria-busy');
    });

    it('retries a rejected source and shows received items', async () => {
      let resolveItems: (items: Array<{ value: string }>) => void = () => undefined;
      const source = vi
        .fn<(query: string) => Promise<Array<{ value: string }>>>()
        .mockRejectedValueOnce(new Error('source failure'))
        .mockImplementationOnce(
          () =>
            new Promise((resolve) => {
              resolveItems = resolve;
            }),
        );
      render(<TimePicker source={source} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByTestId(TimePickerDataTids.failed)).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: 'Обновить' }));

      expect(source).toHaveBeenCalledTimes(2);
      expect(source).toHaveBeenLastCalledWith('');
      expect(screen.getByTestId(TimePickerDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(TimePickerDataTids.failed)).not.toBeInTheDocument();

      await act(async () => {
        resolveItems(testItems.slice(0, 2));
      });

      expect(screen.queryByTestId(TimePickerDataTids.loading)).not.toBeInTheDocument();
      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(2);
    });

    it('retries a rejected source on Enter', async () => {
      const source = vi.fn(() => Promise.reject(new Error('source failure')));
      render(<TimePicker source={source} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByTestId(TimePickerDataTids.failed)).toBeInTheDocument();
      });

      fireEvent.keyDown(input, { key: 'Enter' });

      await waitFor(() => {
        expect(source).toHaveBeenCalledTimes(2);
      });
      expect(screen.getByTestId(TimePickerDataTids.failed)).toBeInTheDocument();
      expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
    });

    it('clears fetched items on close and shows the spinner while refetching after reopen', async () => {
      const resolvers: Array<(items: Array<{ value: string }>) => void> = [];
      const source = () =>
        new Promise<Array<{ value: string }>>((resolve) => {
          resolvers.push(resolve);
        });
      render(<TimePicker source={source} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await act(async () => {
        resolvers[0](testItems.slice(0, 2));
      });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(2);

      fireEvent.keyDown(input, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
      });

      fireEvent.click(input);

      expect(screen.getByTestId(TimePickerDataTids.loading)).toBeInTheDocument();
      expect(screen.queryByTestId(TimePickerDataTids.item)).not.toBeInTheDocument();

      await act(async () => {
        resolvers[1](testItems.slice(0, 3));
      });

      expect(screen.queryByTestId(TimePickerDataTids.loading)).not.toBeInTheDocument();
      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(3);
    });

    it('shows the spinner in the input right icon while refetching with a non-empty list', async () => {
      const resolvers: Array<(items: Array<{ value: string }>) => void> = [];
      const source = () =>
        new Promise<Array<{ value: string }>>((resolve) => {
          resolvers.push(resolve);
        });
      render(<TimePicker source={source} rightIcon={<span data-tid={'custom-right-icon'}>★</span>} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await act(async () => {
        resolvers[0](testItems.slice(0, 2));
      });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(2);
      expect(screen.queryByTestId(TimePickerDataTids.inputLoading)).not.toBeInTheDocument();
      expect(screen.getByTestId('custom-right-icon')).toBeInTheDocument();

      fireEvent.keyDown(input, { key: '1' });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(1);
      expect(screen.getByText('10:00')).toBeInTheDocument();
      expect(screen.queryByTestId(TimePickerDataTids.loading)).not.toBeInTheDocument();
      expect(screen.getByTestId(TimePickerDataTids.inputLoading)).toBeInTheDocument();
      expect(screen.queryByTestId('custom-right-icon')).not.toBeInTheDocument();

      await act(async () => {
        resolvers[1](testItems.slice(1, 2));
      });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(1);
      expect(screen.queryByTestId(TimePickerDataTids.inputLoading)).not.toBeInTheDocument();
      expect(screen.getByTestId('custom-right-icon')).toBeInTheDocument();
    });

    it('supports source returning a Promise', async () => {
      const source = (query: string) => Promise.resolve(testItems.filter((item) => item.value.startsWith(query)));
      render(<TimePicker source={source} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(10);
      });

      fireEvent.keyDown(input, { key: '1' });
      fireEvent.keyDown(input, { key: '2' });

      await waitFor(() => {
        expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(1);
        expect(screen.getByText('12:00')).toBeInTheDocument();
      });
    });
  });

  describe('renderItem', () => {
    it('renders items with custom renderItem', () => {
      render(<TimePicker source={testItems.slice(0, 2)} renderItem={(item) => `custom-${item.value}`} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('custom-09:00')).toBeInTheDocument();
      expect(screen.getByText('custom-10:00')).toBeInTheDocument();
    });

    it('passes custom item fields to renderItem', () => {
      const items = [{ value: '09:00', comment: 'утренний слот' }];
      render(<TimePicker source={items} renderItem={(item) => item.comment} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('утренний слот')).toBeInTheDocument();
    });

    describe('state argument', () => {
      const renderWithState = (value: string = '') =>
        render(
          <TimePicker
            source={testItems.slice(0, 3)}
            value={value}
            renderItem={(item, state) => <span data-state={String(state)}>{item.value}</span>}
          />,
        );

      it('passes hover state on mouse over', () => {
        renderWithState();

        fireEvent.focus(screen.getByRole('textbox'));

        expect(screen.getByText('10:00')).toHaveAttribute('data-state', 'null');

        const menuItems = screen.getAllByTestId(MenuItemDataTids.root);
        fireEvent.mouseOver(menuItems[1]);

        expect(screen.getByText('10:00')).toHaveAttribute('data-state', 'hover');
        expect(screen.getByText('09:00')).toHaveAttribute('data-state', 'null');
      });

      it('passes hover state on keyboard navigation', () => {
        renderWithState();

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown' });

        expect(screen.getByText('09:00')).toHaveAttribute('data-state', 'hover');
        expect(screen.getByText('10:00')).toHaveAttribute('data-state', 'null');
      });

      it('passes selected state for the item matching value', () => {
        renderWithState('10:00');

        fireEvent.focus(screen.getByRole('textbox'));

        expect(screen.getByText('10:00')).toHaveAttribute('data-state', 'selected');
        expect(screen.getByText('09:00')).toHaveAttribute('data-state', 'null');
      });
    });
  });

  describe('onUnexpectedInput', () => {
    let blinkSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);
    });

    afterEach(() => {
      blinkSpy.mockRestore();
    });

    it('is called with a pressed char key', () => {
      const onUnexpectedInput = vi.fn();
      render(<TimePicker value={''} onUnexpectedInput={onUnexpectedInput} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'а' });

      expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
      expect(onUnexpectedInput).toHaveBeenCalledWith('а', expect.any(Function));
    });

    it('is called with a digit rejected by the segment', () => {
      const onUnexpectedInput = vi.fn();
      render(<TimePicker value={''} onUnexpectedInput={onUnexpectedInput} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '5' });

      expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
      expect(onUnexpectedInput).toHaveBeenCalledWith('5', expect.any(Function));
      expect(input).toHaveTextContent(`2${TIME_PLACEHOLDER_CHAR}`);
    });

    it('is called with a pasted value that is not a time', () => {
      const onUnexpectedInput = vi.fn();
      render(<TimePicker value={''} onUnexpectedInput={onUnexpectedInput} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.paste(input, { clipboardData: { getData: () => 'обед' } });

      expect(onUnexpectedInput).toHaveBeenCalledTimes(1);
      expect(onUnexpectedInput).toHaveBeenCalledWith('обед', expect.any(Function));
    });

    it('is called with a pasted value that contains digits but is not a time', () => {
      const onUnexpectedInput = vi.fn();
      const onInputValueChange = vi.fn();
      render(<TimePicker value={''} onUnexpectedInput={onUnexpectedInput} onInputValueChange={onInputValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.paste(input, { clipboardData: { getData: () => '2026-08-01' } });

      expect(onUnexpectedInput).toHaveBeenCalledWith('2026-08-01', expect.any(Function));
      expect(onInputValueChange).not.toHaveBeenCalled();
      expect(input).not.toHaveTextContent('20:26');
    });

    it('does not blink on its own when the handler is passed', () => {
      render(<TimePicker value={''} onUnexpectedInput={vi.fn()} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'а' });

      expect(blinkSpy).not.toHaveBeenCalled();
    });

    it('blinks the field from the second argument', () => {
      render(<TimePicker value={''} onUnexpectedInput={(_value, blink) => blink()} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'а' });

      expect(blinkSpy).toHaveBeenCalledTimes(1);
    });

    it('blinks the field without the handler', () => {
      render(<TimePicker value={''} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'а' });
      fireEvent.paste(input, { clipboardData: { getData: () => 'обед' } });

      expect(blinkSpy).toHaveBeenCalledTimes(2);
    });

    it('is not called for a value out of the min and max range', async () => {
      const onUnexpectedInput = vi.fn();
      const onValueChange = vi.fn();
      const Controlled = () => {
        const [value, setValue] = React.useState('');

        return (
          <TimePicker
            minTime={'09:00'}
            maxTime={'18:00'}
            value={value}
            onValueChange={(time) => {
              onValueChange(time);
              setValue(time);
            }}
            onUnexpectedInput={onUnexpectedInput}
          />
        );
      };

      render(<Controlled />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '3' });
      fireEvent.blur(input);

      await waitFor(() => {
        expect(input).toHaveTextContent('23:00');
      });
      expect(onUnexpectedInput).not.toHaveBeenCalled();
      expect(onValueChange).toHaveBeenLastCalledWith('23:00');
    });

    describe('returned value', () => {
      it('commits the returned string', () => {
        const onValueChange = vi.fn();
        render(<TimePicker onValueChange={onValueChange} onUnexpectedInput={() => '13:45'} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.paste(input, { clipboardData: { getData: () => 'обед' } });

        expect(onValueChange).toHaveBeenCalledWith('13:45');
        expect(input).toHaveTextContent('13:45');
      });

      it('commits the returned time even when source items are objects', () => {
        const onValueChange = vi.fn();

        render(
          <TimePicker
            source={[{ value: '09:00', label: 'Утро', slotId: 1 }]}
            value={''}
            onValueChange={onValueChange}
            onUnexpectedInput={() => '13:45'}
          />,
        );

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.paste(input, { clipboardData: { getData: () => 'обед' } });

        expect(onValueChange).toHaveBeenCalledWith('13:45');
      });

      it('clears the value on null', () => {
        const onValueChange = vi.fn();
        render(<TimePicker value={'12:30'} onValueChange={onValueChange} onUnexpectedInput={() => null} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'а' });

        expect(onValueChange).toHaveBeenCalledWith('');
      });

      it('keeps the value on undefined', () => {
        const onValueChange = vi.fn();
        render(<TimePicker value={'12:30'} onValueChange={onValueChange} onUnexpectedInput={() => undefined} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'а' });

        expect(onValueChange).not.toHaveBeenCalled();
        expect(input).toHaveTextContent('12:30');
      });

      it('commits the value returned for a rejected digit', () => {
        const onValueChange = vi.fn();
        render(<TimePicker onValueChange={onValueChange} onUnexpectedInput={() => '23:59'} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: '2' });
        fireEvent.keyDown(input, { key: '5' });

        expect(onValueChange).toHaveBeenCalledWith('23:59');
      });

      it('normalizes the returned value', () => {
        const onValueChange = vi.fn();
        render(<TimePicker onValueChange={onValueChange} onUnexpectedInput={() => '9:5'} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'а' });

        expect(onValueChange).toHaveBeenCalledWith('09:05');
        expect(input).toHaveTextContent('09:05');
      });

      it('does not blink on its own when the handler returns a value', () => {
        render(<TimePicker onUnexpectedInput={() => '13:45'} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'а' });

        expect(blinkSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Enter', () => {
    it('commits value and blinks the field', () => {
      const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);
      const onValueChange = vi.fn();

      try {
        render(<TimePicker value={''} onValueChange={onValueChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: '9' });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(onValueChange).toHaveBeenCalledWith('09:00');
        expect(blinkSpy).toHaveBeenCalledTimes(1);
      } finally {
        blinkSpy.mockRestore();
      }
    });

    it('blinks the empty field', () => {
      const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);
      const onValueChange = vi.fn();

      try {
        render(<TimePicker value={''} onValueChange={onValueChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(onValueChange).not.toHaveBeenCalled();
        expect(blinkSpy).toHaveBeenCalledTimes(1);
      } finally {
        blinkSpy.mockRestore();
      }
    });

    it('does not blink when an item is selected', async () => {
      const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);
      const onValueChange = vi.fn();

      try {
        render(<TimePicker source={['09:00', '10:00']} value={''} onValueChange={onValueChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(onValueChange).toHaveBeenCalledWith('09:00');
        expect(blinkSpy).not.toHaveBeenCalled();
      } finally {
        blinkSpy.mockRestore();
      }
    });

    it('keeps focus in the field', async () => {
      render(<TimePicker value={''} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '9' });
      fireEvent.keyDown(input, { key: 'Enter' });

      await waitFor(() => {
        expect(input).toHaveTextContent('09:00');
      });
      expect(document.activeElement).not.toBe(document.body);
    });
  });

  describe('generic item type', () => {
    type WorkTime = '09:00' | '10:00';
    const workTimeItems: Array<{ value: WorkTime }> = [{ value: '09:00' }, { value: '10:00' }];

    it('keeps value, minTime and maxTime as plain strings with literal item value types', () => {
      render(<TimePicker source={workTimeItems} value={'11:00'} minTime={'09:30'} maxTime={'19:45'} />);

      expect(screen.getByRole('textbox')).toHaveTextContent('11:00');
    });

    it('accepts string handlers for onValueChange and onUnexpectedInput with literal item value types', () => {
      const handleValueChange = (time: string) => time;
      const handleUnexpectedInput = (): string => '09:00';

      render(
        <TimePicker
          source={workTimeItems}
          value={'09:00'}
          onValueChange={handleValueChange}
          onUnexpectedInput={handleUnexpectedInput}
        />,
      );

      expect(screen.getByRole('textbox')).toHaveTextContent('09:00');
    });

    it('accepts a value outside the literal item value types of a function source', () => {
      const handleValueChange = (time: string) => time;

      render(<TimePicker source={() => workTimeItems} value={'12:30'} onValueChange={handleValueChange} />);

      expect(screen.getByRole('textbox')).toHaveTextContent('12:30');
    });

    it('keeps custom item fields available in renderItem through the source generic', () => {
      const items = [{ value: '09:00', comment: 'утренний слот' }];

      render(<TimePicker source={items} value={''} renderItem={(item) => item.comment} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('утренний слот')).toBeInTheDocument();
    });

    it('normalizes the time of an object item before renderItem, keeping its custom fields', () => {
      const items = [{ value: '9:0', comment: 'утренний слот' }];

      render(<TimePicker source={items} value={''} renderItem={(item) => `${item.value} — ${item.comment}`} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('09:00 — утренний слот')).toBeInTheDocument();
    });

    it('cuts the seconds of an object item to the field format before renderItem', () => {
      const items = [{ value: '09:00:30', comment: 'утренний слот' }];

      render(<TimePicker source={items} value={''} renderItem={(item) => item.value} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByTestId(TimePickerDataTids.item)).toHaveTextContent('09:00');
    });

    it('passes the same object to renderItem when its time is already normalized', () => {
      const item = { value: '09:00', comment: 'утренний слот' };
      const received: unknown[] = [];

      render(
        <TimePicker
          source={[item]}
          value={''}
          renderItem={(renderedItem) => {
            received.push(renderedItem);

            return renderedItem.comment;
          }}
        />,
      );

      fireEvent.focus(screen.getByRole('textbox'));

      expect(received[0]).toBe(item);
    });

    it('infers custom item fields in renderItem from a function source', async () => {
      const source = () => Promise.resolve([{ value: '10:00', comment: 'доставка курьером' }]);

      render(<TimePicker source={source} value={''} renderItem={(item) => item.comment} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(await screen.findByText('доставка курьером')).toBeInTheDocument();
    });

    it('supports arbitrary menu elements without treating them as time values', () => {
      interface CustomTimeItem {
        value: string;
        comment: string;
      }

      const onValueChange = vi.fn();
      const onAction = vi.fn();
      const items: Array<TimePickerExtendedItem<CustomTimeItem>> = [
        <MenuHeader key="header">Доступное время</MenuHeader>,
        { value: '09:00', comment: 'утренний слот' },
        <MenuSeparator key="separator" />,
        <MenuItem key="action" onClick={onAction}>
          Настроить интервалы
        </MenuItem>,
        () => <MenuFooter>Время местное</MenuFooter>,
      ];

      render(
        <TimePicker source={items} value={''} onValueChange={onValueChange} renderItem={(item) => item.comment} />,
      );

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      expect(screen.getByText('Доступное время')).toBeInTheDocument();
      expect(screen.getByText('утренний слот')).toBeInTheDocument();
      expect(screen.getByText('Настроить интервалы')).toBeInTheDocument();
      expect(screen.getByText('Время местное')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Настроить интервалы'));

      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onValueChange).not.toHaveBeenCalled();

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onValueChange).toHaveBeenCalledWith('09:00');
    });

    it('reaches a menu item with arrow keys and activates it on Enter', () => {
      const onAction = vi.fn();
      const onValueChange = vi.fn();
      const items: Array<TimePickerExtendedItem<TimeItem>> = [
        <MenuHeader key="header">Доступное время</MenuHeader>,
        { value: '09:00' },
        <MenuItem key="action" onClick={onAction}>
          Настроить интервалы
        </MenuItem>,
      ];

      render(<TimePicker source={items} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      const action = screen.getByText('Настроить интервалы').closest(`[data-tid="${MenuItemDataTids.root}"]`);
      expect(action).toHaveAttribute('data-visual-state-hover');
      expect(input).toHaveAttribute('aria-activedescendant', action?.id);

      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('skips a disabled menu item and menu decorations while navigating', () => {
      const items: Array<TimePickerExtendedItem<TimeItem>> = [
        <MenuHeader key="header">Доступное время</MenuHeader>,
        <MenuSeparator key="separator" />,
        <MenuItem key="disabled" disabled>
          Недоступное действие
        </MenuItem>,
        { value: '09:00' },
        <MenuFooter key="footer">Время местное</MenuFooter>,
      ];

      render(<TimePicker source={items} value={''} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      const timeOption = screen.getByTestId(TimePickerDataTids.item).closest('[role="option"]');
      const disabledOption = screen.getByText('Недоступное действие').closest('[role="option"]');

      expect(timeOption).toHaveTextContent('09:00');
      expect(input).toHaveAttribute('aria-activedescendant', timeOption?.id);
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });

    it('marks a disabled time option with aria-disabled', () => {
      render(<TimePicker source={[{ value: '09:00' }, { value: '10:00', disabled: true }]} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      const [enabled, disabled] = screen.getAllByRole('option');
      expect(enabled).not.toHaveAttribute('aria-disabled');
      expect(disabled).toHaveAttribute('aria-disabled', 'true');
    });

    it('keeps id and role set by the consumer on a custom menu item', () => {
      render(
        <TimePicker
          source={[
            { value: '09:00' },
            <MenuItem key={'custom'} id={'my-own-id'} role={'presentation'}>
              Действие
            </MenuItem>,
          ]}
          value={''}
        />,
      );

      fireEvent.focus(screen.getByRole('textbox'));

      const custom = screen.getByText('Действие').closest(`[data-tid="${MenuItemDataTids.root}"]`);
      expect(custom).toHaveAttribute('id', 'my-own-id');
      expect(custom).toHaveAttribute('role', 'presentation');
    });

    it('keeps the highlight when a typed digit is rejected', () => {
      const onValueChange = vi.fn();
      render(<TimePicker source={['22:00', '23:00', '22:30']} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '5' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onValueChange).toHaveBeenCalledWith('22:00');
    });

    it('marks a menu item returned by a function as unavailable for the keyboard', () => {
      render(<TimePicker source={['09:00', () => <MenuItem>Из функции</MenuItem>]} value={''} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      const fromFunction = screen.getByText('Из функции').closest('[role="option"]');
      expect(fromFunction).toHaveAttribute('aria-disabled', 'true');
      expect(fromFunction).not.toHaveAttribute('id');

      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(input).toHaveAttribute('aria-activedescendant');
      expect(input.getAttribute('aria-activedescendant')).not.toBe(fromFunction?.id);
    });

    it('points aria-activedescendant to the id set by the consumer', () => {
      render(
        <TimePicker
          source={[
            '09:00',
            <MenuItem key={'custom'} id={'my-own-id'}>
              Ещё
            </MenuItem>,
          ]}
          value={''}
        />,
      );

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(input).toHaveAttribute('aria-activedescendant', 'my-own-id');
      expect(document.getElementById('my-own-id')).toBeInTheDocument();
    });

    it('does not activate a non-selectable menu item on Enter', () => {
      const onAction = vi.fn();

      render(
        <TimePicker
          source={[
            <MenuItem key={'custom'} isNotSelectable onClick={onAction}>
              Действие
            </MenuItem>,
            { value: '09:00' },
          ]}
          value={''}
        />,
      );

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onAction).not.toHaveBeenCalled();
    });
  });

  describe('value and onValueChange contract', () => {
    it('emits the time of the selected item, not the item itself', () => {
      const onValueChange = vi.fn();
      const items = [{ value: '09:00', label: 'Обед', comment: 'утренний слот' }];

      render(<TimePicker source={items} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.click(screen.getByText('09:00'));

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith('09:00');
    });

    it('emits the normalized time of an item written without the leading zero', () => {
      const onValueChange = vi.fn();

      render(<TimePicker source={['9:00']} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.click(screen.getByText('09:00'));

      expect(onValueChange).toHaveBeenCalledWith('09:00');
    });

    it('emits again when the same item is selected twice', async () => {
      const onValueChange = vi.fn();

      render(<TimePicker source={testItems} value={'09:00'} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.click(screen.getByText('09:00'));

      await waitFor(() => {
        expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
      });

      fireEvent.click(input);
      fireEvent.click(screen.getByText('09:00'));

      expect(onValueChange).toHaveBeenCalledTimes(2);
      expect(onValueChange).toHaveBeenLastCalledWith('09:00');
    });

    it('emits the manually typed time', () => {
      const onValueChange = vi.fn();

      render(<TimePicker value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '9' });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith('09:00');
    });

    it('emits a string for manually typed value even when source items are objects', () => {
      const onValueChange = vi.fn();

      render(<TimePicker source={[{ value: '10:00' }]} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '9' });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith('09:00');
    });

    it('emits an empty string when the value is cleared', () => {
      const onValueChange = vi.fn();

      render(<TimePicker value={'09:00'} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'a', code: 'KeyA', ctrlKey: true });
      fireEvent.keyDown(input, { key: 'Delete' });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith('');
    });

    it('accepts a string and null as value', async () => {
      const { rerender } = render(<TimePicker value={'09:00'} />);

      const input = screen.getByRole('textbox');

      expect(input).toHaveTextContent('09:00');

      rerender(<TimePicker value={'10:00'} />);
      await waitFor(() => {
        expect(input).toHaveTextContent('10:00');
      });

      rerender(<TimePicker value={null} />);
      await waitFor(() => {
        expect(input).not.toHaveTextContent(TIME_SEPARATOR);
      });
    });
  });

  describe('string items in source', () => {
    it('shows string items in the dropdown', () => {
      render(<TimePicker source={['09:00', '10:00', '9:30']} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      const items = screen.getAllByTestId(TimePickerDataTids.item);

      expect(items).toHaveLength(3);
      expect(items[0]).toHaveTextContent('09:00');
      expect(items[2]).toHaveTextContent('09:30');
    });

    it('emits the selected string as is', () => {
      const onValueChange = vi.fn();

      render(<TimePicker source={['09:00', '10:00']} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.click(screen.getByText('10:00'));

      expect(onValueChange).toHaveBeenCalledWith('10:00');
    });

    it('emits a string for manually typed value', () => {
      const onValueChange = vi.fn();

      render(<TimePicker source={['09:00', '10:00']} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '3' });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith('23:00');
    });

    it('renders strings through renderItem', () => {
      render(<TimePicker source={['09:00']} value={''} renderItem={(item) => `слот ${item}`} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('слот 09:00')).toBeInTheDocument();
    });

    it('normalizes a string item before renderItem', () => {
      render(<TimePicker source={['9:00']} value={''} renderItem={(item) => `слот ${item}`} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('слот 09:00')).toBeInTheDocument();
    });

    it('supports strings from a function source', async () => {
      const source = () => Promise.resolve(['11:00', '12:00']);
      const onValueChange = vi.fn();

      render(<TimePicker source={source} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));

      fireEvent.click(await screen.findByText('12:00'));

      expect(onValueChange).toHaveBeenCalledWith('12:00');
    });

    it('filters string items by typed prefix', () => {
      render(<TimePicker source={['09:00', '12:00', '12:30']} value={''} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '1' });

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(2);
    });

    it('mixes strings and menu elements in one source', () => {
      const onValueChange = vi.fn();
      const items: Array<TimePickerExtendedItem<string>> = [
        <MenuHeader key="header">Рабочее время</MenuHeader>,
        '09:00',
        <MenuSeparator key="separator" />,
        '18:00',
      ];

      render(<TimePicker source={items} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('Рабочее время')).toBeInTheDocument();
      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(2);

      fireEvent.click(screen.getByText('09:00'));

      expect(onValueChange).toHaveBeenLastCalledWith('09:00');
    });

    it('mixes items and menu elements in one source', () => {
      const onValueChange = vi.fn();
      const items: Array<TimePickerExtendedItem<TimeItem>> = [
        <MenuHeader key="header">Рабочее время</MenuHeader>,
        { value: '09:00', label: 'Начало' },
        { value: '12:00', label: 'Обед' },
        <MenuSeparator key="separator" />,
      ];

      render(<TimePicker source={items} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByText('Рабочее время')).toBeInTheDocument();
      expect(screen.getByText('Обед')).toBeInTheDocument();
      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(2);

      fireEvent.click(screen.getByText('12:00'));

      expect(onValueChange).toHaveBeenLastCalledWith('12:00');
    });

    it('emits a string for manually typed value when source has object items', () => {
      const onValueChange = vi.fn();

      render(<TimePicker source={[{ value: '12:00' }]} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '3' });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith('23:00');
    });

    it('emits the typed time after the dropdown of a function source was closed', async () => {
      const onValueChange = vi.fn();

      render(<TimePicker source={() => [{ value: '09:00' }]} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      expect(await screen.findByText('09:00')).toBeInTheDocument();

      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '3' });
      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith('23:00');
    });

    it('keeps items with the same time as the source has them', () => {
      render(<TimePicker source={['09:00', '9:00', '10:00']} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(3);
    });
  });

  describe('dropdown in the HH:mm:ss format', () => {
    const secondsItems = ['09:00:00', '09:00:30', '12:30:45'];

    it('shows item times in the field format', () => {
      render(<TimePicker format={'HH:mm:ss'} source={['09:00', '12:30:45']} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      const items = screen.getAllByTestId(TimePickerDataTids.item);

      expect(items[0]).toHaveTextContent('09:00:00');
      expect(items[1]).toHaveTextContent('12:30:45');
    });

    it('filters items by the seconds segment', () => {
      render(<TimePicker format={'HH:mm:ss'} source={secondsItems} value={''} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '0' });
      fireEvent.keyDown(input, { key: '9' });
      fireEvent.keyDown(input, { key: '0' });
      fireEvent.keyDown(input, { key: '0' });
      fireEvent.keyDown(input, { key: '3' });

      const items = screen.getAllByTestId(TimePickerDataTids.item);

      expect(items).toHaveLength(1);
      expect(items[0]).toHaveTextContent('09:00:30');
    });

    it('emits the selected time with seconds', () => {
      const onValueChange = vi.fn();

      render(<TimePicker format={'HH:mm:ss'} source={secondsItems} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.click(screen.getByText('09:00:30'));

      expect(onValueChange).toHaveBeenCalledWith('09:00:30');
    });

    it('fills the seconds of an item that has none', () => {
      const onValueChange = vi.fn();

      render(<TimePicker format={'HH:mm:ss'} source={['09:00']} value={''} onValueChange={onValueChange} />);

      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.click(screen.getByText('09:00:00'));

      expect(onValueChange).toHaveBeenCalledWith('09:00:00');
    });

    it('marks the item that matches the value as selected', () => {
      render(<TimePicker format={'HH:mm:ss'} source={secondsItems} value={'09:00:30'} />);

      fireEvent.focus(screen.getByRole('textbox'));

      const [first, second] = screen.getAllByRole('option');

      expect(first).toHaveAttribute('aria-selected', 'false');
      expect(second).toHaveAttribute('aria-selected', 'true');
    });

    it('marks an item written without seconds as selected for a value with zero seconds', () => {
      render(<TimePicker format={'HH:mm:ss'} source={['09:00']} value={'09:00:00'} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
    });

    it('selects a highlighted item with seconds on Enter', () => {
      const onValueChange = vi.fn();

      render(<TimePicker format={'HH:mm:ss'} source={secondsItems} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onValueChange).toHaveBeenCalledWith('09:00:30');
    });

    it('disables items out of the min and max range by the seconds segment', () => {
      render(
        <TimePicker format={'HH:mm:ss'} source={secondsItems} value={''} minTime={'09:00:15'} maxTime={'12:30:45'} />,
      );

      fireEvent.focus(screen.getByRole('textbox'));

      const [first, second, third] = screen.getAllByRole('option');

      expect(first).toHaveAttribute('aria-disabled', 'true');
      expect(second).not.toHaveAttribute('aria-disabled');
      expect(third).not.toHaveAttribute('aria-disabled');
    });
  });

  describe('items with the same time', () => {
    it('shows every item the source has', () => {
      const items = [
        { value: '09:00', label: 'первый' },
        { value: '9:00', label: 'то же время без ведущего нуля' },
        { value: '09:00', label: 'то же время' },
        { value: '10:00', label: 'другое время' },
      ];

      render(<TimePicker source={items} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(4);
      expect(screen.getByText('первый')).toBeInTheDocument();
      expect(screen.getByText('то же время без ведущего нуля')).toBeInTheDocument();
      expect(screen.getByText('то же время')).toBeInTheDocument();
      expect(screen.getByText('другое время')).toBeInTheDocument();
    });

    it('emits the time of the clicked item', () => {
      const onValueChange = vi.fn();
      const items = [
        { value: '12:00', comment: 'первый' },
        { value: '12:30', comment: 'второй' },
      ];

      render(
        <TimePicker source={items} value={''} onValueChange={onValueChange} renderItem={(item) => item.comment} />,
      );

      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.click(screen.getByText('второй'));

      expect(onValueChange).toHaveBeenCalledWith('12:30');
    });
  });

  describe('onInputValueChange after a commit', () => {
    it('emits the next partial value after the value was committed', () => {
      const onInputValueChange = vi.fn();
      render(<TimePicker source={testItems} onInputValueChange={onInputValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '0' });
      fireEvent.keyDown(input, { key: '9' });
      fireEvent.click(screen.getByText('09:00'));

      onInputValueChange.mockClear();
      fireEvent.keyDown(input, { key: 'Delete' });

      expect(onInputValueChange).toHaveBeenCalledTimes(1);
      expect(onInputValueChange).toHaveBeenLastCalledWith('09');
    });

    it('does not emit the committed value again when the value did not change', () => {
      const onInputValueChange = vi.fn();
      render(<TimePicker onInputValueChange={onInputValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '0' });
      fireEvent.keyDown(input, { key: '9' });
      fireEvent.blur(input);
      fireEvent.focus(input);

      onInputValueChange.mockClear();
      fireEvent.keyDown(input, { key: 'ArrowRight' });

      expect(onInputValueChange).not.toHaveBeenCalled();
    });
  });

  describe('value that is not strictly normalized', () => {
    it('does not commit again on blur after selecting an item', () => {
      const onValueChange = vi.fn();
      const items = [
        { value: '09:00:00', label: 'Утро', free: 5 },
        { value: '14:00:00', label: 'День', free: 2 },
      ];

      const Controlled = () => {
        const [time, setTime] = React.useState('');

        return (
          <TimePicker
            source={items}
            value={time}
            onValueChange={(nextTime) => {
              setTime(nextTime);
              onValueChange(nextTime);
            }}
          />
        );
      };

      render(<Controlled />);
      const input = screen.getByRole('textbox');

      fireEvent.focus(input);
      fireEvent.click(screen.getByText('14:00'));
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith('14:00');
    });

    it.each([
      ['a value without the leading zero', '9:00', 'HH:mm' as const],
      ['a value with extra seconds', '09:00:00', 'HH:mm' as const],
      ['a value without seconds', '09:00', 'HH:mm:ss' as const],
    ])('does not commit %s on blur without edits', (_name, value, format) => {
      const onValueChange = vi.fn();
      render(<TimePicker value={value} format={format} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe('hidden dropdown', () => {
    const sourceWithDecorations = [
      <MenuHeader key={'header'}>Время</MenuHeader>,
      '09:00',
      '10:00',
      <MenuItem key={'more'}>Показать ещё</MenuItem>,
    ];

    it('lets arrow keys edit the value when the dropdown is hidden', () => {
      render(<TimePicker source={sourceWithDecorations} value={''} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '2' });

      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();

      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(input).toHaveTextContent('22:01');
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });

    it('commits the value on Enter instead of a hidden menu item', () => {
      const onAction = vi.fn();
      const onValueChange = vi.fn();

      render(
        <TimePicker
          source={[
            <MenuHeader key={'header'}>Время</MenuHeader>,
            '09:00',
            <MenuItem key={'more'} onClick={onAction}>
              Показать ещё
            </MenuItem>,
          ]}
          value={''}
          onValueChange={onValueChange}
        />,
      );

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onAction).not.toHaveBeenCalled();
      expect(onValueChange).toHaveBeenCalledWith('22:00');
    });
  });

  describe('item label', () => {
    const theme = ThemeFactory.create({
      menuItemCommentColor: 'rgb(1, 2, 3)',
      menuItemCommentColorHover: 'rgb(7, 8, 9)',
      menuItemDisabledColor: 'rgb(4, 5, 6)',
    });

    const renderWithTheme = (props: TimePickerProps<TimeItem>) =>
      render(
        <ThemeContext.Provider value={theme}>
          <TimePicker {...props} />
        </ThemeContext.Provider>,
      );

    it('uses the comment color by default', () => {
      renderWithTheme({ source: [{ value: '09:00', label: 'Обед' }], value: '' });

      fireEvent.focus(screen.getByRole('textbox'));

      expect(getComputedStyle(screen.getByText('Обед')).color).toBe(theme.menuItemCommentColor);
    });

    it('uses the disabled color for a disabled item', () => {
      renderWithTheme({ source: [{ value: '09:00', label: 'Обед', disabled: true }], value: '' });

      fireEvent.focus(screen.getByRole('textbox'));

      const value = screen.getByText('09:00');
      const label = screen.getByText('Обед');

      expect(getComputedStyle(label).color).toBe(theme.menuItemDisabledColor);
      expect(getComputedStyle(label).color).toBe(getComputedStyle(value).color);
    });

    it('uses the disabled color for an item out of the min and max range', () => {
      renderWithTheme({ source: [{ value: '09:00', label: 'Обед' }], minTime: '12:00', value: '' });

      fireEvent.focus(screen.getByRole('textbox'));

      expect(getComputedStyle(screen.getByText('Обед')).color).toBe(theme.menuItemDisabledColor);
    });

    it('keeps the comment color for a highlighted item', () => {
      renderWithTheme({ source: [{ value: '09:00', label: 'Обед' }], value: '' });

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      expect(getComputedStyle(screen.getByText('Обед')).color).toBe(theme.menuItemCommentColor);
    });
  });

  describe('unexpected source content', () => {
    it('skips empty entries left by conditional rendering', () => {
      const source = [{ value: '09:00' }, null, undefined, false, { value: '10:00' }] as Array<
        TimePickerExtendedItem<TimeItem>
      >;

      render(<TimePicker source={source} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getAllByTestId(TimePickerDataTids.item).map((item) => item.textContent)).toEqual([
        '09:00',
        '10:00',
      ]);
    });

    it('skips items whose value is not a time', () => {
      const source = [{ value: 'обед' }, { value: '10:00' }] as Array<TimePickerExtendedItem<TimeItem>>;

      render(<TimePicker source={source} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(screen.getAllByTestId(TimePickerDataTids.item).map((item) => item.textContent)).toEqual(['10:00']);
    });

    it('does not report an empty clipboard as unexpected input', () => {
      const onUnexpectedInput = vi.fn();
      render(<TimePicker value={''} onUnexpectedInput={onUnexpectedInput} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.paste(input, { clipboardData: { getData: () => '  ' } });

      expect(onUnexpectedInput).not.toHaveBeenCalled();
    });

    it('emits a string for a manually typed value when the array source has no object items', () => {
      const onValueChange = vi.fn();
      const { rerender } = render(
        <TimePicker source={[{ value: '09:00' }]} value={''} onValueChange={onValueChange} />,
      );

      rerender(<TimePicker source={['10:00']} value={''} onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '3' });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith('23:00');
    });

    it('survives a function source that does not return an array', async () => {
      render(<TimePicker source={(() => undefined) as never} value={''} />);

      fireEvent.focus(screen.getByRole('textbox'));

      await waitFor(() => {
        expect(screen.queryByTestId(TimePickerDataTids.loading)).not.toBeInTheDocument();
      });
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('uncontrolled value', () => {
    it('keeps the typed value after blur without the value prop', async () => {
      render(<TimePicker />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '1' });
      fireEvent.keyDown(input, { key: '2' });
      fireEvent.keyDown(input, { key: '3' });
      fireEvent.keyDown(input, { key: '0' });
      fireEvent.blur(input);

      await waitFor(() => {
        expect(input).toHaveTextContent('12:30');
      });
    });

    it('keeps the selected item after blur without the value prop', async () => {
      render(<TimePicker source={testItems} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.click(screen.getByText('11:00'));
      fireEvent.blur(input);

      await waitFor(() => {
        expect(input).toHaveTextContent('11:00');
      });
    });

    it('does not emit the same value again after refocus', () => {
      const onValueChange = vi.fn();
      render(<TimePicker onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: '9' });
      fireEvent.blur(input);
      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenLastCalledWith('09:00');
    });

    it('shows a loosely formatted value the same way as an item', () => {
      render(<TimePicker value={'9:00'} source={['9:00']} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveTextContent('09:00');

      fireEvent.focus(input);
      expect(screen.getByRole('option', { selected: true })).toHaveTextContent('09:00');
    });

    it('clears the value on empty value prop', async () => {
      const { rerender } = render(<TimePicker value={'12:30'} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveTextContent('12:30');

      rerender(<TimePicker value={null} />);

      await waitFor(() => {
        expect(input).not.toHaveTextContent('12:30');
      });
    });
  });
});
