import * as React from 'react';
import { DatePickerLocaleHelper } from '../../DatePicker/locale';
import DateSelect from '../DateSelect';
import styles from '../DateSelect.less';
import { mount } from 'enzyme';
import { DateSelectProps } from '../DateSelect';

const renderSelect = (props: DateSelectProps) => mount(<DateSelect {...props} />);

describe('DateSelect', () => {
  it('disable months not in range', () => {
    const expectedDisabledMonths = ['Январь', 'Февраль', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const dateSelect = renderSelect({
      type: 'month',
      minValue: 2,
      maxValue: 7,
      value: 6,
      onChange: () => {
        /**/
      },
    });
    dateSelect.find(`.${styles.caption}`).simulate('click');
    const disabledItems = dateSelect.find('.' + styles.menuItemDisabled);
    const disabledItemsMonths = disabledItems.map(item => item.props().children);
    expect(disabledItemsMonths).toEqual(expectedDisabledMonths);
  });

  it('works correct with January', () => {
    const expectedDisabledMonths = DatePickerLocaleHelper.get().months.slice(1);
    const dateSelect = renderSelect({
      type: 'month',
      minValue: 0,
      maxValue: 0,
      value: 0,
      onChange: () => {
        /**/
      },
    });
    dateSelect.find(`.${styles.caption}`).simulate('click');
    const disabledItems = dateSelect.find('.' + styles.menuItemDisabled);
    const disabledItemsMonths = disabledItems.map(item => item.props().children);
    expect(disabledItemsMonths).toEqual(expectedDisabledMonths);
  });
});
