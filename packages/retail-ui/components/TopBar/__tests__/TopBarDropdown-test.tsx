// tslint:disable:jsx-no-lambda
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import MenuItem from '../../MenuItem/MenuItem';
import TopBarDropdown, { TopBarDropdownProps } from '../TopBarDropdown';
import Item from '../TopBarItem';

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

  describe("'use' prop", () => {
    it("can have 'danger' value", () => {
      const wrapper = mount<TopBarDropdown>(<TopBarDropdown label="TopBarDropdown" use="danger" />);
      wrapper.instance().open();
      wrapper.update();

      expect(
        wrapper
          .find(Item)
          .render()
          .hasClass('use-danger'),
      ).toBeTruthy();
    });

    it("can have 'pay' value", () => {
      const wrapper = mount<TopBarDropdown>(<TopBarDropdown label="TopBarDropdown" use="pay" />);
      wrapper.instance().open();
      wrapper.update();

      expect(
        wrapper
          .find(Item)
          .render()
          .hasClass('use-pay'),
      ).toBeTruthy();
    });

    it("can have 'default' value or be undefined", () => {
      const wrapperDefault = mount<TopBarDropdown>(<TopBarDropdown label="TopBarDropdown" use="default" />);
      wrapperDefault.instance().open();
      wrapperDefault.update();
      const itemClassesDefault = wrapperDefault.find(Item).render();

      const wrapperUndefined = mount<TopBarDropdown>(<TopBarDropdown label="TopBarDropdown" />);
      wrapperUndefined.instance().open();
      wrapperUndefined.update();
      const itemClassesUndefined = wrapperUndefined.find(Item).render();

      expect(itemClassesDefault.prop('class')).toEqual(itemClassesUndefined.prop('class'));
    });
  });
});
