import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarDataTids } from '../../../components/Calendar';
import { MASK_CHAR_EXEMPLAR } from '../../../internal/MaskCharLowLine';
import { InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { InternalDate } from '../../../lib/date/InternalDate';
import { InternalDateGetter } from '../../../lib/date/InternalDateGetter';
import { InternalDateConstructorProps, InternalDateSeparator } from '../../../lib/date/types';
import { defaultLangCode } from '../../../lib/locale/constants';
import { DatePicker, DatePickerDataTids } from '../DatePicker';
import { DatePickerLocaleHelper } from '../locale';
import { LangCodes, LocaleContext } from '../../../lib/locale';

describe('DatePicker', () => {
  describe('validate', () => {
    const { minDate, maxDate } = DatePicker.defaultProps;
    it(`should validate by default range ${minDate} - ${maxDate}`, () => {
      expect(DatePicker.validate(minDate)).toBe(true);
      expect(DatePicker.validate(maxDate)).toBe(true);
      expect(DatePicker.validate(new InternalDate({ value: minDate }).shiftYear(-1).toString())).toBe(false);
      expect(DatePicker.validate(new InternalDate({ value: maxDate }).shiftYear(1).toString())).toBe(false);
    });
    it('should validate by limits', () => {
      expect(DatePicker.validate('00.00.1900', { minDate: '01.01.1800' })).toBe(false);
      expect(DatePicker.validate('99.99.2018', { maxDate: '01.01.2019' })).toBe(false);
    });
    it('should validate by number', () => {
      expect(DatePicker.validate('01.ff.2019')).toBe(false);
    });
  });

  it('renders', () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} />);

    expect(screen.getByTestId(DatePickerDataTids.label)).toBeInTheDocument();
  });

  it('renders date select when open', () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} />);

    userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it("doesn't open on focus if disabled", () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} disabled />);

    userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument();
  });

  it('closes when become disabled', () => {
    const { rerender } = render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} />);

    userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    rerender(<DatePicker value="02.07.2017" onValueChange={jest.fn()} disabled />);

    expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument();
  });

  it('open when autoFocus enabled', () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} autoFocus />);

    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  describe('Locale', () => {
    const getToday = (args: InternalDateConstructorProps) =>
      new InternalDate(args)
        .setComponents(InternalDateGetter.getTodayComponents())
        .toString({ withPad: true, withSeparator: true });

    it('render without LocaleProvider', () => {
      render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />);

      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByTestId('Picker__todayWrapper')).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render default locale', () => {
      render(
        <LocaleContext.Provider value={{ locale: {}, langCode: defaultLangCode }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByTestId('Picker__todayWrapper')).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render correct locale when set langCode', () => {
      render(
        <LocaleContext.Provider value={{ locale: {}, langCode: LangCodes.en_GB }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByTestId('Picker__todayWrapper')).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render custom locale', () => {
      render(
        <LocaleContext.Provider
          value={{ locale: { DatePicker: { separator: InternalDateSeparator.Dash } }, langCode: LangCodes.en_GB }}
        >
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB, separator: InternalDateSeparator.Dash });

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByTestId('Picker__todayWrapper')).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('updates when langCode changes', () => {
      const { rerender } = render(
        <LocaleContext.Provider value={{ locale: {}, langCode: defaultLangCode }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      rerender(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByTestId('Picker__todayWrapper')).toHaveTextContent(`${expectedText} ${today}`);
    });
  });

  it.each(['', null, undefined])('should clear the value when %s passed', (testValue) => {
    const Comp = () => {
      const [value, setValue] = useState<string | null | undefined>('24.08.2022');

      return (
        <>
          <DatePicker value={value} onValueChange={setValue} />
          <button onClick={() => setValue(testValue)}>Clear</button>
        </>
      );
    };

    render(<Comp />);

    const input = screen.getByTestId(InputLikeTextDataTids.input);
    expect(input).toHaveTextContent(/^24.08.2022$/);

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    const expected = 'ss.ss.ssss'.replace(/s/g, MASK_CHAR_EXEMPLAR);
    const expectedRegExp = new RegExp(`^${expected}$`);
    expect(input).toHaveTextContent(expectedRegExp, { normalizeWhitespace: false });

    userEvent.type(input, '24.08.2022');
    expect(input).toHaveTextContent(/^24.08.2022$/);
  });

  it('should have disabled input', () => {
    render(<DatePicker onValueChange={jest.fn()} disabled />);

    expect(screen.getByTestId(InputLikeTextDataTids.nativeInput)).toBeDisabled();
  });
});
