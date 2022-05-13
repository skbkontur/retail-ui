import React from 'react';
import { render, screen } from '@testing-library/react';

import { InternalDate } from '../../../lib/date/InternalDate';
import { InternalDateGetter } from '../../../lib/date/InternalDateGetter';
import { InternalDateConstructorProps, InternalDateSeparator } from '../../../lib/date/types';
import { defaultLangCode } from '../../../lib/locale/constants';
import { DatePicker, DatePickerProps } from '../DatePicker';
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
    <LocaleContext.Provider value={{ langCode: langCode, locale: locale }}>
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
    expect(screen.getByTestId('DatePicker')).toBeInTheDocument();
  });

  it('renders date select when open', () => {
    renderDatePicker();
    screen.getByTestId('DatePicker__input').focus();
    expect(screen.getByTestId('Calendar')).toBeInTheDocument();
  });

  it("doesn't open on focus if disabled", () => {
    renderDatePicker({
      disabled: true,
    });
    screen.getByTestId('DatePicker__input').focus();
    expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument();
  });

  it('closes when become disabled', () => {
    const { rerender } = renderDatePicker();
    screen.getByTestId('DatePicker__input').focus();
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

      screen.getByTestId('DatePicker__input').focus();

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render default locale', () => {
      renderDatePickerLocale({ props: { enableTodayLink: true } });
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      screen.getByTestId('DatePicker__input').focus();

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
    });

    it('render correct locale when set langCode', () => {
      renderDatePickerLocale({ props: { enableTodayLink: true }, langCode: LangCodes.en_GB });
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      screen.getByTestId('DatePicker__input').focus();

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

      screen.getByTestId('DatePicker__input').focus();

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
      screen.getByTestId('DatePicker__input').focus();
      screen.getByTestId('DatePicker__input').focus();

      expect(getTextLoading()).toHaveTextContent(`${expectedText} ${today}`);
    });
  });
});
