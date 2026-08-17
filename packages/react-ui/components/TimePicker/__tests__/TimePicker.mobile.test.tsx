import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { InputLikeText } from '../../../internal/InputLikeText/index.js';
import { MobilePopupDataTids } from '../../../internal/MobilePopup/index.js';
import { LangCodes, LocaleContext } from '../../../lib/locale/index.js';
import { MenuItem } from '../../MenuItem/index.js';

vi.mock('../../../lib/client.js', async () => {
  const actual = await vi.importActual('../../../lib/client.js');

  return {
    ...actual,
    isIOS: false,
  };
});

import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR, TimePickerDataTids } from '../helpers/TimePicker.constants.js';
import type { TimeItem } from '../helpers/TimePicker.shared.js';
import type { TimePickerProps, TimePickerRef } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';
import { createMobileLayoutMock } from './mobileLayoutMock.js';

const mobileLayout = createMobileLayoutMock();

beforeAll(() => {
  mobileLayout.install();
});

afterAll(() => {
  mobileLayout.restore();
});

beforeEach(() => {
  mobileLayout.setMobileLayout(true);
});

const ControlledTimePicker = (props: Omit<TimePickerProps<TimeItem>, 'value' | 'onValueChange'>) => {
  const [value, setValue] = React.useState('');

  return <TimePicker {...props} value={value} onValueChange={setValue} />;
};

const items = [
  { value: '09:00' },
  { value: '10:00' },
  { value: '11:00' },
  { value: '12:00' },
  { value: '13:00' },
  { value: '14:00' },
  { value: '15:00' },
  { value: '16:00' },
];

