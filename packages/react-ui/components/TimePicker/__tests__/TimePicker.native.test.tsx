import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

vi.mock('../../../lib/client.js', async () => {
  const actual = await vi.importActual('../../../lib/client.js');

  return {
    ...actual,
    isIOS: false,
  };
});

import { TimePickerDataTids } from '../helpers/TimePicker.constants.js';
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

const items = [{ value: '09:00' }, { value: '10:00' }];

describe('<TimePicker /> native mobile mode', () => {
  it('renders native time input with format-specific attributes', async () => {
    render(
      <ControlledTimePicker useMobileNativeTimePicker format={'HH:mm:ss'} minTime={'09:15'} maxTime={'18:45:30'} />,
    );

    const nativeInput = await screen.findByTestId(TimePickerDataTids.nativeInput);

    expect(nativeInput).toHaveAttribute('type', 'time');
    expect(nativeInput).toHaveAttribute('step', '1');
    expect(nativeInput).toHaveAttribute('min', '09:15:00');
    expect(nativeInput).toHaveAttribute('max', '18:45:30');
  });

  it('updates visible value from native time input change', async () => {
    render(<ControlledTimePicker useMobileNativeTimePicker format={'HH:mm:ss'} />);

    const nativeInput = (await screen.findByTestId(TimePickerDataTids.nativeInput)) as HTMLInputElement;

    fireEvent.change(nativeInput, { target: { value: '12:34:56' } });

    expect(screen.getByRole('textbox')).toHaveTextContent('12:34:56');
  });

  it('opens native input instead of popup on click when source is passed', async () => {
    render(<TimePicker source={items} useMobileNativeTimePicker />);

    const input = screen.getByRole('textbox');
    const nativeInput = (await screen.findByTestId(TimePickerDataTids.nativeInput)) as HTMLInputElement;
    const clickSpy = vi.spyOn(nativeInput, 'click');

    try {
      fireEvent.click(input);

      expect(clickSpy).toHaveBeenCalled();
      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
    } finally {
      clickSpy.mockRestore();
    }
  });

  it('opens the native picker instead of the dropdown through public ref', async () => {
    const ref = React.createRef<TimePickerRef>();
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => undefined);

    try {
      render(<TimePicker ref={ref} useMobileNativeTimePicker source={items} value={''} />);

      await screen.findByTestId(TimePickerDataTids.nativeInput);

      act(() => {
        ref.current?.open();
      });

      expect(clickSpy).toHaveBeenCalled();
      expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
      expect(screen.getByTestId(TimePickerDataTids.input)).not.toHaveAttribute('aria-expanded');
      expect(screen.getByTestId(TimePickerDataTids.input)).not.toHaveAttribute('aria-controls');
    } finally {
      clickSpy.mockRestore();
    }
  });

  it('handles blur in mobile native mode without desktop cleanup', async () => {
    const onBlur = vi.fn();

    render(<TimePicker useMobileNativeTimePicker value={'12:34'} onBlur={onBlur} />);

    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.blur(screen.getByRole('textbox'));

    expect(screen.getByRole('textbox')).toHaveTextContent('12:34');
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  it('commits the value typed in the desktop version when the layout becomes mobile', async () => {
    mobileLayout.setMobileLayout(false);

    const onValueChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('');

      return (
        <TimePicker
          useMobileNativeTimePicker
          value={value}
          onValueChange={(time) => {
            onValueChange(time);
            setValue(time);
          }}
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

    mobileLayout.setMobileLayout(true);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1);
    });
    expect(onValueChange).toHaveBeenLastCalledWith('10:30');
    expect(input).toHaveTextContent('10:30');
  });

  it('replaces the opened dropdown with the native picker when the layout becomes mobile', async () => {
    mobileLayout.setMobileLayout(false);

    render(<ControlledTimePicker source={items} useMobileNativeTimePicker />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(TimePickerDataTids.popup)).toBeInTheDocument();
    expect(screen.queryByTestId(TimePickerDataTids.nativeInput)).not.toBeInTheDocument();

    mobileLayout.setMobileLayout(true);

    await waitFor(() => {
      expect(screen.getByTestId(TimePickerDataTids.nativeInput)).toBeInTheDocument();
    });
    expect(screen.queryByTestId(TimePickerDataTids.popup)).not.toBeInTheDocument();
  });
});
