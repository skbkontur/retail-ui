import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MASK_CHAR_EXEMPLAR } from '../../../internal/MaskCharLowLine';
import { InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { InternalDate } from '../../../lib/date/InternalDate';
import { InternalDateGetter } from '../../../lib/date/InternalDateGetter';
import { InternalDateConstructorProps, InternalDateSeparator } from '../../../lib/date/types';
import { defaultLangCode } from '../../../lib/locale/constants';
import { DatePicker, DatePickerDataTids, DatePickerProps } from '../DatePicker';
import { DatePickerLocaleHelper } from '../locale';
import { LangCodes, LocaleControls, LocaleContext } from '../../../lib/locale';

const handleChange = () => undefined;
const defaultProps = { value: '02.07.2017', width: 200, onValueChange: handleChange };

const renderDatePicker = (props: Partial<DatePickerProps<string>> = {}) =>
  render(<DatePicker {...defaultProps} {...props} />);

const renderDatePickerLocale = ({
  props = {},
  langCode = defaultLangCode,
  locale = {},
}: {
  props?: Partial<DatePickerProps<string>>;
  langCode?: LangCodes;
  locale?: LocaleControls;
} = {}) =>
  render(
    <LocaleContext.Provider value={{ langCode, locale }}>
      <DatePicker {...defaultProps} {...props} />
    </LocaleContext.Provider>,
  );

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
    renderDatePicker();
    expect(screen.getByTestId(DatePickerDataTids.label)).toBeInTheDocument();
  });

  it('renders date select when open', () => {
    renderDatePicker();
    fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.getByTestId('Calendar')).toBeInTheDocument();
  });

  it("doesn't open on focus if disabled", () => {
    renderDatePicker({
      disabled: true,
    });
    fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument();
  });

  it('closes when become disabled', () => {
    const { rerender } = renderDatePicker();
    fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.getByTestId('Calendar')).toBeInTheDocument();

    rerender(<DatePicker {...defaultProps} disabled />);
    expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument();
  });

  it('open when autoFocus enabled', () => {
    renderDatePicker({
      autoFocus: true,
    });
    expect(screen.getByTestId('Calendar')).toBeInTheDocument();
  });

  describe('Locale', () => {
    const getTextLoading = () => screen.getByTestId('Picker__todayWrapper');

    const getToday = (args: InternalDateConstructorProps) =>
      new InternalDate(args)
        .setComponents(InternalDateGetter.getTodayComponents())
        .toString({ withPad: true, withSeparator: true });

    it('render without LocaleProvider', () => {
      renderDatePicker({ enableTodayLink: true });
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render default locale', () => {
      renderDatePickerLocale({ props: { enableTodayLink: true } });
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render correct locale when set langCode', () => {
      renderDatePickerLocale({ props: { enableTodayLink: true }, langCode: LangCodes.en_GB });
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render custom locale', () => {
      renderDatePickerLocale({
        props: { enableTodayLink: true },
        langCode: LangCodes.en_GB,
        locale: { DatePicker: { separator: InternalDateSeparator.Dash } },
      });
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB, separator: InternalDateSeparator.Dash });

      fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('updates when langCode changes', () => {
      const { rerender } = renderDatePickerLocale({
        props: { enableTodayLink: true },
      });
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      rerender(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <DatePicker {...defaultProps} enableTodayLink />
        </LocaleContext.Provider>,
      );
      fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));
      fireEvent.focus(screen.getByTestId(DatePickerDataTids.input));

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
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
});
