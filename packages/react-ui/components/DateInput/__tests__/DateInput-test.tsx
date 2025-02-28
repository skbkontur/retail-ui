import React from 'react';
import { fireEvent, render as renderRTL, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { MASK_CHAR_EXEMPLAR } from '../../../internal/MaskCharLowLine';
import type { DefaultizeProps } from '../../../lib/utils';
import { delay } from '../../../lib/utils';
import { InternalDateOrder } from '../../../lib/date/types';
import type { DateInputProps } from '../DateInput';
import { DateInput, DateInputDataTids } from '../DateInput';
import type { LocaleContextProps } from '../../../lib/locale';
import { LocaleContext } from '../../../lib/locale';

type InitialDate = string;
type PressedKeys = string[];
type ChangedDate = string;
type KeyDownCase = [InitialDate, PressedKeys, ChangedDate?];

interface LocaleDateInputProps {
  propsDateInput: DefaultizeProps<typeof DateInput, DateInputProps>;
  propsLocale: LocaleContextProps;
}
const LocaleDateInput: React.FunctionComponent<LocaleDateInputProps> = ({ propsDateInput, propsLocale }) => (
  <LocaleContext.Provider
    value={{
      langCode: propsLocale.langCode,
      locale: propsLocale.locale,
    }}
  >
    <DateInput {...propsDateInput} />
  </LocaleContext.Provider>
);

const render = (
  propsDateInput: DefaultizeProps<typeof DateInput, DateInputProps>,
  propsLocale: LocaleContextProps = {},
) => renderRTL(<LocaleDateInput {...{ propsDateInput, propsLocale }} />);

const getInput = () => screen.getByTestId(InputLikeTextDataTids.input);

describe('DateInput as InputlikeText', () => {
  it('has id attribute', () => {
    const dateInputId = 'dateInputId';
    const result = render({ id: dateInputId, value: '10.02.2017' });
    expect(result.container.querySelector(`#${dateInputId}`)).not.toBeNull();
  });

  describe('without min/max date', () => {
    it('renders', () => {
      expect(() => render({ value: '10.02.2017' })).not.toThrow();
    });

    it('renders with given valid value', () => {
      render({ value: '10.02.2017' });
      const input = getInput();
      expect(input).toHaveTextContent('10.02.2017');
    });

    it('updates when value changes', () => {
      const { rerender } = renderRTL(<LocaleDateInput propsDateInput={{ value: '10.02.2017' }} propsLocale={{}} />);

      rerender(<LocaleDateInput propsDateInput={{ value: '11.02.2017' }} propsLocale={{}} />);
      const input = getInput();

      expect(input).toHaveTextContent('11.02.2017');
    });

    it('handles invalid date strings', () => {
      const { rerender } = renderRTL(<LocaleDateInput propsDateInput={{ value: '10.02.2017' }} propsLocale={{}} />);

      rerender(<LocaleDateInput propsDateInput={{ value: '99.9' }} propsLocale={{}} />);
      const input = getInput();

      expect(input.textContent).toBe(`99.09.${MASK_CHAR_EXEMPLAR.repeat(4)}`);
    });

    const KeyDownCases: KeyDownCase[] = [
      // [initial date, [...keys], expected date]

      // Date
      ['10.02.2017', ['ArrowUp'], '11.02.2017'],
      ['31.02.2017', ['ArrowUp'], '01.02.2017'],
      ['10.02.2017', ['ArrowDown'], '09.02.2017'],
      ['01.02.2017', ['ArrowDown'], '28.02.2017'],
      ['01.02.2017', ['1', '1'], '11.02.2017'],
      ['01.02.2017', ['1', '2'], '12.02.2017'],
      ['01.02.2017', ['4'], '04.02.2017'],
      ['01.02.2017', ['0'], '00.02.2017'],
      ['01.02.2017', ['0', '2'], '02.02.2017'],
      ['01.02.2017', ['3', '3'], '03.03.2017'],
      ['30.04.2017', ['ArrowUp'], '01.04.2017'],

      // Month
      ['10.02.2017', ['ArrowRight', 'ArrowUp'], '10.03.2017'],
      ['10.12.2017', ['ArrowRight', 'ArrowUp'], '10.01.2017'],
      ['10.02.2017', ['ArrowRight', 'ArrowDown'], '10.01.2017'],
      ['10.01.2017', ['ArrowRight', 'ArrowDown'], '10.12.2017'],
      ['01.02.2017', ['ArrowRight', '1'], '01.01.2017'],
      ['01.02.2017', ['ArrowRight', '1', '2'], '01.12.2017'],
      ['01.02.2017', ['ArrowRight', '4'], '01.04.2017'],
      ['01.02.2017', ['ArrowRight', '0'], '01.00.2017'],
      ['01.02.2017', ['ArrowRight', '0', '3'], '01.03.2017'],

      // Year
      ['10.02.2017', ['ArrowRight', 'ArrowRight', 'ArrowUp'], '10.02.2018'],
      ['10.02.9999', ['ArrowRight', 'ArrowRight', 'ArrowUp'], '31.12.2099'],
      ['10.02.2017', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.02.2016'],
      ['10.02.0000', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '01.01.1900'],
      ['01.02.2017', ['ArrowRight', 'ArrowRight', '1'], '01.02.0001'],
      ['01.02.2017', ['ArrowRight', 'ArrowRight', '1', '2'], '01.02.0012'],
      ['01.02.2017', ['ArrowRight', 'ArrowRight', '1', '2', '3', '4'], '01.02.1234'],
      ['01.02.2017', ['ArrowRight', 'ArrowRight', '1', '2', '3', '4', '5'], '01.02.0005'],

      // Full Date
      ['01.02.2017', ['1', '2', '1', '2', '2', '0', '1', '2'], '12.12.2012'],
      ['', ['1', '2', '1', '2', '2', '0', '1', '2'], '12.12.2012'],
      ['', ['5', '5', '2', '0', '1', '8'], '05.05.2018'],

      // Separator
      ['', ['1', '.', '1', '/', '2', '0', '1', '9'], '01.01.2019'],
      ['21.12.2012', ['-', '1', '.', '2', '0', '1', '9'], '21.01.2019'],
      ['21.12.2012', ['1', ' ', '6', '2', '0', '1', '9'], '01.06.2019'],
    ];

    KeyDownCases.forEach(([initDate, keys, expected]) => {
      const keyString = keys.join(' > ');
      const expectedDateStr = `"${expected}"`.padEnd(12, ' ');
      it(`calls onValueChange with ${expectedDateStr} if value is "${initDate}" and pressed "${keyString}"`, async () => {
        const onValueChange = jest.fn();
        render({ value: initDate, onValueChange });
        const input = getInput();
        await userEvent.click(input);

        keys.forEach((key) => fireEvent.keyDown(input, { key }));

        const [value] = onValueChange.mock.calls[onValueChange.mock.calls.length - 1];
        expect(value).toBe(expected);
      });
    });

    const PasteCases = [
      [InternalDateOrder.DMY, '23.02.2017', '23.02.2017'],
      [InternalDateOrder.DMY, '23/02/2017', '23.02.2017'],
      [InternalDateOrder.DMY, '23-02-2017', '23.02.2017'],
      [InternalDateOrder.DMY, '23 02 2017', '23.02.2017'],

      [InternalDateOrder.YMD, '2017.02.23', '23.02.2017'],
      [InternalDateOrder.YMD, '2017/02/23', '23.02.2017'],
      [InternalDateOrder.YMD, '2017-02-23', '23.02.2017'],
      [InternalDateOrder.YMD, '2017 02 23', '23.02.2017'],

      [InternalDateOrder.MDY, '02.23.2017', '23.02.2017'],
      [InternalDateOrder.MDY, '02/23/2017', '23.02.2017'],
      [InternalDateOrder.MDY, '02-23-2017', '23.02.2017'],
      [InternalDateOrder.MDY, '02 23 2017', '23.02.2017'],

      [InternalDateOrder.DMY, '23 2 17', '23.02.2017'],
      [InternalDateOrder.MDY, '2.23 17', '23.02.2017'],
      [InternalDateOrder.YMD, '17/2-23', '23.02.2017'],
    ];

    PasteCases.forEach(([order, pasted, expected]) => {
      it(`handles paste "${pasted}"`, () => {
        const onValueChange = jest.fn();
        render(
          { onValueChange },
          {
            locale: { DatePicker: { order: order as InternalDateOrder } },
          },
        );

        const input = getInput();
        fireEvent.paste(input, { clipboardData: { getData: () => pasted } });
        const [value] = onValueChange.mock.calls[0];
        expect(value).toBe(expected);
      });
    });
  });

  describe('with min/max date', () => {
    const minDate = '05.02.2017';

    const maxDate = '12.09.2019';

    const KeyDownCases: KeyDownCase[] = [
      // Date
      ['12.09.2019', ['ArrowUp']],
      ['31.02.2017', ['ArrowUp']],
      ['05.02.2017', ['ArrowDown']],

      // Month
      ['07.12.2017', ['ArrowRight', 'ArrowUp']],
      ['07.09.2019', ['ArrowRight', 'ArrowUp']],
      ['22.08.2019', ['ArrowRight', 'ArrowUp']],
      ['04.03.2017', ['ArrowRight', 'ArrowDown']],

      // Year
      ['10.09.2019', ['ArrowRight', 'ArrowRight', 'ArrowUp']],
      ['10.12.2017', ['ArrowRight', 'ArrowRight', 'ArrowDown']],
      ['10.12.2018', ['ArrowRight', 'ArrowRight', 'ArrowUp']],
    ];

    KeyDownCases.forEach(([initDate, keys]) => {
      const keyString = keys.join(' > ');

      it(`does not call onValueChange if value is "${initDate}", minDate is "${minDate}", maxDate is "${maxDate}" and pressed "${keyString}"`, async () => {
        const onValueChange = jest.fn();
        render({ value: initDate, onValueChange, minDate, maxDate });
        const input = getInput();
        await userEvent.click(input);
        keys.forEach((key) => fireEvent.keyDown(input, { key }));

        expect(onValueChange).not.toHaveBeenCalled();
      });
    });

    const KeyDownCasesWithExpected: KeyDownCase[] = [
      // Date
      ['31.03.2017', ['ArrowUp'], '01.03.2017'],
      ['01.03.2017', ['ArrowDown'], '31.03.2017'],

      // Month
      ['07.12.2018', ['ArrowRight', 'ArrowUp'], '07.01.2018'],
      ['07.01.2018', ['ArrowRight', 'ArrowDown'], '07.12.2018'],

      // Year
      ['10.12.2018', ['ArrowRight', 'ArrowRight', 'ArrowDown'], '10.12.2017'],
    ];

    KeyDownCasesWithExpected.forEach(([initDate, keys, expected]) => {
      const keyString = keys.join(' > ');
      const expectedDateStr = 'calls onValueChange with ' + `"${expected}"`.padEnd(12, ' ');

      it(`${expectedDateStr} if value is "${initDate}", minDate is "${minDate}", maxDate is "${maxDate}" and pressed "${keyString}"`, async () => {
        const onValueChange = jest.fn();
        render({ value: initDate, onValueChange, minDate, maxDate });
        const input = getInput();
        await userEvent.click(input);
        keys.forEach((key) => fireEvent.keyDown(input, { key }));
        const [value] = onValueChange.mock.calls[0];

        expect(value).toBe(expected);
      });
    });
  });

  it('should have disabled input', () => {
    renderRTL(<DateInput disabled />);

    expect(screen.getByTestId(InputLikeTextDataTids.nativeInput)).toBeDisabled();
  });

  it('should handle keydown event', () => {
    const onKeyDown = jest.fn();
    renderRTL(<DateInput onKeyDown={onKeyDown} />);

    fireEvent.keyDown(getInput(), 'a');

    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should handle onFocus event', async () => {
    const onFocus = jest.fn();
    renderRTL(<DateInput onFocus={onFocus} />);

    await userEvent.click(getInput());

    expect(onFocus).toHaveBeenCalled();
  });

  it('should handle onBlur event', async () => {
    const onBlur = jest.fn();
    renderRTL(<DateInput onBlur={onBlur} />);
    await userEvent.tab();
    expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByTestId(InputLikeTextDataTids.root)).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle double click', async () => {
    const inputLikeTextRef = React.createRef<DateInput>();
    const value = '27.04.1988';

    renderRTL(<DateInput value={value} ref={inputLikeTextRef} />);
    const input = getInput();
    await userEvent.dblClick(input);
    expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveFocus();
    await delay(0);
    expect(getSelection()?.toString()).toBe(value);
  });

  const textContentWithMaskChars = `${MASK_CHAR_EXEMPLAR.repeat(2)}.${MASK_CHAR_EXEMPLAR.repeat(
    2,
  )}.${MASK_CHAR_EXEMPLAR.repeat(4)}`;

  it('should clear selected text in the input after pressing delete button', async () => {
    renderRTL(<DateInput value="27.04.1988" />);
    const input = getInput();
    await userEvent.dblClick(input);
    await userEvent.keyboard('{delete}');

    expect(input.textContent).toBe(textContentWithMaskChars);
  });

  it('should clear selected text in the input after pressing backspace button', async () => {
    renderRTL(<DateInput value="27.04.1988" />);
    const input = getInput();
    await userEvent.dblClick(input);
    await userEvent.keyboard('{backspace}');

    expect(input.textContent).toBe(textContentWithMaskChars);
  });

  it('should delete one char in DD by default after focus on element', async () => {
    renderRTL(<DateInput value="27.04.1988" />);
    const input = getInput();
    await userEvent.type(input, '{backspace}');

    expect(input.textContent).toBe(`2${MASK_CHAR_EXEMPLAR.repeat(1)}.04.1988`);
  });

  it('should focus by method', () => {
    const inputLikeTextRef = React.createRef<DateInput>();
    renderRTL(<DateInput ref={inputLikeTextRef} />);

    expect(screen.getByTestId(InputLikeTextDataTids.root)).not.toHaveFocus();

    inputLikeTextRef.current?.focus();
    expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveFocus();
  });

  it('should blur by method', () => {
    const inputLikeTextRef = React.createRef<DateInput>();
    renderRTL(<DateInput ref={inputLikeTextRef} />);
    inputLikeTextRef.current?.focus();
    expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveFocus();

    inputLikeTextRef.current?.blur();
    expect(screen.getByTestId(InputLikeTextDataTids.root)).not.toHaveFocus();
  });

  it('blink method works', async () => {
    const blinkMock = jest.fn();
    const inputLikeTextRef = React.createRef<DateInput>();
    renderRTL(<DateInput ref={inputLikeTextRef} />);

    if (inputLikeTextRef.current) {
      inputLikeTextRef.current.blink = blinkMock;
    }
    await userEvent.type(getInput(), '{enter}');

    expect(blinkMock).toHaveBeenCalledTimes(1);
  });

  it('should focus if autoFocus prop passed', () => {
    renderRTL(<DateInput autoFocus />);

    expect(screen.getByTestId(InputLikeTextDataTids.root)).toHaveFocus();
  });

  it('should render with icon', () => {
    renderRTL(<DateInput withIcon />);

    expect(screen.getByTestId(DateInputDataTids.icon)).toBeInTheDocument();
  });

  it('should not select date fragments in disabled state', async () => {
    const value = '24.08.2022';
    const dateFragment = value.slice(0, 2);
    renderRTL(<DateInput value={value} disabled />);
    await userEvent.click(screen.getByText(dateFragment));
    await delay(0);
    expect(getSelection()?.toString()).toBe('');
  });
});

describe('a11y', () => {
  it('passes correct value to `aria-describedby` attribute', () => {
    const id = 'elementId';
    const description = 'The caption that describes DateInput';
    renderRTL(
      <>
        <DateInput aria-describedby={id} />
        <p id={id}>{description}</p>
      </>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', id);
    expect(input).toHaveAccessibleDescription(description);
  });

  it('passes correct value to `aria-label` attribute', async () => {
    const label = 'Label for DateInput';
    renderRTL(<DateInput aria-label={label} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', label);
  });

  it('passes correct value to `aria-labelledby` attribute', async () => {
    const id = 'elementId';
    renderRTL(<DateInput aria-labelledby={id} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-labelledby', id);
  });
});
