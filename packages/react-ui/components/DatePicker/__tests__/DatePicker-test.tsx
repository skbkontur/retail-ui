import React, { useState } from 'react';
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
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
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';
import { MobilePickerDataTids } from '../MobilePicker';
import { ButtonDataTids } from '../../../components/Button';
import { DateSelectDataTids } from '../../../internal/DateSelect';

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

  it('renders day cells with renderItem prop', async () => {
    const CustomDayItem: React.FC<{ date: string }> = ({ date }) => (
      <span data-tid="customDayItem">{date === '02.07.2017' ? 'Custom' : date}</span>
    );
    render(
      <DatePicker
        value="02.07.2017"
        onValueChange={jest.fn()}
        renderDay={(date: string): React.ReactNode => <CustomDayItem date={date} />}
      />,
    );
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.getAllByTestId('customDayItem')[0]).toBeInTheDocument();
  });

  it('onStuckMonth returns correct month', async () => {
    const onStuckMonth = jest.fn(({ month, year }) => ({ month, year }));
    render(<DatePicker value={'02.06.2017'} onValueChange={jest.fn()} onStuckMonth={onStuckMonth} />);

    userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChosenAriaLabel} ${DateSelectLocalesRu.selectMonthAriaLabel} ${
          DatePickerLocaleHelper.get(LangCodes.ru_RU).months?.[5]
        }`,
      }),
    );
    userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChooseAriaLabel} ${DateSelectLocalesRu.selectMonthAriaLabel} ${
          DatePickerLocaleHelper.get(LangCodes.ru_RU).months?.[6]
        }`,
      }),
    );

    await waitFor(() => expect(onStuckMonth).toHaveReturnedWith({ month: 7, year: 2017 }), { timeout: 3000 });
  });

  it('onStuckMonth returns correct year', async () => {
    const onStuckMonth = jest.fn(({ month, year }) => ({ month, year }));
    render(<DatePicker value={'02.06.2017'} onValueChange={jest.fn()} onStuckMonth={onStuckMonth} />);

    userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChosenAriaLabel} ${DateSelectLocalesRu.selectYearAriaLabel} 2017`,
      }),
    );
    userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChooseAriaLabel} ${DateSelectLocalesRu.selectYearAriaLabel} 2018`,
      }),
    );

    await waitFor(() => expect(onStuckMonth).toHaveLastReturnedWith({ month: 6, year: 2018 }), { timeout: 3000 });
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
      const ariaLabel = `${customAriaLabel}: ${new InternalDate({
        value: date,
      }).toA11YFormat()}`;

      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('mobile', () => {
    const oldMatchMedia = window.matchMedia;
    const matchMediaMock = jest.fn().mockImplementation((query) => {
      return {
        matches: query === DEFAULT_THEME.mobileMediaQuery,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    beforeAll(() => {
      window.matchMedia = matchMediaMock;
    });

    afterAll(() => {
      window.matchMedia = oldMatchMedia;
    });

    const MobilePicker = ({ initialDate = '02.07.2017' }) => {
      const [date, setDate] = useState(initialDate);
      return <DatePicker enableTodayLink width="auto" value={date} onValueChange={setDate} />;
    };

    const waitForMonth = (theMonth: number, theYear: number) => {
      const locale = DatePickerLocaleHelper.get();
      // Нужно подождать пока доскроллится до правильного месяца
      // В идеале, хотелось бы просто написать вложенный селектор,
      // который сам будет ретраиться пока не увидит нужный месяц
      return waitFor(
        () => {
          const months = screen.getAllByTestId(CalendarDataTids.month);
          const currentMonth = months.find((month) => {
            const monthRoot = within(month);
            return (
              monthRoot.queryByTestId(CalendarDataTids.monthSelectMobile) &&
              monthRoot.queryByTestId(CalendarDataTids.yearSelectMobile)
            );
          });
          /* eslint-disable testing-library/no-wait-for-multiple-assertions */
          expect(currentMonth).toBeDefined();
          const monthRoot = within(currentMonth as HTMLElement);
          expect(
            within(monthRoot.getByTestId(CalendarDataTids.headerMonth)).getByTestId(DateSelectDataTids.caption),
          ).toHaveTextContent(locale.months?.[theMonth] as string);
          expect(
            within(monthRoot.getByTestId(CalendarDataTids.headerYear)).getByTestId(DateSelectDataTids.caption),
          ).toHaveTextContent(theYear.toString());
          /* eslint-enable testing-library/no-wait-for-multiple-assertions */
          return currentMonth;
        },
        // Note: можно ли это сделать быстрее, если поиграться с таймингом в анимациях?
        { timeout: 5000 },
      );
    };

    it('should scroll on today click', async () => {
      render(<MobilePicker />);
      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      userEvent.click(within(screen.getByTestId(MobilePickerDataTids.today)).getByTestId(ButtonDataTids.root));

      const today = new Date();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();
      const currentMonth = await waitForMonth(todayMonth, todayYear);
      expect(currentMonth).toBeDefined();
    });

    it('should scroll on month select', async () => {
      const month = 11;
      const year = 2011;
      render(<MobilePicker initialDate={`01.01.${year}`} />);
      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      userEvent.selectOptions(screen.getByTestId(CalendarDataTids.monthSelectMobile), month.toString());
      const currentMonth = await waitForMonth(month, year);
      expect(currentMonth).toBeDefined();
    });

    it('should scroll on year select', async () => {
      const month = 10;
      const year = 2011;
      render(<MobilePicker initialDate={`01.${month + 1}.2010`} />);
      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      userEvent.selectOptions(screen.getByTestId(CalendarDataTids.yearSelectMobile), year.toString());
      const currentMonth = await waitForMonth(month, year);
      expect(currentMonth).toBeDefined();
    });

    it('should scroll from inner input', async () => {
      const initialDate = '01.01.2011';
      render(<MobilePicker initialDate={initialDate} />);
      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const month = 10;
      const year = 2022;
      fireEvent.focus(screen.getByTestId(MobilePickerDataTids.input));
      userEvent.keyboard(`{ArrowRight}{${month + 1}}{${year}}`);

      const currentMonth = await waitForMonth(month, year);
      expect(currentMonth).toBeDefined();
    });

    it('should change value from inner input', () => {
      const initialDate = '01.01.2011';
      render(<MobilePicker initialDate={initialDate} />);
      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const month = 10;
      const year = 2022;
      fireEvent.focus(screen.getByTestId(MobilePickerDataTids.input));
      userEvent.keyboard(`{ArrowRight}{${month}}{${year}}`);

      const input = within(screen.getByTestId(DatePickerDataTids.input)).getByTestId(InputLikeTextDataTids.input);
      expect(input).toHaveTextContent(`01.${month}.${year}`);
    });

    it('should change value from day select', async () => {
      const initialDate = '10.10.2010';
      const expectedDate = '20.10.2010';
      render(<MobilePicker initialDate={initialDate} />);
      userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const months = screen.getAllByTestId(CalendarDataTids.month);
      const currentMonth = months.find((month) => {
        const monthRoot = within(month);
        return (
          monthRoot.queryByTestId(CalendarDataTids.monthSelectMobile) &&
          monthRoot.queryByTestId(CalendarDataTids.yearSelectMobile)
        );
      });
      expect(currentMonth).toBeDefined();
      const monthRoot = within(currentMonth as HTMLElement);
      const ariaLabel = `${DatePickerLocaleHelper.get().dayCellChooseDateAriaLabel}: ${new InternalDate({
        value: expectedDate,
      }).toA11YFormat()}`;
      userEvent.click(monthRoot.getByRole('button', { name: ariaLabel }));

      const input = within(screen.getByTestId(DatePickerDataTids.input)).getByTestId(InputLikeTextDataTids.input);
      expect(input).toHaveTextContent(expectedDate);
    });
  });
});
