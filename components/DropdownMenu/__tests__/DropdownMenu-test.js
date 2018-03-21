// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import DropdownMenu from '../';
import MenuItem from '../../MenuItem';

describe('<DropdownMenu />', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('Render without crashes', () => {
    const component = shallow(<DropdownMenu renderCaption={jest.fn} />);

    expect(component).toHaveLength(1);
  });

  test('Contain <Menu /> after open', () => {
    const renderCaption = () => <button>Test</button>;
    const component = (
      <DropdownMenu renderCaption={renderCaption}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>
    );
    const wrapper = mount(component);

    expect(wrapper.find('MenuNew')).toHaveLength(0);
    wrapper.instance()._showMenu();
    wrapper.update();

    expect(wrapper.find('MenuNew')).toHaveLength(2);
  });
});
