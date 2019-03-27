import { mount } from 'enzyme';
import * as React from 'react';
import PopupMenu from '../';
import MenuItem from '../../../MenuItem';
import { PopupMenuCaptionProps } from '../PopupMenu';

const renderCaption = (captionProps: PopupMenuCaptionProps) => (
  <button
    id="caption"
    // tslint:disable-next-line:jsx-no-lambda
    onClick={() => captionProps.openMenu(true)}
    className={captionProps.opened ? 'opened' : 'closed'}
  >
    test
  </button>
);

describe('PopupMenu', () => {
  it('pass element to caption', () => {
    const wrapper = mount(
      <PopupMenu
        caption={<button id="caption">test</button>}
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
      >
        <MenuItem />
      </PopupMenu>,
    );

    expect(wrapper.state('menuVisible')).toBeFalsy();

    wrapper.find('#caption').simulate('click');

    expect(wrapper.state('menuVisible')).toBeTruthy();
  });

  it('pass function to caption', () => {
    const wrapper = mount(
      <PopupMenu caption={renderCaption} positions={['bottom left', 'bottom right', 'top left', 'top right']}>
        <MenuItem />
      </PopupMenu>,
    );

    const getCaption = () => wrapper.find('#caption');

    expect(wrapper.state('menuVisible')).toBeFalsy();
    expect(getCaption().hasClass('closed')).toBeTruthy();
    expect(getCaption().hasClass('opened')).toBeFalsy();

    getCaption().simulate('click');

    expect(wrapper.state('menuVisible')).toBeTruthy();
    expect(getCaption().hasClass('opened')).toBeTruthy();
    expect(getCaption().hasClass('closed')).toBeFalsy();
  });
});
