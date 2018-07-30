import * as React from 'react';
import DatePicker from '../DatePicker';
import DateSelect, { MONTHS } from '../../DateSelect';
import { mount } from 'enzyme';

const renderDatePicker = props =>
  mount(<DatePicker onChange={() => {}} value="02.07.2017" {...props} />);

describe('DatePicker', () => {
  it('renders', () => {
    const datePicker = renderDatePicker({});
    expect(datePicker.exists());
  });

  it('renders date select when open', () => {
    const datePicker = renderDatePicker({});
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
});
