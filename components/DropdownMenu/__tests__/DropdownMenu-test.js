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
    const wrapper = shallow(<DropdownMenu caption={<span />} />);

    expect(wrapper).toHaveLength(1);
  });

  test('Throw, if caption is not passed', () => {
    expect(() => shallow(<DropdownMenu />)).toThrow();
  });

  test('Contains <Menu /> after clicking on caption', () => {
    const component = (
      <DropdownMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>
    );
    const wrapper = mount(component);
    const captionWrapper = wrapper.find('#captionForTest');

    expect(wrapper.find('InternalMenu')).toHaveLength(0);
    captionWrapper.simulate('click');

    expect(wrapper.find('InternalMenu')).toHaveLength(1);
  });

  test("Contains <MenuItem />'s after clicking on caption", () => {
    const component = (
      <DropdownMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>
    );
    const wrapper = mount(component);
    const captionWrapper = wrapper.find('#captionForTest');

    expect(wrapper.find('MenuItem')).toHaveLength(0);
    captionWrapper.simulate('click');

    expect(wrapper.find('MenuItem')).toHaveLength(3);
  });
});
