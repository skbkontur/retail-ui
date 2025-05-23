import React, { useState } from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../../Input';
import { componentsLocales as DateSelectLocalesRu } from '../../../internal/DateSelect/locale/locales/ru';
import { CalendarDataTids, CalendarDay, CalendarDayProps } from '../../Calendar';
import { MASK_CHAR_EXEMPLAR } from '../../../internal/MaskCharLowLine';
import { InternalDate } from '../../../lib/date/InternalDate';
import { defaultLangCode } from '../../../lib/locale/constants';
import { DateRangePicker, DateRangePickerDataTids } from '../DateRangePicker';
import { DateRangePickerLocaleHelper } from '../locale';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import type { DateInput } from '../../../components/DateInput';

describe('DateRangePicker', () => {
  it('renders', () => {
    render(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    expect(screen.getByTestId(DateRangePickerDataTids.start)).toBeInTheDocument();
    expect(screen.getByTestId(DateRangePickerDataTids.end)).toBeInTheDocument();
  });

  it('has id attribute', () => {
    const dateInputStartId = 'dateInputStartId';
    const dateInputEndId = 'dateInputEndId';
    const result = render(
      <DateRangePicker>
        <DateRangePicker.Start id={dateInputStartId} />
        <DateRangePicker.Separator />
        <DateRangePicker.End id={dateInputEndId} />
      </DateRangePicker>,
    );
    expect(result.container.querySelector(`#${dateInputStartId}`)).not.toBeNull();
    expect(result.container.querySelector(`#${dateInputEndId}`)).not.toBeNull();
  });

  it('should handle onValueChange event when typing', async () => {
    const onStartValueChange = jest.fn();
    const onEndValueChange = jest.fn();

    render(
      <DateRangePicker>
        <DateRangePicker.Start onValueChange={onStartValueChange} />
        <DateRangePicker.End onValueChange={onEndValueChange} />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    await userEvent.keyboard('1');
    expect(onStartValueChange).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.end));
    await userEvent.keyboard('1');
    expect(onEndValueChange).toHaveBeenCalledTimes(1);
  });

  it('should not handle onValueChange event on render', async () => {
    const onStartValueChange = jest.fn();
    const onEndValueChange = jest.fn();

    render(
      <DateRangePicker>
        <DateRangePicker.Start value="10.12.2025" onValueChange={onStartValueChange} />
        <DateRangePicker.End value="20.12.2025" onValueChange={onEndValueChange} />
      </DateRangePicker>,
    );

    expect(onStartValueChange).not.toHaveBeenCalled();
    expect(onEndValueChange).not.toHaveBeenCalled();
  });

  it('should handle onValueChange when clear value', async () => {
    const onStartValueChange = jest.fn();

    render(
      <DateRangePicker>
        <DateRangePicker.Start value="22" onValueChange={onStartValueChange} />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    await userEvent.keyboard('{backspace}');
    await userEvent.keyboard('{backspace}');
    expect(onStartValueChange).toHaveBeenCalledTimes(2);
  });

  it('renders calendar when start-input open', async () => {
    render(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it('renders calendar when end-input open', async () => {
    render(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.end));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it("doesn't open on focus if start-input disabled", async () => {
    render(
      <DateRangePicker>
        <DateRangePicker.Start disabled />
        <DateRangePicker.Separator />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    expect(screen.queryByTestId(CalendarDataTids.root)).not.toBeInTheDocument();
  });

  it("doesn't open on focus if end-input disabled", async () => {
    render(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.End disabled />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.end));
    expect(screen.queryByTestId(CalendarDataTids.root)).not.toBeInTheDocument();
  });

  it('closes when start-input become disabled', async () => {
    const { rerender } = render(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.End />
      </DateRangePicker>,
    );
    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    rerender(
      <DateRangePicker>
        <DateRangePicker.Start disabled />
        <DateRangePicker.End />
      </DateRangePicker>,
    );
    expect(screen.queryByTestId(CalendarDataTids.root)).not.toBeInTheDocument();
  });

  it('closes when end-input become disabled', async () => {
    const { rerender } = render(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.end));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    rerender(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.End disabled />
      </DateRangePicker>,
    );

    expect(screen.queryByTestId(CalendarDataTids.root)).not.toBeInTheDocument();
  });

  it('open when autoFocus enabled', () => {
    render(
      <DateRangePicker>
        <DateRangePicker.Start autoFocus />
        <DateRangePicker.End />
      </DateRangePicker>,
    );
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it('close on blur() method', async () => {
    const DateRangePickerStartRef = React.createRef<DateInput>();
    render(
      <DateRangePicker>
        <DateRangePicker.Start ref={DateRangePickerStartRef} />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
    await act(() => {
      DateRangePickerStartRef.current?.blur();
    });
    expect(screen.queryByTestId(CalendarDataTids.root)).not.toBeInTheDocument();
  });

  it('handle onBlur event', async () => {
    const DateRangePickerRef = React.createRef<DateInput>();
    const onBlur = jest.fn();

    render(
      <DateRangePicker>
        <DateRangePicker.Start onBlur={onBlur} ref={DateRangePickerRef} />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();

    DateRangePickerRef.current?.blur();
    expect(onBlur).toHaveBeenCalled();
  });

  it('handle onFocus event by input-start click', async () => {
    const onFocus = jest.fn();
    render(
      <DateRangePicker>
        <DateRangePicker.Start onFocus={onFocus} />
        <DateRangePicker.End />
      </DateRangePicker>,
    );
    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    expect(onFocus).toHaveBeenCalled();
  });

  it('handle onFocus event by input-end click', async () => {
    const onFocus = jest.fn();
    render(
      <DateRangePicker>
        <DateRangePicker.Start />
        <DateRangePicker.End onFocus={onFocus} />
      </DateRangePicker>,
    );
    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.end));
    expect(onFocus).toHaveBeenCalled();
  });

  it('navigation from Tab open calendar', async () => {
    const onFocusStart = jest.fn();
    const onFocusEnd = jest.fn();
    render(
      <>
        <Input data-tid="test-input" />
        <DateRangePicker>
          <DateRangePicker.Start onFocus={onFocusStart} />
          <DateRangePicker.End onFocus={onFocusEnd} />
        </DateRangePicker>
      </>,
    );
    await userEvent.click(screen.getByTestId('test-input'));
    await userEvent.keyboard('{tab}');
    expect(onFocusStart).toHaveBeenCalled();
    await userEvent.keyboard('{tab}');
    expect(onFocusEnd).toHaveBeenCalled();
    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  // describe('call focus with param withoutOpenDropdown=true', () => {
  //   beforeEach(() => {
  //     const DateRangePickerRef = React.createRef<DateRangePicker>();
  //     render(
  //       <>
  //         <DateRangePicker value="02.07.2017" ref={DateRangePickerRef} />
  //       </>,
  //     );
  //     DateRangePickerRef.current?.focus({ withoutOpenDropdown: true });
  //   });

  //   it('do not open Calendar', async () => {
  //     expect(screen.queryByTestId(DateRangePickerDataTids.root)).not.toBeInTheDocument();
  //   });

  //   it('click on input should open Calendar', async () => {
  //     await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
  //     expect(screen.queryByTestId(DateRangePickerDataTids.root)).toBeInTheDocument();
  //   });

  //   it('arrow down should open Calendar', async () => {
  //     await userEvent.keyboard('{arrowdown}');
  //     expect(screen.queryByTestId(DateRangePickerDataTids.root)).toBeInTheDocument();
  //   });

  //   it('arrow up should open Calendar', async () => {
  //     await userEvent.keyboard('{arrowup}');
  //     expect(screen.queryByTestId(DateRangePickerDataTids.root)).toBeInTheDocument();
  //   });

  //   it('edit value should open Calendar', async () => {
  //     await userEvent.keyboard('01');
  //     expect(screen.queryByTestId(DateRangePickerDataTids.root)).toBeInTheDocument();
  //   });
  // });

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
      <DateRangePicker renderDay={(props: CalendarDayProps) => <CustomDayItem {...props} />}>
        <DateRangePicker.Start />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    expect(screen.getAllByTestId('customDayItem')[0]).toBeInTheDocument();
  });

  it('onMonthChange returns correct month', async () => {
    const onMonthChange = jest.fn(({ month, year }) => ({ month, year }));

    render(
      <DateRangePicker onMonthChange={onMonthChange}>
        <DateRangePicker.Start value="02.06.2017" />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
    await userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChosenAriaLabel} ${DateSelectLocalesRu.selectMonthAriaLabel} ${
          DateRangePickerLocaleHelper.get(LangCodes.ru_RU).months?.[5]
        }`,
      }),
    );
    await userEvent.click(
      screen.getByRole('button', {
        name: `${DateSelectLocalesRu.selectChooseAriaLabel} ${DateSelectLocalesRu.selectMonthAriaLabel} ${
          DateRangePickerLocaleHelper.get(LangCodes.ru_RU).months?.[6]
        }`,
      }),
    );

    await waitFor(() => expect(onMonthChange).toHaveReturnedWith({ month: 7, year: 2017 }), { timeout: 3000 });
  }, 10000);

  it('onMonthChange returns correct year', async () => {
    const onMonthChange = jest.fn(({ month, year }) => ({ month, year }));

    render(
      <DateRangePicker onMonthChange={onMonthChange}>
        <DateRangePicker.Start value="02.06.2017" />
        <DateRangePicker.End />
      </DateRangePicker>,
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));
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
      render(
        <DateRangePicker enableTodayLink>
          <DateRangePicker.Start value="02.07.2017" />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>,
      );
      const expectedText = DateRangePickerLocaleHelper.get(defaultLangCode).today;

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const todayButton = screen.getByRole('button', { name: DateRangePickerLocaleHelper.get().todayAriaLabel });
      expect(todayButton).toHaveTextContent(expectedText);
    });

    it('render default locale', async () => {
      render(
        <LocaleContext.Provider value={{ locale: {}, langCode: defaultLangCode }}>
          <DateRangePicker enableTodayLink>
            <DateRangePicker.Start value="02.07.2017" />
            <DateRangePicker.Separator />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      const expectedText = DateRangePickerLocaleHelper.get(defaultLangCode).today;

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const todayButton = screen.getByRole('button', { name: DateRangePickerLocaleHelper.get().todayAriaLabel });
      expect(todayButton).toHaveTextContent(expectedText);
    });

    it('render correct locale when set langCode', async () => {
      render(
        <LocaleContext.Provider value={{ locale: {}, langCode: LangCodes.en_GB }}>
          <DateRangePicker enableTodayLink>
            <DateRangePicker.Start value="02.07.2017" />
            <DateRangePicker.Separator />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      const expectedText = DateRangePickerLocaleHelper.get(LangCodes.en_GB).today;

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const todayButton = screen.getByRole('button', {
        name: DateRangePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel,
      });
      expect(todayButton).toHaveTextContent(expectedText);
    });

    it('updates when langCode changes', async () => {
      const picker = (
        <DateRangePicker enableTodayLink>
          <DateRangePicker.Start value="02.07.2017" />
          <DateRangePicker.Separator />
          <DateRangePicker.End />
        </DateRangePicker>
      );
      const { rerender } = render(
        <LocaleContext.Provider value={{ locale: {}, langCode: defaultLangCode }}>{picker}</LocaleContext.Provider>,
      );

      const expectedText = DateRangePickerLocaleHelper.get(LangCodes.en_GB).today;

      rerender(<LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>{picker}</LocaleContext.Provider>);

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const todayButton = screen.getByRole('button', {
        name: DateRangePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel,
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
        <LocaleContext.Provider value={{ locale: { DateRangePicker: { months: renamedMonths } } }}>
          <DateRangePicker>
            <DateRangePicker.Start value="12.06.2022" />
            <DateRangePicker.Separator />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      expect(screen.getByText(renamedMonths[6])).toBeInTheDocument();
    });

    it.each(['', null, undefined])('should clear the value when %s passed', async (testValue) => {
      const Comp = () => {
        const [value, setValue] = useState<string | null | undefined>('24.08.2022');

        return (
          <>
            <DateRangePicker>
              <DateRangePicker.Start value={value} onValueChange={setValue} />
              <DateRangePicker.Separator />
              <DateRangePicker.End />
            </DateRangePicker>
            <button onClick={() => setValue(testValue)}>Clear</button>
          </>
        );
      };

      render(<Comp />);

      const startInput = screen.getByTestId(DateRangePickerDataTids.start);
      expect(startInput).toHaveTextContent(/^24.08.2022$/);

      await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
      const expected = 'ss.ss.ssss'.replace(/s/g, MASK_CHAR_EXEMPLAR);
      const expectedRegExp = new RegExp(`^${expected}$`);
      expect(startInput).toHaveTextContent(expectedRegExp, { normalizeWhitespace: false });

      await userEvent.type(startInput, '24.08.2022');
      expect(startInput).toHaveTextContent(/^24.08.2022$/);
    });

    it('should have disabled input', () => {
      render(
        <DateRangePicker>
          <DateRangePicker.Start disabled />
          <DateRangePicker.Separator />
          <DateRangePicker.End disabled />
        </DateRangePicker>,
      );

      expect(screen.getByTestId(DateRangePickerDataTids.start)).toHaveAttribute('aria-disabled', 'true');
      expect(screen.getByTestId(DateRangePickerDataTids.end)).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute (ru)', async () => {
      render(
        <DateRangePicker enableTodayLink>
          <DateRangePicker.Start value="02.06.2017" />
          <DateRangePicker.End />
        </DateRangePicker>,
      );

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const todayButton = screen.getByRole('button', {
        name: DateRangePickerLocaleHelper.get().todayAriaLabel,
      });
      expect(todayButton).toHaveAttribute('aria-label', DateRangePickerLocaleHelper.get().todayAriaLabel);
    });

    it('sets value for aria-label attribute (en)', async () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <DateRangePicker enableTodayLink>
            <DateRangePicker.Start value="02.06.2017" />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const todayButton = screen.getByRole('button', {
        name: DateRangePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel,
      });
      expect(todayButton).toHaveAttribute(
        'aria-label',
        DateRangePickerLocaleHelper.get(LangCodes.en_GB).todayAriaLabel,
      );
    });

    it('sets custom value for `todayAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DateRangePicker: { todayAriaLabel: customAriaLabel } } }}>
          <DateRangePicker enableTodayLink>
            <DateRangePicker.Start value="02.06.2017" />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const todayButtonWithCustomAriaLabel = screen.getByRole('button', {
        name: customAriaLabel,
      });
      expect(todayButtonWithCustomAriaLabel).toHaveAttribute('aria-label', customAriaLabel);
    });

    it('sets custom value for `selectMonthAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DateRangePicker: { selectMonthAriaLabel: customAriaLabel } } }}>
          <DateRangePicker>
            <DateRangePicker.Start value="01.02.2025" />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const monthButton = within(screen.getAllByTestId(CalendarDataTids.headerMonth)[0]).getByRole('button');
      expect(monthButton).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} Февраль`,
      );
    });

    it('sets custom value for `selectYearAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DateRangePicker: { selectYearAriaLabel: customAriaLabel } } }}>
          <DateRangePicker>
            <DateRangePicker.Start value="1.2.2021" />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      const yearButton = within(screen.getAllByTestId(CalendarDataTids.headerYear)[0]).getByRole('button');
      expect(yearButton).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} 2021`,
      );
    });

    it('sets custom value for `selectChosenAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { DateRangePicker: { selectChosenAriaLabel: customAriaLabel } } }}>
          <DateRangePicker>
            <DateRangePicker.Start value="1.2.2021" />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

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
        <LocaleContext.Provider
          value={{ locale: { DateRangePicker: { dayCellChooseDateAriaLabel: customAriaLabel } } }}
        >
          <DateRangePicker>
            <DateRangePicker.Start value={date} />
            <DateRangePicker.End />
          </DateRangePicker>
        </LocaleContext.Provider>,
      );
      const ariaLabel = `${customAriaLabel}: ${new InternalDate({
        value: date,
      }).toA11YFormat()}`;

      await userEvent.click(screen.getByTestId(DateRangePickerDataTids.start));

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
