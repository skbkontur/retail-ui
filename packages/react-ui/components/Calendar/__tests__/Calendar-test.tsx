import React from 'react';
import { render, screen } from '@testing-library/react';

import { Calendar, CalendarProps } from '../Calendar';
import { LangCodes } from '../../../lib/locale';
import { DatePickerLocaleHelper } from '../../DatePicker/locale';

const handleChange = () => undefined;
const defaultProps = { value: { year: 2017, month: 6, date: 2 }, onPick: handleChange };

const renderCalendar = (props: Partial<CalendarProps> = {}) => render(<Calendar {...defaultProps} {...props} />);

describe('Calendar', () => {
  it('renders', () => {
    renderCalendar();
    expect(screen.getByTestId('Calendar')).toBeInTheDocument();
  });

  it('correctly passes max and min date to year select', () => {
    renderCalendar({
      minDate: { year: 2017, month: 2, date: 21 },
      maxDate: { year: 2020, month: 7, date: 15 },
    });
    screen.getAllByTestId('DateSelect__caption')[1].click();
    expect(screen.getByText('2015')).toHaveAttribute('data-prop-disabled', 'true');
    expect(screen.getByText('2018')).toHaveAttribute('data-prop-disabled', 'false');
    expect(screen.queryByText('2021')).not.toBeInTheDocument();
  });

  it('correctly initial month/year with min date', () => {
    renderCalendar({
      minDate: { year: 2099, month: 0, date: 21 },
    });

    expect(screen.getAllByTestId('DateSelect__caption')[0]).toHaveTextContent(
      DatePickerLocaleHelper.get(LangCodes.ru_RU).months[6],
    );
    expect(screen.getAllByTestId('DateSelect__caption')[1]).toHaveTextContent('2017');
  });

  it('correctly initial month/year with max date', () => {
    renderCalendar({
      maxDate: { year: 1959, month: 10, date: 15 },
    });

    expect(screen.getAllByTestId('DateSelect__caption')[0]).toHaveTextContent(
      DatePickerLocaleHelper.get(LangCodes.ru_RU).months[6],
    );
    expect(screen.getAllByTestId('DateSelect__caption')[1]).toHaveTextContent('2017');
  });
});
