import { mount, ReactWrapper } from 'enzyme';
import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { InternalDate } from '../../../lib/date/InternalDate';
import { InternalDateGetter } from '../../../lib/date/InternalDateGetter';
import { InternalDateConstructorProps, InternalDateSeparator } from '../../../lib/date/types';
import { Calendar } from '../../../internal/Calendar';
import { DateSelect } from '../../../internal/DateSelect';
import { DropdownContainer } from '../../../internal/DropdownContainer';
import { defaultLangCode } from '../../../lib/locale/constants';
import { DatePicker, DatePickerProps } from '../DatePicker';
import { DatePickerLocaleHelper } from '../locale';
import { LangCodes, LocaleControls, LocaleContext } from '../../../lib/locale';

const handleChange = () => undefined;
const renderDatePicker = (props: Partial<DatePickerProps<string>> = {}) =>
  mount<DatePicker>(<DatePicker onValueChange={handleChange} value="02.07.2017" {...props} />);
const renderDatePickerLocale = ({
  props = {},
  langCode = defaultLangCode,
  locale = {},
}: {
  props?: Partial<DatePickerProps<string>>;
  langCode?: LangCodes;
  locale?: LocaleControls;
} = {}) =>
  mount(
    <LocaleContext.Provider value={{ langCode, locale }}>
      <DatePicker onValueChange={handleChange} value="02.07.2017" {...props} />
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
    const datePicker = renderDatePicker();
    expect(datePicker.exists()).toBe(true);
  });

  it('renders date select when open', () => {
    const datePicker = renderDatePicker();
    datePicker.setState({ opened: true });
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
    const datePicker = renderDatePicker({
      disabled: true,
    });
    datePicker.instance().focus();
    datePicker.update();
    expect(datePicker.find(DropdownContainer)).toHaveLength(0);
  });

  it('closes when become disabled', () => {
    const datePicker = renderDatePicker();
    datePicker.instance().focus();
    datePicker.setProps({ disabled: true });
    datePicker.update();
    expect(datePicker.find(DropdownContainer)).toHaveLength(0);
  });

  it('open when autoFocus enabled', () => {
    const datePicker = renderDatePicker({
      autoFocus: true,
    });
    expect(datePicker.find(DropdownContainer)).toHaveLength(1);
  });

  describe('Locale', () => {
    const getTextLoading = (wrapper: ReactWrapper<any>): string => {
      return wrapper.find(`[data-tid='Picker__todayWrapper']`).text();
    };
    const getToday = (args: InternalDateConstructorProps) =>
      new InternalDate(args)
        .setComponents(InternalDateGetter.getTodayComponents())
        .toString({ withPad: true, withSeparator: true });

    it('render without LocaleProvider', () => {
      const datePicker = renderDatePicker({ enableTodayLink: true });
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      datePicker.setState({ opened: true });
      datePicker.update();

      expect(getTextLoading(datePicker)).toBe(`${expectedText} ${today}`);
    });

    it('render default locale', () => {
      const wrapper = renderDatePickerLocale({ props: { enableTodayLink: true } });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;
      const today = getToday({ langCode: defaultLangCode });

      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
    });

    it('render correct locale when set langCode', () => {
      const wrapper = renderDatePickerLocale({ props: { enableTodayLink: true }, langCode: LangCodes.en_GB });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
    });

    it('render custom locale', () => {
      const wrapper = renderDatePickerLocale({
        props: { enableTodayLink: true },
        langCode: LangCodes.en_GB,
        locale: { DatePicker: { separator: InternalDateSeparator.Dash } },
      });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB, separator: InternalDateSeparator.Dash });

      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
    });

    it('updates when langCode changes', () => {
      const wrapper = renderDatePickerLocale({
        props: { enableTodayLink: true },
      });
      const datePicker = wrapper.find(DatePicker).instance();
      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;
      const today = getToday({ langCode: LangCodes.en_GB });

      wrapper.setProps({ value: { langCode: LangCodes.en_GB } });
      datePicker.setState({ opened: true });
      wrapper.update();

      expect(getTextLoading(wrapper)).toBe(`${expectedText} ${today}`);
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
    expect(input).toHaveTextContent('24.08.2022');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    // purifying input's value as it has excess symbols
    const purifiedInput = input.textContent?.replace(/\./g, '').trim();
    expect(purifiedInput).toBe('');

    userEvent.type(input, '24.08.2022');
    expect(input).toHaveTextContent('24.08.2022');
  });
});
