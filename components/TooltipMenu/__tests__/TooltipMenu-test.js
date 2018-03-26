// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import TooltipMenu from '../';
import MenuItem from '../../MenuItem';

describe('<TooltipMenu />', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('Render without crashes', () => {
    const wrapper = shallow(<TooltipMenu caption={<span />} />);

    expect(wrapper).toHaveLength(1);
  });

  test('Throw, if caption is not passed', () => {
    expect(() => shallow(<TooltipMenu />)).toThrow();
  });

  test('Contains <Menu /> after clicking on caption', () => {
    const component = (
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>Test</MenuItem>
      </TooltipMenu>
    );
    const wrapper = mount(component);
    const captionWrapper = wrapper.find('#captionForTest');

    expect(wrapper.find('InternalMenu')).toHaveLength(0);
    captionWrapper.simulate('click');

    expect(wrapper.find('InternalMenu')).toHaveLength(1);
  });

  test("Contains <MenuItem />'s after clicking on caption", () => {
    const component = (
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </TooltipMenu>
    );
    const wrapper = mount(component);
    const captionWrapper = wrapper.find('#captionForTest');

    expect(wrapper.find('MenuItem')).toHaveLength(0);
    captionWrapper.simulate('click');

    expect(wrapper.find('MenuItem')).toHaveLength(3);
  });

  test('Throw, if passed unexpected position', () => {
    const element = (
      <TooltipMenu
        caption={<button id="captionForTest">Test</button>}
        positions={['top left', 'foo bar']}
      >
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </TooltipMenu>
    );
    expect(() => mount(element)).toThrow('Unxpected position "foo bar"');
  });

  test('Render without crashes if passed expected positions', () => {
    const element = (
      <TooltipMenu caption={<span />} positions={['top left', 'top right']} />
    );

    expect(shallow(element)).toHaveLength(1);
  });
});
