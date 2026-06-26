import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('../../../lib/client.js', async () => {
  const actual = await vi.importActual('../../../lib/client.js');

  return {
    ...actual,
    isMobile: true,
    isIOS: false,
  };
});

import { TimePickerDataTids } from '../helpers/TimePicker.constants.js';
import type { TimePickerProps } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';

const ControlledTimePicker = (props: Omit<TimePickerProps, 'value' | 'onValueChange'>) => {
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

  it('opens native input instead of popup on click when items are passed', async () => {
    render(<TimePicker items={items} useMobileNativeTimePicker />);

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

  it('handles blur in mobile native mode without desktop cleanup', () => {
    const onBlur = vi.fn();

    render(<TimePicker useMobileNativeTimePicker value={'12:34'} onBlur={onBlur} />);

    fireEvent.blur(screen.getByRole('textbox'));

    expect(screen.getByRole('textbox')).toHaveTextContent('12:34');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
