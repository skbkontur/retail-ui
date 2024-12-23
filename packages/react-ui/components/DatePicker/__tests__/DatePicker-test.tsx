import React, { useState } from 'react';
import { act, render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentsLocales as DateSelectLocalesRu } from '../../../internal/DateSelect/locale/locales/ru';
import { CalendarDataTids, CalendarDay, CalendarDayProps } from '../../Calendar';
import { MASK_CHAR_EXEMPLAR } from '../../../internal/MaskCharLowLine';
import { InputLikeTextDataTids } from '../../../internal/InputLikeText';
import { InternalDate } from '../../../lib/date/InternalDate';
import { defaultLangCode } from '../../../lib/locale/constants';
import { DatePicker, DatePickerDataTids } from '../DatePicker';
import { DatePickerLocaleHelper } from '../locale';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { MobilePickerDataTids } from '../MobilePicker';
import { DateSelectDataTids } from '../../../internal/DateSelect';
import { MenuDataTids } from '../../../internal/Menu';
import { componentsLocales as DayCellViewLocalesRu } from '../../Calendar/locale/locales/ru';

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

  it('has id attribute', () => {
    const dateInputId = 'dateInputId';
    const result = render(<DatePicker id={dateInputId} value="02.07.2017" onValueChange={jest.fn()} />);
    expect(result.container.querySelector(`#${dateInputId}`)).not.toBeNull();
  });

  it('renders', () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} />);
    expect(screen.getByTestId(DatePickerDataTids.label)).toBeInTheDocument();
  });

  it('renders date select when open', async () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} />);
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it("doesn't open on focus if disabled", async () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} disabled />);
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument();
  });

  it('closes when become disabled', async () => {
    const { rerender } = render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} />);
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    rerender(<DatePicker value="02.07.2017" onValueChange={jest.fn()} disabled />);
    expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument();
  });

  it('open when autoFocus enabled', () => {
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} autoFocus />);
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it('blur() methon works', async () => {
    const datePickerRef = React.createRef<DatePicker>();
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} ref={datePickerRef} />);
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
    act(() => {
      datePickerRef.current?.blur();
    });
    expect(screen.queryByTestId(CalendarDataTids.root)).not.toBeInTheDocument();
  });

  it('handle onBlur event', async () => {
    const datePickerRef = React.createRef<DatePicker>();
    const onBlur = jest.fn();
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} ref={datePickerRef} onBlur={onBlur} />);
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    datePickerRef.current?.blur();
    expect(onBlur).toHaveBeenCalled();
  });

  it('handle onFocus event', async () => {
    const onFocus = jest.fn();
    render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} onFocus={onFocus} />);
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    expect(onFocus).toHaveBeenCalled();
  });

  it('renders day cells with renderDay prop', async () => {
    const CustomDayItem: React.FC<CalendarDayProps> = (props) => {
      const [date, month, year] = props.date.split('.').map(Number);
      const isCustom = date === 2 && month === 6 && year === 2017;
      return (
        <CalendarDay {...props}>
          <span data-tid="customDayItem">{isCustom ? 'Custom' : date}</span>
        </CalendarDay>
      );
    };
    render(
      <DatePicker value="02.07.2017" onValueChange={jest.fn()} renderDay={(props) => <CustomDayItem {...props} />} />,
    );
    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

    expect(screen.getAllByTestId('customDayItem')[0]).toBeInTheDocument();
  });

  it('onMonthChange returns correct month', async () => {
    const onMonthChange = jest.fn(({ month, year }) => ({ month, year }));
    render(<DatePicker value={'02.06.2017'} onValueChange={jest.fn()} onMonthChange={onMonthChange} />);

    await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    await userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChosenAriaLabel} ${DateSelectLocalesRu.selectMonthAriaLabel} ${
          DatePickerLocaleHelper.get(LangCodes.ru_RU).months?.[5]
        }`,
      }),
    );
    await userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChooseAriaLabel} ${DateSelectLocalesRu.selectMonthAriaLabel} ${
          DatePickerLocaleHelper.get(LangCodes.ru_RU).months?.[6]
        }`,
      }),
    );

    await waitFor(() => expect(onMonthChange).toHaveReturnedWith({ month: 7, year: 2017 }), { timeout: 3000 });
  }, 10000);

  it('onMonthChange returns correct year', async () => {
    const onMonthChange = jest.fn(({ month, year }) => ({ month, year }));
    render(<DatePicker value={'02.06.2017'} onValueChange={jest.fn()} onMonthChange={onMonthChange} />);

    await act(async () => {
      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
    });
    await act(async () => {
      await userEvent.click(screen.getByTestId(CalendarDataTids.headerYear).getElementsByTagName('button')[0]);
    });
    await act(async () => {
      await userEvent.click(screen.getByText('2018').parentElement as Element);
    });
    await waitFor(() => expect(onMonthChange).toHaveLastReturnedWith({ month: 6, year: 2018 }), { timeout: 3000 });
  }, 10000);

  describe('Locale', () => {
    it('render without LocaleProvider', async () => {
      render(<DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />);
      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const todayButton = screen.getByRole('button', { name: DatePickerLocaleHelper.get().todayAriaLabel });
      expect(todayButton).toHaveTextContent(expectedText);
    });

    it('render default locale', async () => {
      render(
        <LocaleContext.Provider value={{ locale: {}, langCode: defaultLangCode }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      const expectedText = DatePickerLocaleHelper.get(defaultLangCode).today;

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const todayButton = screen.getByRole('button', { name: DatePickerLocaleHelper.get().todayAriaLabel });
      expect(todayButton).toHaveTextContent(expectedText);
    });

    it('render correct locale when set langCode', async () => {
      render(
        <LocaleContext.Provider value={{ locale: {}, langCode: LangCodes.en_GB }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const todayButton = screen.getByRole('button', {
        name: DatePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel,
      });
      expect(todayButton).toHaveTextContent(expectedText);
    });

    it('updates when langCode changes', async () => {
      const { rerender } = render(
        <LocaleContext.Provider value={{ locale: {}, langCode: defaultLangCode }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      const expectedText = DatePickerLocaleHelper.get(LangCodes.en_GB).today;

      rerender(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <DatePicker value="02.07.2017" onValueChange={jest.fn()} enableTodayLink />
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const todayButton = screen.getByRole('button', {
        name: DatePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel,
      });
      expect(todayButton).toHaveTextContent(expectedText);
    });

    it('should rename months using locale', async () => {
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

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getByText(renamedMonths[6])).toBeInTheDocument();
    });

    it.each(['', null, undefined])('should clear the value when %s passed', async (testValue) => {
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

      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
      const expected = 'ss.ss.ssss'.replace(/s/g, MASK_CHAR_EXEMPLAR);
      const expectedRegExp = new RegExp(`^${expected}$`);
      expect(input).toHaveTextContent(expectedRegExp, { normalizeWhitespace: false });

      await userEvent.type(input, '24.08.2022');
      expect(input).toHaveTextContent(/^24.08.2022$/);
    });

    it('should have disabled input', () => {
      render(<DatePicker onValueChange={jest.fn()} disabled />);

      expect(screen.getByTestId(InputLikeTextDataTids.nativeInput)).toBeDisabled();
    });
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute (ru)', async () => {
      render(<DatePicker enableTodayLink onValueChange={jest.fn()} />);

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const todayButton = screen.getByRole('button', {
        name: DatePickerLocaleHelper.get().todayAriaLabel,
      });
      expect(todayButton).toHaveAttribute('aria-label', DatePickerLocaleHelper.get().todayAriaLabel);
    });

    it('sets value for aria-label attribute (en)', async () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <DatePicker enableTodayLink onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const todayButton = screen.getByRole('button', {
        name: DatePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel,
      });
      expect(todayButton).toHaveAttribute('aria-label', DatePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel);
    });

    it('sets custom value for `todayAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { todayAriaLabel: customAriaLabel } } }}>
          <DatePicker enableTodayLink onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const todayButtonWithCustomAriaLabel = screen.getByRole('button', {
        name: customAriaLabel,
      });
      expect(todayButtonWithCustomAriaLabel).toHaveAttribute('aria-label', customAriaLabel);
    });

    it('sets custom value for `selectMonthAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { selectMonthAriaLabel: customAriaLabel } } }}>
          <DatePicker value={'1.2.2021'} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const monthButton = within(screen.getAllByTestId(CalendarDataTids.headerMonth)[0]).getByRole('button');
      expect(monthButton).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} Февраль`,
      );
    });

    it('sets custom value for `selectYearAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { selectYearAriaLabel: customAriaLabel } } }}>
          <DatePicker value={'1.2.2021'} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const yearButton = within(screen.getAllByTestId(CalendarDataTids.headerYear)[0]).getByRole('button');
      expect(yearButton).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} 2021`,
      );
    });

    it('sets custom value for `selectChosenAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DatePicker: { selectChosenAriaLabel: customAriaLabel } } }}>
          <DatePicker value={'1.2.2021'} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const yearButton = within(screen.getAllByTestId(CalendarDataTids.headerYear)[0]).getByRole('button');
      expect(yearButton).toHaveAttribute(
        'aria-label',
        `${customAriaLabel} ${DateSelectLocalesRu.selectYearAriaLabel} 2021`,
      );
    });

    it('sets custom value for `dayCellChooseDateAriaLabel` locale', async () => {
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

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('mobile', () => {
    const oldMatchMedia = window.matchMedia;
    const matchMediaMock = jest.fn().mockImplementation((query) => {
      return {
        matches: query === LIGHT_THEME.mobileMediaQuery,
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
              monthRoot.queryByTestId(CalendarDataTids.headerMonth) &&
              monthRoot.queryByTestId(CalendarDataTids.headerYear)
            );
          });

          expect(currentMonth).toBeDefined();
          const monthRoot = within(currentMonth as HTMLElement);
          expect(
            within(monthRoot.getByTestId(CalendarDataTids.headerMonth)).getByTestId(DateSelectDataTids.caption),
          ).toHaveTextContent(locale.months?.[theMonth] as string);
          expect(
            within(monthRoot.getByTestId(CalendarDataTids.headerYear)).getByTestId(DateSelectDataTids.caption),
          ).toHaveTextContent(theYear.toString());

          return currentMonth;
        },
        // Note: можно ли это сделать быстрее, если поиграться с таймингом в анимациях?
        { timeout: 5000 },
      );
    };

    it('should scroll on today click', async () => {
      render(<MobilePicker />);
      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      await userEvent.click(within(screen.getByTestId(MobilePickerDataTids.today)).getByRole('button'));

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

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
      await act(async () => {
        await userEvent.click(screen.getByTestId(CalendarDataTids.headerMonth).getElementsByTagName('button')[0]);
      });
      await act(async () => {
        await userEvent.click(screen.getByTestId(MenuDataTids.root).getElementsByTagName('button')[month]);
      });

      const currentMonth = await waitForMonth(month, year);
      expect(currentMonth).toBeDefined();
    });

    it('should scroll on year select', async () => {
      const month = 10;
      const year = 2011;
      render(<MobilePicker initialDate={`01.${month + 1}.2010`} />);

      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));
      await act(async () => {
        await userEvent.click(screen.getByTestId(CalendarDataTids.headerYear).getElementsByTagName('button')[0]);
      });
      await act(async () => {
        await userEvent.click(screen.getByText(year.toString()).parentElement as Element);
      });

      const currentMonth = await waitForMonth(month, year);
      expect(currentMonth).toBeDefined();
    }, 10000);

    it('should scroll from inner input', async () => {
      const initialDate = '01.01.2011';
      render(<MobilePicker initialDate={initialDate} />);
      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const month = 10;
      const year = 2022;
      fireEvent.focus(screen.getByTestId(MobilePickerDataTids.input));
      await userEvent.keyboard(`{ArrowRight}{${month + 1}}{${year}}`);

      const currentMonth = await waitForMonth(month, year);
      expect(currentMonth).toBeDefined();
    });

    it('should change value from inner input', async () => {
      const initialDate = '01.01.2011';
      render(<MobilePicker initialDate={initialDate} />);
      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const month = 10;
      const year = 2022;
      fireEvent.focus(screen.getByTestId(MobilePickerDataTids.input));
      await userEvent.keyboard(`{ArrowRight}{${month}}{${year}}`);

      const input = within(screen.getByTestId(DatePickerDataTids.input)).getByTestId(InputLikeTextDataTids.input);
      expect(input).toHaveTextContent(`01.${month}.${year}`);
    });

    it('should change value from day select', async () => {
      const initialDate = '10.10.2010';
      const expectedDate = '20.10.2010';
      render(<MobilePicker initialDate={initialDate} />);
      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const months = screen.getAllByTestId(CalendarDataTids.month);
      const currentMonth = months.find((month) => {
        const monthRoot = within(month);
        return (
          monthRoot.queryByTestId(CalendarDataTids.headerMonth) && monthRoot.queryByTestId(CalendarDataTids.headerYear)
        );
      });
      expect(currentMonth).toBeDefined();
      const monthRoot = within(currentMonth as HTMLElement);
      const ariaLabel = `${DatePickerLocaleHelper.get().dayCellChooseDateAriaLabel}: ${new InternalDate({
        value: expectedDate,
      }).toA11YFormat()}`;
      await userEvent.click(monthRoot.getByRole('button', { name: ariaLabel }));

      const input = within(screen.getByTestId(DatePickerDataTids.input)).getByTestId(InputLikeTextDataTids.input);
      expect(input).toHaveTextContent(expectedDate);
    });

    it('should call onBlur after value was changed when date picked on click', async () => {
      const initialDate = '10.10.2010';
      const expectedDate = '20.10.2010';
      let blurredDate = '';
      const MobilePickerWithOnBlur = () => {
        const [date, setDate] = useState(initialDate);
        const handleBlur = () => {
          blurredDate = date;
        };
        return (
          <DatePicker enableTodayLink width="auto" value={date || null} onValueChange={setDate} onBlur={handleBlur} />
        );
      };
      render(<MobilePickerWithOnBlur />);
      await userEvent.click(screen.getByTestId(DatePickerDataTids.input));

      const ariaLabel = `${DayCellViewLocalesRu.dayCellChooseDateAriaLabel}: ${new InternalDate({
        value: expectedDate,
      }).toA11YFormat()}`;

      const expectedDateButton = screen.getByLabelText(ariaLabel);
      await userEvent.click(expectedDateButton);

      expect(blurredDate).toBe(expectedDate);
    });
  });
});
