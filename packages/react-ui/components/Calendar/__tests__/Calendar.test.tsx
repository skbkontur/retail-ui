import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('should rename months', () => {
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
});
