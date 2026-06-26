import { act, createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { InputLikeText } from '../../../internal/InputLikeText/index.js';
import { LangCodes, LocaleContext } from '../../../lib/locale/index.js';
import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR, TimePickerDataTids } from '../helpers/TimePicker.constants.js';
import type { TimePickerProps, TimePickerRef } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';

const ControlledTimePicker = (props: Omit<TimePickerProps, 'value' | 'onValueChange'>) => {
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
    const onValueChange = vi.fn();
    render(<TimePicker onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '9' });

    expect(onValueChange).toHaveBeenLastCalledWith('09');
    expect(input).toHaveTextContent(`09${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);

    await waitFor(() => {
      expect(getSelectionText()).toBe(`${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);
    });
  });

  it('keeps hours selected after first digit 1 and emits partial raw value', async () => {
    const onValueChange = vi.fn();
    render(<TimePicker onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });

    expect(onValueChange).toHaveBeenLastCalledWith('01');
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
    const onValueChange = vi.fn();

    render(<TimePicker minTime={'09:00'} maxTime={'18:00'} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '25:88',
      },
    });

    expect(input).toHaveTextContent('23:59');
    expect(onValueChange).toHaveBeenLastCalledWith('23:59');
  });

  it('opens dropdown on focus and arrow down highlights first item', async () => {
    render(<TimePicker items={testItems} />);

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
    render(<TimePicker items={testItems} value={'12:00'} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const items = screen.getAllByTestId(TimePickerDataTids.item);
    expect(items[4].closest('[data-visual-state-hover]')).not.toBeNull();
  });

  it('closes dropdown when becomes disabled', async () => {
    const { rerender } = render(<TimePicker items={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();

    rerender(<TimePicker items={testItems} disabled />);

    await waitFor(() => {
      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    });
  });

  it('allows arrow keys to go beyond min and max range', () => {
    const onValueChange = vi.fn();

    render(<TimePicker value={'18:00'} minTime={'09:00'} maxTime={'18:00'} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveTextContent('19:00');
    expect(onValueChange).toHaveBeenLastCalledWith('19:00');
  });

  it('changes segment on arrow keys when items are empty', () => {
    render(<TimePicker items={[]} value={'09:00'} />);

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
        items={[{ value: '07:00' }, { value: '19:00' }]}
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
        items={[{ value: '07:00' }, { value: '09:00' }, { value: '19:00' }]}
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
    render(<ControlledTimePicker items={testItems} />);

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
    render(<TimePicker items={testItems} value={''} onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.click(screen.getByText('09:00'));

    expect(onValueChange).toHaveBeenCalledWith('09:00');
  });

  it('keeps dropdown opened after completing the last segment with keyboard in dropdown mode', async () => {
    render(<TimePicker items={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '2' });
    fireEvent.keyDown(input, { key: '3' });
    fireEvent.keyDown(input, { key: '4' });

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();

    await waitFor(() => {
      expect(input).toHaveFocus();
      expect(getSelectionText()).toBe('34');
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

  it('commits hours on Tab without filling untouched trailing segments in onValueChange', () => {
    const onValueChange = vi.fn();

    const Controlled = () => {
      const [value, setValue] = React.useState('');

      const handleChange = React.useCallback((nextValue: string) => {
        onValueChange(nextValue);
        setValue(nextValue);
      }, []);

      return <TimePicker value={value} onValueChange={handleChange} />;
    };

    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });

    expect(onValueChange).toHaveBeenLastCalledWith('01');

    const tabEvent = createEvent.keyDown(input, { key: 'Tab' });
    fireEvent(input, tabEvent);

    expect(tabEvent.defaultPrevented).toBe(true);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveTextContent(`01${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`);

    fireEvent.keyDown(input, { key: '3' });

    expect(onValueChange).toHaveBeenLastCalledWith('01:03');
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
    const { container } = render(<TimePicker items={testItems} />);

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

    expect(screen.getByRole('textbox')).toHaveStyle({ width: 'auto', minWidth: '80px' });
  });

  it('takes content width by default and keeps baseline min-width without icon', () => {
    render(<TimePicker value={'12:34'} rightIcon={null} suffix={'МСК'} />);

    expect(screen.getByRole('textbox')).toHaveStyle({ width: 'auto', minWidth: '60px' });
  });

  it('keeps baseline min-width for empty value without icon', () => {
    render(<TimePicker rightIcon={null} value={''} />);

    expect(screen.getByRole('textbox')).toHaveStyle({ width: 'auto', minWidth: '60px' });
  });

  it('preserves explicit width prop', () => {
    render(<TimePicker value={'12:34'} width={240} />);

    expect(screen.getByRole('textbox')).toHaveStyle({ width: '240px' });
  });

  it('opens dropdown by custom right icon click', () => {
    render(<TimePicker items={testItems} rightIcon={<span data-tid={'custom-right-icon'}>★</span>} />);

    fireEvent.click(screen.getByTestId('custom-right-icon'));

    expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
  });

  it('supports close through public ref', async () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} items={testItems} />);

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

  it('has `aria-haspopup` when items are passed', () => {
    const { rerender } = render(<TimePicker />);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-haspopup');

    rerender(<TimePicker items={testItems} />);
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('sets `aria-expanded` when dropdown is opened and removes when closed', async () => {
    render(<TimePicker items={testItems} />);

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
    render(<TimePicker items={testItems} />);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-controls');

    fireEvent.focus(input);

    const popup = screen.getByTestId(TimePickerDataTids.popup);
    expect(input).toHaveAttribute('aria-controls', popup.id);
  });

  it('sets `aria-activedescendant` to highlighted item when navigating with arrow keys', () => {
    render(<TimePicker items={testItems} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(input).not.toHaveAttribute('aria-activedescendant');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const items = screen.getAllByTestId(TimePickerDataTids.item);
    expect(input).toHaveAttribute('aria-activedescendant', items[0].id);
    expect(items[0].id).not.toBe('');
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
    const onValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('');
      const handleChange = React.useCallback((v: string) => {
        onValueChange(v);
        setValue(v);
      }, []);
      return <TimePicker value={value} onValueChange={handleChange} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '9' });
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith('09');

    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveTextContent('09:00');
    });
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(onValueChange).toHaveBeenLastCalledWith('09:00');
  });

  it('does not call onValueChange twice when selecting same value item', () => {
    const onValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('09:00');
      const handleChange = React.useCallback((v: string) => {
        onValueChange(v);
        setValue(v);
      }, []);
      return <TimePicker items={testItems} value={value} onValueChange={handleChange} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.click(screen.getByText('09:00'));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('calls onValueChange once when selecting different value item', () => {
    const onValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('10:00');
      const handleChange = React.useCallback((v: string) => {
        onValueChange(v);
        setValue(v);
      }, []);
      return <TimePicker items={testItems} value={value} onValueChange={handleChange} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.click(screen.getByText('09:00'));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('09:00');
  });

  it('does not call onValueChange twice with pending minutes after blur', async () => {
    const onValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('');
      const handleChange = React.useCallback((v: string) => {
        onValueChange(v);
        setValue(v);
      }, []);
      return <TimePicker value={value} onValueChange={handleChange} />;
    };
    render(<Controlled />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });
    fireEvent.keyDown(input, { key: '6' });
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith('00:06');

    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveTextContent('00:06');
    });
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });
});
