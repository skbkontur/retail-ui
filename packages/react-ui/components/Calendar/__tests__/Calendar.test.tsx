import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Calendar } from '../Calendar';
import { LangCodes } from '../../../lib/locale';
import { DatePickerLocaleHelper } from '../../DatePicker/locale';
import { CalendarDataTids } from '..';

describe('Calendar', () => {
  it('renders', () => {
    render(<Calendar value={{ year: 2017, month: 6, date: 2 }} onValueChange={jest.fn()} />);

    expect(screen.getByTestId(CalendarDataTids.root)).toBeInTheDocument();
  });

  it('correctly passes max and min date to year select', () => {
    render(
      <Calendar
        onValueChange={jest.fn()}
        value={{ year: 2017, month: 6, date: 2 }}
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
        onValueChange={jest.fn()}
        value={{ year: 2017, month: 6, date: 2 }}
        minDate={{ year: 2099, month: 0, date: 21 }}
      />,
    );

    expect(screen.getAllByTestId('DateSelect__caption')[0]).toHaveTextContent(
      DatePickerLocaleHelper.get(LangCodes.ru_RU).months[6],
    );
    expect(screen.getAllByTestId('DateSelect__caption')[1]).toHaveTextContent('2017');
  });

  it('correctly initial month/year with max date', () => {
    render(
      <Calendar
        onValueChange={jest.fn()}
        value={{ year: 2017, month: 6, date: 2 }}
        maxDate={{ year: 1959, month: 10, date: 15 }}
      />,
    );

    expect(screen.getAllByTestId('DateSelect__caption')[0]).toHaveTextContent(
      DatePickerLocaleHelper.get(LangCodes.ru_RU).months[6],
    );
    expect(screen.getAllByTestId('DateSelect__caption')[1]).toHaveTextContent('2017');
  });
});
