import React, { useState } from 'react';
// import { mount, ReactWrapper } from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MASK_CHAR_EXEMPLAR } from '../../../internal/MaskCharLowLine';
import { InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { InternalDate } from '../../../lib/date/InternalDate';
import { InternalDateGetter } from '../../../lib/date/InternalDateGetter';
import { InternalDateConstructorProps, InternalDateSeparator } from '../../../lib/date/types';
import { Calendar, CalendarDataTids } from '../../../internal/Calendar';
import { DateSelect, DateSelectDataTids } from '../../../internal/DateSelect';
import { DropdownContainer } from '../../../internal/DropdownContainer';
import { defaultLangCode } from '../../../lib/locale/constants';
import { DatePicker, DatePickerDataTids, DatePickerProps } from '../DatePicker';
import { DatePickerLocaleHelper } from '../locale';
import { LangCodes, LocaleControls, LocaleContext } from '../../../lib/locale';

const handleChange = () => undefined;
const renderDatePicker = (props: Partial<DatePickerProps> = {}) =>
  render(<DatePicker onValueChange={handleChange} value="02.07.2017" {...props} />);
const renderDatePickerLocale = ({
  props = {},
  langCode = defaultLangCode,
  locale = {},
}: {
  props?: Partial<DatePickerProps>;
  langCode?: LangCodes;
  locale?: LocaleControls;
} = {}) =>
  render(
    <LocaleContext.Provider value={{ langCode, locale }}>
      <DatePicker onValueChange={handleChange} value="02.07.2017" {...props} />
    </LocaleContext.Provider>,
  );
const refDatePicker = React.createRef<DatePicker>();

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
    render(<DatePicker onValueChange={handleChange} value="02.07.2017" />);
    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    expect(screen.getByTestId(DatePickerDataTids.pickerRoot)).toBeInTheDocument();
  });

  it('renders date select when open', () => {
    renderDatePicker();
    userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
    const dateSelect = datePicker.find('DateSelect');
    expect(dateSelect.exists()).toBe(true);
  });

  it('correctly passes max and min date to year select', () => {
    const datePicker = renderDatePicker({
      minDate: '21.03.2017',
      maxDate: '15.08.2020',
    });
    datePicker.setState({ opened: true });
    const yearSelect = datePicker.find(DateSelect).findWhere((node) => node.props().type === 'year');
    expect(yearSelect.prop('minValue')).toBe(2017);
    expect(yearSelect.prop('maxValue')).toBe(2020);
  });

  it('correctly initial month/year with min date', () => {
    const datePicker = renderDatePicker({
      minDate: '21.01.2099',
    });

    datePicker.setState({ opened: true });

    const calendar = datePicker.find(Calendar);

    expect(calendar.prop('initialMonth')).toBe(6);
    expect(calendar.prop('initialYear')).toBe(2017);
  });

  it('correctly initial month/year with max date', () => {
    const datePicker = renderDatePicker({
      maxDate: '15.11.1959',
    });

    datePicker.setState({ opened: true });

    const calendar = datePicker.find(Calendar);

    expect(calendar.prop('initialMonth')).toBe(6);
    expect(calendar.prop('initialYear')).toBe(2017);
  });

  it("doesn't open on focus if disabled", () => {
    render(<DatePicker onValueChange={handleChange} value="02.07.2017" ref={refDatePicker} disabled />)

    refDatePicker.current?.focus();
    expect(screen.queryByTestId(DatePickerDataTids.pickerRoot)).not.toBeInTheDocument();
  });

  it('closes when become disabled', () => {
    const { rerender } = render(<DatePicker onValueChange={handleChange} value="02.07.2017" ref={refDatePicker} />);

    refDatePicker.current?.focus();
    expect(screen.getByTestId(DatePickerDataTids.pickerRoot)).toBeInTheDocument();

    rerender(<DatePicker onValueChange={handleChange} value="02.07.2017" ref={refDatePicker} disabled />)
    expect(screen.queryByTestId(DatePickerDataTids.pickerRoot)).not.toBeInTheDocument();
  });

  it('open when autoFocus enabled', () => {
    renderDatePicker({
      autoFocus: true,
    });
    expect(screen.getByTestId(DatePickerDataTids.pickerRoot)).toBeInTheDocument();
  });

  describe('Locale', () => {
    const getTextLoading = (): string => {
      return screen.getByTestId(DatePickerDataTids.pickerTodayWrapper)?.textContent ?? "";
    };
    const getToday = (args: InternalDateConstructorProps) =>
      new InternalDate(args)
        .setComponents(InternalDateGetter.getTodayComponents())
        .toString({ withPad: true, withSeparator: true });

    it('render without LocaleProvider', () => {
      renderDatePicker({ enableTodayLink: true });

      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      expect(getTextLoading()).toBe(`${expectedText} ${today}`);
    });

    it('render default locale', () => {
      renderDatePickerLocale({ props: { enableTodayLink: true } });

      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));
      expect(getTextLoading()).toBe(`${expectedText} ${today}`);
    });

    it('render correct locale when set langCode', () => {
      renderDatePickerLocale({ props: { enableTodayLink: true }, langCode: LangCodes.en_GB });

      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });
      userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

      expect(getTextLoading()).toBe(`${expectedText} ${today}`);
    });

    it('render custom locale', () => {
      renderDatePickerLocale({
        props: { enableTodayLink: true },
        langCode: LangCodes.en_GB,
        locale: { DatePicker: { separator: InternalDateSeparator.Dash } },
      });
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB, separator: InternalDateSeparator.Dash });
      userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

      expect(getTextLoading()).toBe(`${expectedText} ${today}`);
    });

    it('updates when langCode changes', () => {
      const { rerender } = render(
        <LocaleContext.Provider value={{ langCode: defaultLangCode, locale: {} }}>
          <DatePicker onValueChange={handleChange} value="02.07.2017" enableTodayLink />
        </LocaleContext.Provider>);

      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      rerender(<LocaleContext.Provider value={{ langCode: LangCodes.en_GB, locale: {} }}>
        <DatePicker onValueChange={handleChange} value="02.07.2017" enableTodayLink />
      </LocaleContext.Provider>);

      userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

      expect(getTextLoading()).toBe(`${expectedText} ${today}`);
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
