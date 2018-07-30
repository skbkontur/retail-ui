import * as React from 'react';
import DateSelect from '../DateSelect';
import styles = require('../DateSelect.less');
import { mount } from 'enzyme';

const renderSelect = props => mount(<DateSelect {...props} />);

describe('DateSelect', () => {
  const expectedDisabledMonths = [
    'Январь',
    'Февраль',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  it('disable months not in range', () => {
    const dateSelect = renderSelect({
      type: 'month',
      minValue: 2,
      maxValue: 7,
      value: 6
    });
    dateSelect.find(`.${styles.caption}`).simulate('click');
    const disabledItems = dateSelect.find('.' + styles.menuItemDisabled);
    const disabledItemsMonths = disabledItems.map(
      item => item.props().children
    );
    expect(disabledItemsMonths).toEqual(expectedDisabledMonths);
  });
});
