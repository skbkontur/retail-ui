import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentsLocales as DateSelectLocalesRu } from '../../../internal/DateSelect/locale/locales/ru';
import { componentsLocales as DateSelectLocalesEn } from '../../../internal/DateSelect/locale/locales/en';
import { DateSelectDataTids } from '../../../internal/DateSelect';
import { Calendar } from '../Calendar';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { CalendarDataTids, CalendarDateShape } from '..';
import { CalendarLocaleHelper } from '../locale';

describe('Calendar', () => {
  it('renders', () => {
    render(<Calendar value="02.06.2017" onValueChange={jest.fn()} />);

    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it('should pass max and min date to year select', () => {
    render(<Calendar value="02.06.2017" onValueChange={jest.fn()} minDate="21.02.2017" maxDate="15.07.2020" />);

    userEvent.click(screen.getAllByTestId('DateSelect__caption')[1]);
    expect(screen.getByText('2015')).toHaveAttribute('data-prop-disabled', 'true');
    expect(screen.getByText('2018')).toHaveAttribute('data-prop-disabled', 'false');
    expect(screen.queryByText('2021')).not.toBeInTheDocument();
  });

  it('should set date with higher min date is set', () => {
    render(<Calendar value="02.06.2017" onValueChange={jest.fn()} minDate="21.01.2099" />);

    expect(screen.getByText(CalendarLocaleHelper.get(LangCodes.ru_RU).months?.[6] as string)).toBeInTheDocument();
    expect(screen.getByText('2017')).toBeInTheDocument();
  });

  it('should set date when lower max date is set', () => {
    render(<Calendar value="02.06.2017" onValueChange={jest.fn()} maxDate="15.10.1959" />);

    expect(screen.getByText(CalendarLocaleHelper.get(LangCodes.ru_RU).months?.[6] as string)).toBeInTheDocument();
    expect(screen.getByText('2017')).toBeInTheDocument();
  });

  it('should set initial year and month', () => {
    render(<Calendar value="02.06.2017" onValueChange={jest.fn()} initialMonth={1} initialYear={2000} />);

    expect(screen.getByText(CalendarLocaleHelper.get(LangCodes.ru_RU).months?.[0] as string)).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
  });

  it('renders day cells with renderDay prop', async () => {
    const CustomDayItem: React.FC<{ date: CalendarDateShape }> = ({ date }) => (
      <span data-tid="customDayItem">{date.date === 1 ? 'Custom' : date.date}</span>
    );
    render(
      <Calendar
        value="02.07.2017"
        onValueChange={jest.fn()}
        renderDay={(date: CalendarDateShape): React.ReactNode => <CustomDayItem date={date} />}
      />,
    );

    expect(screen.getAllByTestId('customDayItem')[0]).toBeInTheDocument();
  });

  it('onMonthChange returns correct month', async () => {
    const onMonthChange = jest.fn(({ month, year }) => ({ month, year }));
    render(<Calendar value={'02.06.2017'} onValueChange={jest.fn()} onMonthChange={onMonthChange} />);

    userEvent.click(screen.getByRole('button', { name: 'Выбранный месяц Июнь' }));
    userEvent.click(screen.getByRole('button', { name: 'Выбрать месяц Июль' }));

    await waitFor(() => expect(onMonthChange).toHaveReturnedWith({ month: 7, year: 2017 }), { timeout: 2000 });
  });

  it('onMonthChange returns correct year', async () => {
    const onMonthChange = jest.fn(({ month, year }) => ({ month, year }));
    render(<Calendar value={'02.06.2017'} onValueChange={jest.fn()} onMonthChange={onMonthChange} />);

    userEvent.click(screen.getByRole('button', { name: 'Выбранный год 2017' }));
    userEvent.click(screen.getByRole('button', { name: 'Выбрать год 2018' }));

    await waitFor(() => expect(onMonthChange).toHaveLastReturnedWith({ month: 6, year: 2018 }), { timeout: 3000 });
  });

  it('should set langCode', () => {
    render(
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <Calendar value="12.06.2022" />
      </LocaleContext.Provider>,
    );

    expect(screen.getByText(CalendarLocaleHelper.get(LangCodes.en_GB).months?.[6] as string)).toBeInTheDocument();
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
      <LocaleContext.Provider value={{ locale: { Calendar: { months: renamedMonths } } }}>
        <Calendar value="12.06.2022" />
      </LocaleContext.Provider>,
    );

    expect(screen.getByText(renamedMonths[6])).toBeInTheDocument();
  });

  describe('a11y', () => {
    it('month selector has correct aria-label attribute (ru)', () => {
      const date = '1.2.2021';
      render(<Calendar value={date} />);

      expect(screen.getAllByTestId(CalendarDataTids.headerMonth)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${DateSelectLocalesRu.selectMonthAriaLabel} Февраль`,
      );
    });

    it('month selector has correct aria-label attribute (en)', () => {
      const date = '1.2.2021';
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Calendar value={date} />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(CalendarDataTids.headerMonth)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesEn.selectChosenAriaLabel} ${DateSelectLocalesEn.selectMonthAriaLabel} February`,
      );
    });

    it('year selector has correct aria-label attribute (ru)', () => {
      const date = '1.2.2021';
      render(<Calendar value={date} />);

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${DateSelectLocalesRu.selectYearAriaLabel} 2021`,
      );
    });

    it('year selector has correct aria-label attribute (en)', () => {
      const date = '1.2.2021';
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Calendar value={date} />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesEn.selectChosenAriaLabel} ${DateSelectLocalesEn.selectYearAriaLabel} 2021`,
      );
    });

    it('sets custom value for `selectMonthAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { Calendar: { selectMonthAriaLabel: customAriaLabel } } }}>
          <Calendar value={'1.2.2021'} />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(CalendarDataTids.headerMonth)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} Февраль`,
      );
    });

    it('sets custom value for `selectYearAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { Calendar: { selectYearAriaLabel: customAriaLabel } } }}>
          <Calendar value={'1.2.2021'} />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${DateSelectLocalesRu.selectChosenAriaLabel} ${customAriaLabel} 2021`,
      );
    });

    it('sets custom value for `selectChosenAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { Calendar: { selectChosenAriaLabel: customAriaLabel } } }}>
          <Calendar value={'1.2.2021'} />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `${customAriaLabel} ${DateSelectLocalesRu.selectYearAriaLabel} 2021`,
      );
    });

    it('month selector sets correct value for aria-expanded', () => {
      render(<Calendar value={'1.2.2021'} />);

      const monthButton = screen.getAllByTestId(CalendarDataTids.headerMonth)[0].querySelector('button') as Element;

      expect(monthButton).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(monthButton);

      expect(monthButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('year selector sets correct value for aria-expanded', () => {
      render(<Calendar value={'1.2.2021'} />);

      const yearButton = screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button') as Element;

      expect(yearButton).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(yearButton);

      expect(yearButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('month selector has aria-controls attribute', async () => {
      render(<Calendar value={'1.2.2021'} />);

      const monthButton = screen.getAllByTestId(CalendarDataTids.headerMonth)[0].querySelector('button') as Element;
      userEvent.click(monthButton);

      expect(monthButton).toHaveAttribute('aria-controls', expect.stringContaining(DateSelectDataTids.menu));
      await waitFor(() => {
        expect(screen.getByTestId(DateSelectDataTids.menu)).toHaveAttribute(
          'id',
          expect.stringContaining(DateSelectDataTids.menu),
        );
      });
    });

    it('year selector has aria-controls attribute', async () => {
      render(<Calendar value={'1.2.2021'} />);

      const yearButton = screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button') as Element;
      userEvent.click(yearButton);

      expect(yearButton).toHaveAttribute('aria-controls', expect.stringContaining(DateSelectDataTids.menu));
      await waitFor(() => {
        expect(screen.getByTestId(DateSelectDataTids.menu)).toHaveAttribute(
          'id',
          expect.stringContaining(DateSelectDataTids.menu),
        );
      });
    });

    it('month selector renders button when active', () => {
      render(<Calendar value={'31.12.2021'} />);

      expect(screen.getAllByTestId(CalendarDataTids.headerMonth)[0].querySelector('button')).toBeInTheDocument();
    });

    it('year selector renders button when active', () => {
      render(<Calendar value={'31.12.2021'} />);

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toBeInTheDocument();
    });

    it('month selector renders span when disabled', () => {
      render(<Calendar value={'31.12.2021'} />);

      expect(screen.getAllByTestId(CalendarDataTids.headerMonth)[1].querySelector('span')).toBeInTheDocument();
    });

    it('year selector renders span when disabled', () => {
      render(<Calendar value={'31.12.2021'} />);

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[1].querySelector('span')).toBeInTheDocument();
    });
  });
});
