import { mount } from 'enzyme';
import React from 'react';

import { InternalMenu } from '../InternalMenu';
import { MenuItem } from '../../../components/MenuItem';

describe('Menu', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('calls existing refs of children when highlighted', () => {
    const refItem = jest.fn();
    const wrapper = mount(
      <InternalMenu>
        <MenuItem ref={refItem} />
      </InternalMenu>,
    );

    // Highlight first item.
    wrapper.simulate('keyDown', { key: 'ArrowDown' });

    // 1. Called initially.
    // 2. Changed with a wrapper function. Previous function called with null.
    // 3. The wrapper function called.
    expect(refItem.mock.calls).toHaveLength(3);
    expect(refItem.mock.calls[2][0]).toBeTruthy();
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

    expect(onClick.mock.calls).toHaveLength(1);
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

    expect(onClick.mock.calls).toHaveLength(0);
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

    expect(onMouseEnter.mock.calls).toHaveLength(1);
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

    expect(onMouseLeave.mock.calls).toHaveLength(1);
  });
});
