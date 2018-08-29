import * as React from 'react';
import DatePicker, { DatePickerProps } from '../DatePicker';
import { mount } from 'enzyme';
import Calendar from '../../Calendar';

const handleChange = () => undefined;
const renderDatePicker = (props?: Partial<DatePickerProps<string>>) =>
  mount(<DatePicker onChange={handleChange} value="02.07.2017" {...props} />);

describe('DatePicker', () => {
  it('renders', () => {
    const datePicker = renderDatePicker();
    expect(datePicker.exists());
  });

  it('renders date select when open', () => {
    const datePicker = renderDatePicker();
    datePicker.setState({ opened: true });
    const dateSelect = datePicker.find('DateSelect');
    expect(dateSelect.exists());
  });

  it('correctly passes max and min date to year select', () => {
    const datePicker = renderDatePicker({
      minDate: '21.03.2017',
      maxDate: '15.08.2020'
    });
    datePicker.setState({ opened: true });
    const yearSelect = datePicker.findWhere(
      node => node.props().type === 'year'
    );
    expect(yearSelect.prop('minValue')).toEqual(2017);
    expect(yearSelect.prop('maxValue')).toEqual(2020);
  });

  it('correctly initial month/year with min date', () => {
    const datePicker = renderDatePicker({
      minDate: '21.01.2099'
    });

    datePicker.setState({ opened: true });

    const calendar = datePicker.find(Calendar);

    expect(calendar.prop('initialMonth')).toBe(0);
    expect(calendar.prop('initialYear')).toBe(2099);
  });

  it('correctly initial month/year with max date', () => {
    const datePicker = renderDatePicker({
      maxDate: '15.11.1959'
    });

    datePicker.setState({ opened: true });

    const calendar = datePicker.find(Calendar);

    expect(calendar.prop('initialMonth')).toBe(10);
    expect(calendar.prop('initialYear')).toBe(1959);
  });
});
