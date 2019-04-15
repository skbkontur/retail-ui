// tslint:disable:jsx-no-lambda
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import MenuItem from '../../MenuItem/MenuItem';
import TopBarDropdown, { TopBarDropdownProps } from '../TopBarDropdown';

describe('TopBarDropdown', () => {
  describe('open/close methods', () => {
    let wrapper: ReactWrapper<TopBarDropdownProps, {}, TopBarDropdown>;

    beforeEach(() => {
      wrapper = mount<TopBarDropdown>(
        <TopBarDropdown label="TopBarDropdown">
          <MenuItem>MenuItem</MenuItem>
        </TopBarDropdown>,
      );
      wrapper.instance().open();
      wrapper.update();
    });

    it('opens', () => {
      expect(wrapper.find(MenuItem)).toHaveLength(1);
    });

    it('closes', () => {
      wrapper.instance().close();
      wrapper.update();
      expect(wrapper.find(MenuItem)).toHaveLength(0);
    });
  });
});
