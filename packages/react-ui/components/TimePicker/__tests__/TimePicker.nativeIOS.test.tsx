import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

vi.mock('../../../lib/client.js', async () => {
  const actual = await vi.importActual('../../../lib/client.js');

  return {
    ...actual,
    isIOS: true,
  };
});

import { TimePickerDataTids } from '../helpers/TimePicker.constants.js';
import type { TimePickerRef } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';
import { createMobileLayoutMock } from './mobileLayoutMock.js';

const mobileLayout = createMobileLayoutMock();

beforeAll(() => {
  mobileLayout.install();
});

afterAll(() => {
  mobileLayout.restore();
});

/**
 * На iOS системный пикер открывается только фокусом, поэтому фокус уходит из поля
 * в скрытый `input[type=time]`. Для внешнего мира это не потеря фокуса контролом.
 */
describe('<TimePicker /> native mobile mode on iOS', () => {
  it('opens the native picker by focus without reporting a focus loss', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<TimePicker useMobileNativeTimePicker value={''} onFocus={onFocus} onBlur={onBlur} />);

    const nativeInput = await screen.findByTestId(TimePickerDataTids.nativeInput);

    act(() => {
      screen.getByTestId(TimePickerDataTids.input).focus();
    });

    expect(nativeInput).toHaveFocus();
    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
    expect(onBlur).not.toHaveBeenCalled();
  });

  it('reports the focus loss when the native picker loses focus', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<TimePicker useMobileNativeTimePicker value={''} onFocus={onFocus} onBlur={onBlur} />);

    const field = screen.getByTestId(TimePickerDataTids.input);
    const nativeInput = await screen.findByTestId(TimePickerDataTids.nativeInput);

    act(() => {
      field.focus();
    });
    act(() => {
      nativeInput.blur();
    });

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    // Следующий тап по полю снова открывает пикер и снова сообщает о фокусе.
    act(() => {
      field.focus();
    });

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(2);
    });
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('takes the focus away from the native picker through public blur', async () => {
    const ref = React.createRef<TimePickerRef>();
    const onBlur = vi.fn();

    render(<TimePicker ref={ref} useMobileNativeTimePicker value={''} onBlur={onBlur} />);

    const nativeInput = await screen.findByTestId(TimePickerDataTids.nativeInput);

    act(() => {
      screen.getByTestId(TimePickerDataTids.input).focus();
    });
    expect(nativeInput).toHaveFocus();

    act(() => {
      ref.current?.blur();
    });

    expect(nativeInput).not.toHaveFocus();
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  it('commits the value changed in the native picker before reporting the focus loss', async () => {
    const callbackOrder: string[] = [];
    const Controlled = () => {
      const [value, setValue] = React.useState('');

      return (
        <TimePicker
          useMobileNativeTimePicker
          value={value}
          onValueChange={(item) => {
            callbackOrder.push(`onValueChange(${item})`);
            setValue(item);
          }}
          onBlur={() => callbackOrder.push('onBlur')}
        />
      );
    };

    render(<Controlled />);

    const field = screen.getByTestId(TimePickerDataTids.input);
    const nativeInput = (await screen.findByTestId(TimePickerDataTids.nativeInput)) as HTMLInputElement;

    act(() => {
      field.focus();
    });
    fireEvent.change(nativeInput, { target: { value: '07:15' } });
    act(() => {
      nativeInput.blur();
    });

    await waitFor(() => {
      expect(callbackOrder).toEqual(['onValueChange(07:15)', 'onBlur']);
    });
    expect(field).toHaveTextContent('07:15');
  });
});
