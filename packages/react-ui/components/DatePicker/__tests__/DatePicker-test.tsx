import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentsLocales as DateSelectLocalesRu } from '../../../internal/DateSelect/locale/locales/ru';
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
import { componentsLocales as DatePickerLocalesRu } from '../locale/locales/ru';
import { componentsLocales as DatePickerLocalesEn } from '../locale/locales/en';

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

  it('blur() methon works', () => {
    const datePickerRef = React.createRef<DatePicker>();
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} ref={datePickerRef} />);
    userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    datePickerRef.current?.blur();
    expect(screen.queryByTestId(CalendarDataTids.root)).not.toBeInTheDocument();
  });

  it('handle onBlur event', () => {
    const datePickerRef = React.createRef<DatePicker>();
    const onBlur = jest.fn();
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} ref={datePickerRef} onBlur={onBlur} />);
    userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    datePickerRef.current?.blur();
    expect(onBlur).toHaveBeenCalled();
  });

  it('handle onFocus event', () => {
    const onFocus = jest.fn();
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} onFocus={onFocus} />);
    userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    expect(onFocus).toHaveBeenCalled();
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

  describe('a11y', () => {
    it('sets value for aria-label attribute (ru)', () => {
      render(<DatePicker enableTodayLink onValueChange={jest.fn()} />);

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByTestId(DatePickerDataTids.pickerTodayWrapper)).toHaveAttribute(
        'aria-label',
        DatePickerLocalesRu.todayAriaLabel,
      );
    });

    it('sets value for aria-label attribute (en)', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <DatePicker enableTodayLink onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByTestId(DatePickerDataTids.pickerTodayWrapper)).toHaveAttribute(
        'aria-label',
        DatePickerLocalesEn.todayAriaLabel,
      );
    });

    it('sets custom value for `todayAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { todayAriaLabel: customAriaLabel } } }}>
          <DatePicker enableTodayLink onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));
      expect(screen.getByTestId(DatePickerDataTids.pickerTodayWrapper)).toHaveAttribute('aria-label', customAriaLabel);
    });

    it('sets custom value for `selectMonthAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { selectMonthAriaLabel: customAriaLabel } } }}>
          <DatePicker value={'1.2.2021'} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getAllByTestId(CalendarDataTids.headerMonth)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} Февраль`,
      );
    });

    it('sets custom value for `selectYearAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { selectYearAriaLabel: customAriaLabel } } }}>
          <DatePicker value={'1.2.2021'} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} 2021`,
      );
    });

    it('sets custom value for `selectChosenAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { selectChosenAriaLabel: customAriaLabel } } }}>
          <DatePicker value={'1.2.2021'} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${customAriaLabel} ${DateSelectLocalesRu.selectYearAriaLabel} 2021`,
      );
    });

    it('sets custom value for `dayCellChooseDateAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      const date = '1.2.2021';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { dayCellChooseDateAriaLabel: customAriaLabel } } }}>
          <DatePicker value={date} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute(
        'aria-label',
        `${customAriaLabel} ${date}`,
      );
    });
  });
});
