import React, { useState } from 'react';
// import { mount, ReactWrapper } from 'enzyme';
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
      userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

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
      userEvent.click(screen.getByTestId(InputLikeTextDataTids.root));

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

  it('should rename months using locale', () => {
    const renamedMonths = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
    ];
    render(
      <LocaleContext.Provider value={{ locale: { DatePicker: { months: renamedMonths } } }}>
        <DatePicker value="12.06.2022" onValueChange={jest.fn()} />
      </LocaleContext.Provider>,
    );

    userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.getByText(renamedMonths[6])).toBeInTheDocument();
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
