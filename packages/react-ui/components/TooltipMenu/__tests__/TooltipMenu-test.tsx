import React from 'react';
//import { mount, shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TooltipMenu } from '../TooltipMenu';
import { MenuItem } from '../../MenuItem';
import { TooltipMenuDataTids } from '..';


describe('<TooltipMenu />', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('Render without crashes', () => {
    render(<TooltipMenu caption={<span />} />);

    expect(screen.getByTestId(TooltipMenuDataTids.root)).toBeInTheDocument();
  });

  test('Throw, if caption is not passed', () => {
    // @ts-expect-error: `caption` prop is purposefully not provided.
    const renderNoCaption = () => render(<TooltipMenu />);

    expect(renderNoCaption).toThrow('Prop "caption" is required!!!');
  });

  test.only('Contains <Menu /> after clicking on caption', () => {
    render(
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>First MenuItem</MenuItem>
      </TooltipMenu>
    );
    const caption = screen.getByRole('button');

    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.getByTestId('InternalMenu__root')).not.toBeInTheDocument();
    userEvent.click(caption);

    expect(screen.getByTestId('InternalMenu__root')).toBeInTheDocument();
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
