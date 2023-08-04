import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateSelectDataTids } from '../../../internal/DateSelect';
import { Calendar } from '../Calendar';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { CalendarDataTids } from '..';
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
        `Выбранный месяц Февраль`,
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
        `Chosen month February`,
      );
    });

    it('year selector has correct aria-label attribute (ru)', () => {
      const date = '1.2.2021';
      render(<Calendar value={date} />);

      expect(screen.getAllByTestId(CalendarDataTids.headerYear)[0].querySelector('button')).toHaveAttribute(
        'aria-label',
        `Выбранный год 2021`,
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
        `Chosen year 2021`,
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
