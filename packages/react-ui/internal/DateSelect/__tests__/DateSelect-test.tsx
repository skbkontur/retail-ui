import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatePickerLocaleHelper } from '../../../components/DatePicker/locale';
import type { DateSelectProps } from '../DateSelect';
import { DateSelect } from '../DateSelect';

const renderSelect = (props: DateSelectProps) => render(<DateSelect {...props} />);

describe('DateSelect', () => {
  it('disable months not in range', async () => {
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
    await userEvent.click(screen.getByTestId('DateSelect__caption'));
    expectedDisabledMonths.forEach((month) => {
      expect(screen.getByText(month).parentElement).toHaveAttribute('data-prop-disabled', 'true');
    });
  });

  it('works correct with January', async () => {
    const expectedDisabledMonths = DatePickerLocaleHelper.get().months?.slice(1);
    renderSelect({
      type: 'month',
      minValue: 0,
      maxValue: 0,
      value: 0,
      onValueChange: () => {
        /**/
      },
    });
    await userEvent.click(screen.getByTestId('DateSelect__caption'));
    expectedDisabledMonths?.forEach((month) => {
      expect(screen.getByText(month).parentElement).toHaveAttribute('data-prop-disabled', 'true');
    });
  });
});
