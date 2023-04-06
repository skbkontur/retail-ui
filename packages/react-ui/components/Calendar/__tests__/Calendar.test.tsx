import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Calendar } from '../Calendar';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { CalendarDataTids } from '..';
import { CalendarLocaleHelper } from '../locale';

describe('Calendar', () => {
  it('renders', () => {
    render(<Calendar date={{ year: 2017, month: 6, date: 2 }} onDateChange={jest.fn()} />);

    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it('correctly passes max and min date to year select', () => {
    render(
      <Calendar
        onDateChange={jest.fn()}
        date={{ year: 2017, month: 6, date: 2 }}
        minDate={{ year: 2017, month: 2, date: 21 }}
        maxDate={{ year: 2020, month: 7, date: 15 }}
      />,
    );

    userEvent.click(screen.getAllByTestId('DateSelect__caption')[1]);
    expect(screen.getByText('2015')).toHaveAttribute('data-prop-disabled', 'true');
    expect(screen.getByText('2018')).toHaveAttribute('data-prop-disabled', 'false');
    expect(screen.queryByText('2021')).not.toBeInTheDocument();
  });

  it('correctly initial month/year with min date', () => {
    render(
      <Calendar
        onDateChange={jest.fn()}
        date={{ year: 2017, month: 6, date: 2 }}
        minDate={{ year: 2099, month: 0, date: 21 }}
      />,
    );

    expect(screen.getByText(CalendarLocaleHelper.get(LangCodes.ru_RU).months[6])).toBeInTheDocument();
    expect(screen.getByText('2017')).toBeInTheDocument();
  });

  it('correctly initial month/year with max date', () => {
    render(
      <Calendar
        onDateChange={jest.fn()}
        date={{ year: 2017, month: 6, date: 2 }}
        maxDate={{ year: 1959, month: 10, date: 15 }}
      />,
    );

    expect(screen.getByText(CalendarLocaleHelper.get(LangCodes.ru_RU).months[6])).toBeInTheDocument();
    expect(screen.getByText('2017')).toBeInTheDocument();
  });

  it('should correctly set langCode', () => {
    render(
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <Calendar date={{ year: 2022, month: 6, date: 12 }} />
      </LocaleContext.Provider>,
    );

    expect(screen.getByText(CalendarLocaleHelper.get(LangCodes.en_GB).months[6])).toBeInTheDocument();
  });

  it('should correctly rename months', () => {
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
        <Calendar date={{ year: 2022, month: 6, date: 12 }} />
      </LocaleContext.Provider>,
    );

    expect(screen.getByText(renamedMonths[6])).toBeInTheDocument();
  });
});
