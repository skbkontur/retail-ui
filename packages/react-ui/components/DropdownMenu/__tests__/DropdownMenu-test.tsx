import React from 'react';
import { mount, shallow } from 'enzyme';

import { DropdownMenu } from '../DropdownMenu';
import { MenuItem } from '../../MenuItem';

describe('<DropdownMenu />', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('Render without crashes', () => {
    const wrapper = shallow(<DropdownMenu caption={<span />} />);

    expect(wrapper).toHaveLength(1);
  });

  test('Throw, if caption is not passed', () => {
    // console.log(shallow(<DropdownMenu />).debug());
    expect(() => shallow(<DropdownMenu caption={undefined} />)).toThrow();
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

  test('Click handler on menu item should be called before closing', () => {
    let testText = 'Foo bar';
    const wrapper = mount(
      <DropdownMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem
          onClick={() => {
            testText = 'Bar foo';
          }}
        >
          Test
        </MenuItem>
      </DropdownMenu>,
    );
    const captionWrapper = wrapper.find('#captionForTest');

    expect(wrapper.find('MenuItem')).toHaveLength(0);
    captionWrapper.simulate('click');

    const menuItemWrapper = wrapper.find('MenuItem');
    expect(menuItemWrapper).toHaveLength(1);

    menuItemWrapper.simulate('click');
    expect(testText).toBe('Bar foo');
  });

  test('Fire onOpen and onClose when open and close dropdown', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const wrapper = mount(
      <DropdownMenu caption={<button id="captionForTest">Test</button>} onOpen={onOpen} onClose={onClose}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    // open
    wrapper.find('#captionForTest').simulate('click');
    expect(onOpen.mock.calls).toHaveLength(1);

    // close
    wrapper.find('MenuItem').simulate('click');
    expect(onClose.mock.calls).toHaveLength(1);
  });

  test('Renders header', () => {
    const wrapper = mount(
      <DropdownMenu caption={<button id="captionForTest">Test</button>} header={<div id="testHeader">Test header</div>}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    wrapper.find('#captionForTest').simulate('click');

    expect(wrapper.find('#testHeader')).toHaveLength(1);
  });

  test('Renders footer', () => {
    const wrapper = mount(
      <DropdownMenu caption={<button id="captionForTest">Test</button>} footer={<div id="testFooter">Test header</div>}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    wrapper.find('#captionForTest').simulate('click');

    expect(wrapper.find('#testFooter')).toHaveLength(1);
  });
});
