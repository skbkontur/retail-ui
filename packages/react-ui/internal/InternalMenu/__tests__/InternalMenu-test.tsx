import { mount } from 'enzyme';
import React from 'react';

import { InternalMenu } from '../InternalMenu';
import { MenuItem } from '../../../components/MenuItem';

describe('Menu', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('calls onClick on manually passed MenuItem', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <InternalMenu>
        <MenuItem onClick={onClick}>
          <span data-click />
        </MenuItem>
      </InternalMenu>,
    );

    wrapper.find('[data-click]').simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('does not call onClick on disabled MenuItem', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <InternalMenu>
        <MenuItem onClick={onClick} disabled>
          <span data-click />
        </MenuItem>
      </InternalMenu>,
    );

    wrapper.find('[data-click]').simulate('click');

    expect(onClick.mock.calls.length).toBe(0);
  });

  it('calls onMouseEnter', () => {
    const onMouseEnter = jest.fn();
    const wrapper = mount(
      <InternalMenu>
        <MenuItem onMouseEnter={onMouseEnter} />
      </InternalMenu>,
    );

    const props = wrapper.find(MenuItem).props();

    if (props.onMouseEnter) {
      props.onMouseEnter({} as React.MouseEvent);
    }

    expect(onMouseEnter.mock.calls.length).toBe(1);
  });

  it('calls onMouseLeave', () => {
    const onMouseLeave = jest.fn();
    const wrapper = mount(
      <InternalMenu>
        <MenuItem onMouseLeave={onMouseLeave} />
      </InternalMenu>,
    );

    const props = wrapper.find(MenuItem).props();

    if (props.onMouseLeave) {
      props.onMouseLeave({} as React.MouseEvent);
    }

    expect(onMouseLeave.mock.calls.length).toBe(1);
  });
});
