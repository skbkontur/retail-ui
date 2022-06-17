import React from 'react';
import { mount, shallow } from 'enzyme';

import { TooltipMenu } from '../TooltipMenu';
import { MenuItem } from '../../MenuItem';

describe('<TooltipMenu />', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('Render without crashes', () => {
    const wrapper = shallow(<TooltipMenu caption={<span />} />);

    expect(wrapper).toHaveLength(1);
  });

  test('Throw, if caption is not passed', () => {
    // @ts-ignore
    expect(() => shallow(<TooltipMenu />)).toThrow();
  });

  test('Contains <InternalMenu /> after clicking on caption', () => {
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

  test('Render without crashes if passed expected positions', () => {
    const element = <TooltipMenu caption={<span />} positions={['top left', 'top right']} />;

    expect(shallow(element)).toHaveLength(1);
  });

  test('Click handler on menu item should be called before closing', () => {
    let testText = 'Foo bar';
    const wrapper = mount(
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem
          onClick={() => {
            testText = 'Bar foo';
          }}
        >
          Test
        </MenuItem>
      </TooltipMenu>,
    );
    const captionWrapper = wrapper.find('#captionForTest');

    expect(wrapper.find('MenuItem')).toHaveLength(0);
    captionWrapper.simulate('click');

    const menuItemWrapper = wrapper.find('MenuItem');
    expect(menuItemWrapper).toHaveLength(1);

    menuItemWrapper.simulate('click');
    expect(testText).toBe('Bar foo');
  });
});
