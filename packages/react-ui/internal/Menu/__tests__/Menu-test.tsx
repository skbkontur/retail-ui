import { mount } from 'enzyme';
import React from 'react';

import { Menu } from '../Menu';
import { MenuItem } from '../../../components/MenuItem';

describe('Menu', () => {
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

    expect(onClick.mock.calls.length).toBe(1);
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

    expect(onClick.mock.calls.length).toBe(0);
  });
});
