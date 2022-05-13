import React from 'react';
import { render, screen } from '@testing-library/react';

import { DatePickerLocaleHelper } from '../../../components/DatePicker/locale';
import { DateSelect, DateSelectProps } from '../DateSelect';

const renderSelect = (props: DateSelectProps) => render(<DateSelect {...props} />);

describe('DateSelect', () => {
  it('disable months not in range', () => {
    const expectedDisabledMonths = ['Январь', 'Февраль', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    renderSelect({
      type: 'month',
      minValue: 2,
      maxValue: 7,
      value: 6,
      onValueChange: () => {
        /**/
      },
    });
    screen.getByTestId('DateSelect__caption').click();
    expectedDisabledMonths.forEach((month) => {
      expect(screen.getByText(month)).toHaveAttribute('data-prop-disabled', 'true');
    });
  });

  it('works correct with January', () => {
    const expectedDisabledMonths = DatePickerLocaleHelper.get().months.slice(1);
    renderSelect({
      type: 'month',
      minValue: 0,
      maxValue: 0,
      value: 0,
      onValueChange: () => {
        /**/
      },
    });
    screen.getByTestId('DateSelect__caption').click();
    expectedDisabledMonths.forEach((month) => {
      expect(screen.getByText(month)).toHaveAttribute('data-prop-disabled', 'true');
    });
  });
});