describe('<TimePicker /> mobile source mode', () => {
  it('uses localized aria-placeholder in mobile popup input', async () => {
    render(
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <ControlledTimePicker source={items} format={'HH:mm:ss'} />
      </LocaleContext.Provider>,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(TimePickerDataTids.mobileInput)).toHaveAttribute('aria-placeholder', 'hh:mm:ss');
  });

  it('opens mobile popup when source is passed on mobile devices', async () => {
    render(<ControlledTimePicker source={items} />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(MobilePopupDataTids.root)).toBeInTheDocument();
    expect(screen.getByTestId(TimePickerDataTids.mobilePopup)).toBeInTheDocument();
    expect(screen.getByTestId(TimePickerDataTids.mobileInput)).toBeInTheDocument();
  });

  it('marks the mobile input as busy while source is loading', async () => {
    let resolveItems: (items: Array<{ value: string }>) => void = () => undefined;
    const source = () =>
      new Promise<Array<{ value: string }>>((resolve) => {
        resolveItems = resolve;
      });

    render(<TimePicker source={source} />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);
    expect(mobileInput).toHaveAttribute('aria-busy', 'true');

    await act(async () => {
      resolveItems(items);
    });

    expect(mobileInput).not.toHaveAttribute('aria-busy');
  });

  it('shows a retry action when source rejects', async () => {
    const source = vi.fn(() => Promise.reject(new Error('source failure')));

    render(<TimePicker source={source} />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);
    expect(await screen.findByTestId(TimePickerDataTids.failed)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Обновить' })).toBeInTheDocument();
    expect(mobileInput).not.toHaveAttribute('aria-busy');
    expect(mobileInput).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not change value on unsupported char key input in mobile mode', async () => {
    const blinkSpy = vi.spyOn(InputLikeText.prototype, 'blink').mockImplementation(() => undefined);
    const onValueChange = vi.fn();

    try {
      render(<TimePicker onValueChange={onValueChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: ',' });

      expect(input).toHaveTextContent(
        `${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}${TIME_SEPARATOR}${TIME_PLACEHOLDER_CHAR}${TIME_PLACEHOLDER_CHAR}`,
      );
      expect(onValueChange).not.toHaveBeenCalled();
      expect(blinkSpy).toHaveBeenCalledTimes(1);
    } finally {
      blinkSpy.mockRestore();
    }
  });

  it('allows editing value through mobile input in popup', async () => {
    render(<ControlledTimePicker source={items} />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);

    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '1' });
    fireEvent.keyDown(mobileInput, { key: '2' });
    fireEvent.keyDown(mobileInput, { key: 'Tab' });
    fireEvent.keyDown(mobileInput, { key: '3' });
    fireEvent.keyDown(mobileInput, { key: '4' });

    expect(screen.getByTestId(TimePickerDataTids.input)).toHaveTextContent('12:34');
    expect(screen.getByTestId(TimePickerDataTids.mobileInput)).toHaveTextContent('12:34');
  });

  it('calls input and committed value callbacks once for mobile input and item selection', async () => {
    const callbackOrder: string[] = [];
    const onInputValueChange = vi.fn();
    const onValueChange = vi.fn();
    const onBlur = vi.fn(() => callbackOrder.push('onBlur'));
    const Controlled = () => {
      const [value, setValue] = React.useState('');
      const handleValueChange = React.useCallback((time: string) => {
        callbackOrder.push('onValueChange');
        onValueChange(time);
        setValue(time);
      }, []);
      const handleInputValueChange = React.useCallback((nextValue: string) => {
        callbackOrder.push('onInputValueChange');
        onInputValueChange(nextValue);
      }, []);

      return (
        <TimePicker
          source={items}
          value={value}
          onBlur={onBlur}
          onInputValueChange={handleInputValueChange}
          onValueChange={handleValueChange}
        />
      );
    };

    render(<Controlled />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);
    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '9' });

    expect(onInputValueChange).toHaveBeenCalledTimes(1);
    expect(onInputValueChange).toHaveBeenLastCalledWith('09');
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.click(await screen.findByText('09:00'));

    expect(onInputValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith('09:00');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(callbackOrder).toEqual(['onInputValueChange', 'onValueChange', 'onBlur']);
  });

  it('keeps popup input stretched to full width', async () => {
    render(<ControlledTimePicker source={items} />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(TimePickerDataTids.mobileInput)).toHaveStyle({ width: '100%' });
  });

  it('keeps the input fixed in the popup footer while filtering items like ComboBox', async () => {
    render(<ControlledTimePicker source={items} />);

    fireEvent.click(screen.getByRole('textbox'));

    const popup = await screen.findByTestId(MobilePopupDataTids.root);
    const mobileInput = screen.getByTestId(TimePickerDataTids.mobileInput);

    expect(popup.lastElementChild).toContainElement(mobileInput);

    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '1' });
    fireEvent.keyDown(mobileInput, { key: '6' });

    await waitFor(() => {
      expect(screen.getAllByTestId(TimePickerDataTids.item)).toHaveLength(1);
    });
    expect(popup.lastElementChild).toContainElement(mobileInput);
  });

  it('highlights the first enabled filtered item on the mobile input and selects it on Enter', async () => {
    const onValueChange = vi.fn();

    render(
      <TimePicker
        source={[{ value: '10:00', disabled: true }, { value: '11:00' }, { value: '12:00' }]}
        onValueChange={onValueChange}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);
    await waitFor(() => {
      expect(mobileInput).toHaveFocus();
    });
    expect(mobileInput).toHaveAttribute('aria-haspopup', 'listbox');
    expect(mobileInput).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(mobileInput.getAttribute('aria-controls') ?? '')).toBeInTheDocument();

    fireEvent.keyDown(mobileInput, { key: '1' });

    const enabledItem = (await screen.findAllByTestId(TimePickerDataTids.item))[1];
    await waitFor(() => {
      expect(enabledItem.closest('[data-visual-state-hover]')).not.toBeNull();
      expect(mobileInput).toHaveAttribute('aria-activedescendant', enabledItem.closest('[role="option"]')?.id);
      expect(screen.getByTestId(TimePickerDataTids.input)).not.toHaveAttribute('aria-activedescendant');
    });

    fireEvent.keyDown(mobileInput, { key: 'Enter' });

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith('11:00');
    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
  });

  it('selects item from mobile popup and closes it', async () => {
    render(<ControlledTimePicker source={items} />);

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(await screen.findByText('09:00'));

    expect(screen.getByRole('textbox')).toHaveTextContent('09:00');
    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
  });

  it('keeps disabled item non-selectable in mobile popup', async () => {
    const onValueChange = vi.fn();

    render(
      <TimePicker
        minTime={'09:00'}
        maxTime={'18:00'}
        onValueChange={onValueChange}
        source={[{ value: '07:00' }, { value: '09:00' }, { value: '19:00' }]}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(await screen.findByText('07:00'));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByTestId(MobilePopupDataTids.root)).toBeInTheDocument();
  });

  it('commits pending value when closing mobile popup by backdrop', async () => {
    const onBlur = vi.fn();
    render(<ControlledTimePicker source={items} onBlur={onBlur} />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);

    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '1' });
    fireEvent.keyDown(mobileInput, { key: '2' });
    fireEvent.keyDown(mobileInput, { key: 'Tab' });
    fireEvent.keyDown(mobileInput, { key: '6' });
    fireEvent.click(screen.getByTestId(MobilePopupDataTids.backdrop));

    expect(screen.getByTestId(TimePickerDataTids.input)).toHaveTextContent('12:06');
    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('calls value callbacks before onBlur when closing mobile popup by backdrop', async () => {
    const callbackOrder: string[] = [];
    const onValueChange = vi.fn(() => callbackOrder.push('onValueChange'));
    const onInputValueChange = vi.fn(() => callbackOrder.push('onInputValueChange'));
    const onBlur = vi.fn(() => callbackOrder.push('onBlur'));
    const Controlled = () => {
      const [value, setValue] = React.useState('');

      return (
        <TimePicker
          source={items}
          value={value}
          onValueChange={(time) => {
            onValueChange();
            setValue(time);
          }}
          onInputValueChange={onInputValueChange}
          onBlur={onBlur}
        />
      );
    };

    render(<Controlled />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);

    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '1' });
    fireEvent.keyDown(mobileInput, { key: '2' });
    fireEvent.click(screen.getByTestId(MobilePopupDataTids.backdrop));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(callbackOrder).toEqual(['onInputValueChange', 'onInputValueChange', 'onValueChange', 'onBlur']);
    expect(screen.getByTestId(TimePickerDataTids.input)).toHaveTextContent('12:00');
  });

  it('calls value callbacks before onBlur when closing mobile popup through public blur', async () => {
    const callbackOrder: string[] = [];
    const ref = React.createRef<TimePickerRef>();
    const onValueChange = vi.fn(() => callbackOrder.push('onValueChange'));
    const onBlur = vi.fn(() => callbackOrder.push('onBlur'));
    const Controlled = () => {
      const [value, setValue] = React.useState('');

      return (
        <TimePicker
          ref={ref}
          source={items}
          value={value}
          onValueChange={(time) => {
            onValueChange();
            setValue(time);
          }}
          onBlur={onBlur}
        />
      );
    };

    render(<Controlled />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);

    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '9' });

    act(() => {
      ref.current?.blur();
    });

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(callbackOrder).toEqual(['onValueChange', 'onBlur']);
    expect(screen.getByTestId(TimePickerDataTids.input)).toHaveTextContent('09:00');
  });

  it.each([['close'], ['blur']] as const)('closes mobile popup and calls onBlur through public %s', async (method) => {
    const ref = React.createRef<TimePickerRef>();
    const onBlur = vi.fn();

    render(<TimePicker ref={ref} source={items} value={''} onValueChange={vi.fn()} onBlur={onBlur} />);

    fireEvent.click(screen.getByRole('textbox'));

    await screen.findByTestId(MobilePopupDataTids.root);
    await waitFor(() => {
      expect(screen.getByTestId(TimePickerDataTids.mobileInput)).toHaveFocus();
    });

    act(() => {
      ref.current?.[method]();
    });

    await waitFor(() => {
      expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
    });
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus only once when mobile popup opens', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<ControlledTimePicker source={items} onFocus={onFocus} onBlur={onBlur} />);

    fireEvent.click(screen.getByRole('textbox'));

    await screen.findByTestId(TimePickerDataTids.mobileInput);

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    expect(onBlur).not.toHaveBeenCalled();
  });

  it('calls key and paste handlers once for the mobile popup input', async () => {
    const onKeyDown = vi.fn();
    const onPaste = vi.fn();

    render(<ControlledTimePicker source={items} onKeyDown={onKeyDown} onPaste={onPaste} />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);
    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '1' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.paste(mobileInput, { clipboardData: { getData: () => '12:30' } });

    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId(TimePickerDataTids.input)).toHaveTextContent('12:30');
  });

  it('calls onBlur only when mobile popup closes, not when its input loses focus', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<ControlledTimePicker source={items} onFocus={onFocus} onBlur={onBlur} />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    fireEvent.blur(mobileInput);

    expect(onBlur).not.toHaveBeenCalled();
    expect(screen.getByTestId(MobilePopupDataTids.root)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(MobilePopupDataTids.backdrop));

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
  });

  it('keeps aria-expanded on the mobile input while the popup shows any item', async () => {
    render(<ControlledTimePicker source={[...items, <MenuItem key={'more'}>Показать ещё</MenuItem>]} />);

    fireEvent.click(screen.getByRole('textbox'));
    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);

    fireEvent.focus(mobileInput);
    fireEvent.keyDown(mobileInput, { key: '2' });
    fireEvent.keyDown(mobileInput, { key: '2' });

    expect(screen.getByText('Показать ещё')).toBeVisible();
    expect(mobileInput).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(mobileInput.getAttribute('aria-controls') ?? '')).toBeInTheDocument();
  });

  it('keeps the item selected in the mobile popup without the value prop', async () => {
    render(<TimePicker source={items} />);

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(await screen.findByText('11:00'));

    await waitFor(() => {
      expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
    });

    expect(screen.getByRole('textbox')).toHaveTextContent('11:00');
  });

  it('gives the selected value to the onBlur handler', async () => {
    const blurValues: string[] = [];
    const Controlled = () => {
      const [value, setValue] = React.useState('');

      return <TimePicker source={items} value={value} onValueChange={setValue} onBlur={() => blurValues.push(value)} />;
    };

    render(<Controlled />);

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(await screen.findByText('10:00'));

    await waitFor(() => {
      expect(blurValues).toEqual(['10:00']);
    });
  });

  it('calls onBlur when the popup closes with the focus left in the field', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<ControlledTimePicker source={items} onFocus={onFocus} onBlur={onBlur} />);

    const input = screen.getByTestId(TimePickerDataTids.input);

    act(() => {
      input.focus();
    });

    // Мобильный браузер может не отдать фокус инпуту попапа без жеста пользователя: фокус остается в поле.
    const focusSpy = vi.spyOn(InputLikeText.prototype, 'focus').mockImplementation(() => undefined);

    try {
      await screen.findByTestId(MobilePopupDataTids.root);
      await waitFor(() => {
        expect(screen.getByTestId(TimePickerDataTids.mobileInput)).toBeInTheDocument();
      });

      expect(input).toHaveFocus();
      // Фокус контрол получил в поле, поэтому о нем сообщено и без фокуса в инпуте попапа.
      expect(onFocus).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByTestId(MobilePopupDataTids.backdrop));

      await waitFor(() => {
        expect(onBlur).toHaveBeenCalledTimes(1);
      });
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
    } finally {
      focusSpy.mockRestore();
    }
  });

  it('continues typing from the same segment when the layout changes', async () => {
    mobileLayout.setMobileLayout(false);

    render(<ControlledTimePicker source={items} />);

    const input = screen.getByRole('textbox');

    act(() => {
      input.focus();
    });

    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '0' });
    fireEvent.keyDown(input, { key: '3' });

    mobileLayout.setMobileLayout(true);

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);
    await waitFor(() => {
      expect(mobileInput).toHaveFocus();
    });

    // Ввод продолжается с минут, а не начинается заново с часов.
    fireEvent.keyDown(mobileInput, { key: '0' });

    expect(mobileInput).toHaveTextContent('10:30');

    fireEvent.keyDown(mobileInput, { key: 'ArrowLeft' });
    fireEvent.keyDown(mobileInput, { key: '1' });
    fireEvent.keyDown(mobileInput, { key: '6' });

    mobileLayout.setMobileLayout(false);

    await waitFor(() => {
      expect(input).toHaveFocus();
    });

    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: '4' });
    fireEvent.keyDown(input, { key: '5' });

    expect(input).toHaveTextContent('16:45');
  });

  it('reports one focus session while the layout changes back and forth', async () => {
    mobileLayout.setMobileLayout(false);

    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<ControlledTimePicker source={items} onFocus={onFocus} onBlur={onBlur} />);

    const input = screen.getByRole('textbox');

    act(() => {
      input.focus();
    });

    expect(onFocus).toHaveBeenCalledTimes(1);

    mobileLayout.setMobileLayout(true);
    await screen.findByTestId(MobilePopupDataTids.root);
    await waitFor(() => {
      expect(screen.getByTestId(TimePickerDataTids.mobileInput)).toHaveFocus();
    });

    mobileLayout.setMobileLayout(false);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();

    act(() => {
      input.blur();
    });

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('commits the value typed in the desktop version when the layout becomes mobile', async () => {
    mobileLayout.setMobileLayout(false);

    const onValueChange = vi.fn();
    const onBlur = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('');

      return (
        <TimePicker
          source={items}
          value={value}
          onValueChange={(time) => {
            onValueChange(time);
            setValue(time);
          }}
          onBlur={onBlur}
        />
      );
    };

    render(<Controlled />);

    const input = screen.getByRole('textbox');

    act(() => {
      input.focus();
    });

    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '0' });
    fireEvent.keyDown(input, { key: '3' });
    fireEvent.keyDown(input, { key: '0' });
    // Меню закрыто, поэтому в мобильной версии ввод продолжать негде.
    fireEvent.keyDown(input, { key: 'Escape' });

    mobileLayout.setMobileLayout(true);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1);
    });
    expect(onValueChange).toHaveBeenLastCalledWith('10:30');
    expect(input).toHaveTextContent('10:30');
    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();

    act(() => {
      input.blur();
    });

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when the field loses focus without an opened popup', async () => {
    const ref = React.createRef<TimePickerRef>();
    const onValueChange = vi.fn();
    const onBlur = vi.fn();

    render(<TimePicker ref={ref} source={items} value={''} onValueChange={onValueChange} onBlur={onBlur} />);

    act(() => {
      ref.current?.focus({ withoutOpenDropdown: true });
    });

    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();

    act(() => {
      ref.current?.blur();
    });

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    // Событие того blur не должно уйти повторно при следующем закрытии попапа.
    const focusSpy = vi.spyOn(InputLikeText.prototype, 'focus').mockImplementation(() => undefined);

    try {
      act(() => {
        ref.current?.open();
      });

      await screen.findByTestId(MobilePopupDataTids.root);

      fireEvent.click(screen.getByTestId(MobilePopupDataTids.backdrop));

      await waitFor(() => {
        expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
      });
      expect(onBlur).toHaveBeenCalledTimes(1);
    } finally {
      focusSpy.mockRestore();
    }
  });

  it('closes the popup opened without focus when the layout becomes desktop', async () => {
    const focusSpy = vi.spyOn(InputLikeText.prototype, 'focus').mockImplementation(() => undefined);

    try {
      render(<ControlledTimePicker source={items} />);

      fireEvent.click(screen.getByRole('textbox'));

      await screen.findByTestId(MobilePopupDataTids.root);
      expect(document.body).toHaveFocus();

      mobileLayout.setMobileLayout(false);

      await waitFor(() => {
        expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
      });
      // Десктопное меню закрывается по потере фокуса поля — без фокуса его было бы нечем закрыть.
      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    } finally {
      focusSpy.mockRestore();
    }
  });

  it('switches between the mobile popup and the desktop menu with the layout', async () => {
    render(<ControlledTimePicker source={items} />);

    fireEvent.click(screen.getByRole('textbox'));

    await screen.findByTestId(MobilePopupDataTids.root);

    mobileLayout.setMobileLayout(false);

    await waitFor(() => {
      expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
    });
    expect(screen.getByTestId(TimePickerDataTids.input)).toHaveFocus();

    mobileLayout.setMobileLayout(true);

    await waitFor(() => {
      expect(screen.getByTestId(MobilePopupDataTids.root)).toBeInTheDocument();
    });
    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });
});

describe('<TimePicker /> mobile layout without source', () => {
  it('types time directly in the field, like the desktop version', () => {
    render(<ControlledTimePicker />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: '1' });
    fireEvent.keyDown(input, { key: '0' });
    fireEvent.keyDown(input, { key: '3' });
    fireEvent.keyDown(input, { key: '0' });

    expect(input).toHaveTextContent('10:30');
    expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
  });
});
