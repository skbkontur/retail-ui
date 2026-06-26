import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { InputLikeText } from '../../../internal/InputLikeText/index.js';
import { MobilePopupDataTids } from '../../../internal/MobilePopup/index.js';
import { LangCodes, LocaleContext } from '../../../lib/locale/index.js';

vi.mock('../../../lib/client.js', async () => {
  const actual = await vi.importActual('../../../lib/client.js');

  return {
    ...actual,
    isMobile: true,
    isIOS: false,
  };
});

import { TIME_PLACEHOLDER_CHAR, TIME_SEPARATOR, TimePickerDataTids } from '../helpers/TimePicker.constants.js';
import type { TimePickerProps, TimePickerRef } from '../TimePicker.js';
import { TimePicker } from '../TimePicker.js';

const ControlledTimePicker = (props: Omit<TimePickerProps, 'value' | 'onValueChange'>) => {
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

describe('<TimePicker /> mobile items mode', () => {
  it('uses localized aria-placeholder in mobile popup input', async () => {
    render(
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <ControlledTimePicker items={items} format={'HH:mm:ss'} />
      </LocaleContext.Provider>,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(TimePickerDataTids.mobileInput)).toHaveAttribute('aria-placeholder', 'hh:mm:ss');
  });

  it('opens mobile popup when items are passed on mobile devices', async () => {
    render(<ControlledTimePicker items={items} />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(MobilePopupDataTids.root)).toBeInTheDocument();
    expect(screen.getByTestId(TimePickerDataTids.mobilePopup)).toBeInTheDocument();
    expect(screen.getByTestId(TimePickerDataTids.mobileInput)).toBeInTheDocument();
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

  it('allows editing value through mobile input in popup header', async () => {
    render(<ControlledTimePicker items={items} />);

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

  it('keeps popup header input stretched to full width', async () => {
    render(<ControlledTimePicker items={items} />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(TimePickerDataTids.mobileInput)).toHaveStyle({ width: '100%' });
  });

  it('selects item from mobile popup and closes it', async () => {
    render(<ControlledTimePicker items={items} />);

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
        items={[{ value: '07:00' }, { value: '09:00' }, { value: '19:00' }]}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(await screen.findByText('07:00'));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByTestId(MobilePopupDataTids.root)).toBeInTheDocument();
  });

  it('commits pending value when closing mobile popup by backdrop', async () => {
    render(<ControlledTimePicker items={items} />);

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
  });

  it('supports close through public ref in mobile items mode', async () => {
    const ref = React.createRef<TimePickerRef>();

    render(<TimePicker ref={ref} items={items} value={''} onValueChange={vi.fn()} />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(await screen.findByTestId(MobilePopupDataTids.root)).toBeInTheDocument();

    act(() => {
      ref.current?.close();
    });

    await waitFor(() => {
      expect(screen.queryByTestId(MobilePopupDataTids.root)).not.toBeInTheDocument();
    });
  });

  it('calls onFocus only once when mobile popup opens', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<ControlledTimePicker items={items} onFocus={onFocus} onBlur={onBlur} />);

    fireEvent.click(screen.getByRole('textbox'));

    await screen.findByTestId(TimePickerDataTids.mobileInput);

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    expect(onBlur).not.toHaveBeenCalled();
  });

  it('calls onBlur only once for popup input blur after mobile popup opens', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<ControlledTimePicker items={items} onFocus={onFocus} onBlur={onBlur} />);

    fireEvent.click(screen.getByRole('textbox'));

    const mobileInput = await screen.findByTestId(TimePickerDataTids.mobileInput);

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    fireEvent.blur(mobileInput);

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });
});
