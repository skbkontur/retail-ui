import { mount } from 'enzyme';
import React from 'react';

import { Menu } from '../Menu';
import { MenuItem } from '../../../components/MenuItem';

describe('Menu', () => {
  it('calls existing refs of children when highlighted', () => {
    const refItem = jest.fn();
    const wrapper = mount<Menu>(
      <Menu>
        <MenuItem ref={refItem} />
      </Menu>,
    );
    const menu = wrapper.instance();

    // Highlight first item.
    menu.down();

    // 1. Called initially.
    // 2. Changed with a wrapper function. Previous function called with null.
    // 3. The wrapper function called.
    expect(refItem.mock.calls).toHaveLength(3);
    expect(refItem.mock.calls[2][0]).toBeTruthy();
  });

  it('calls onClick on manually passed MenuItem', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Menu>
        <MenuItem onClick={onClick}>
          <span data-click />
        </MenuItem>
      </Menu>,
    );

    wrapper.find('[data-click]').simulate('click');

    expect(onClick.mock.calls).toHaveLength(1);
  });

  it('does not call onClick on disabled MenuItem', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Menu>
        <MenuItem onClick={onClick} disabled>
          <span data-click />
        </MenuItem>
      </Menu>,
    );

    wrapper.find('[data-click]').simulate('click');

    expect(onClick.mock.calls).toHaveLength(0);
  });
});
