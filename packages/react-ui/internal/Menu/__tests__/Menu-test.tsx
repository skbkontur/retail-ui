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

    expect(refItem.mock.calls).toHaveLength(1);
    expect(refItem.mock.calls[0][0]).toBeTruthy();
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
