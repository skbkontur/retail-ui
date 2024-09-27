import React from 'react';

import { Meta, Story } from '../../../typings/stories';
import { CheckAIcon16Regular } from '../../../internal/icons2022/CheckAIcon/CheckAIcon16Regular';
import { Menu } from '../Menu';
import { MenuItem, MenuItemProps } from '../../../components/MenuItem';
import { MenuHeader } from '../../../components/MenuHeader';
import { MenuSeparator } from '../../../components/MenuSeparator';

export default {
  title: 'Menu',
  parameters: { creevey: { captureElement: '#menu-test-container' } },
  decorators: [
    (Story: () => JSX.Element) => (
      <div id="menu-test-container" style={{ padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const WithItems = () => (
  <Menu>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithItems.storyName = 'with Items';

export const WithItemsWithIcons = () => (
  <Menu>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);

export const WithItemsWithIconsWithoutTextAlignment = () => (
  <Menu preventIconsOffset>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);

export const WithHeader = () => (
  <Menu>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithHeader.storyName = 'with Header';

export const WithSeparator = () => (
  <Menu>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
  </Menu>
);
WithSeparator.storyName = 'with Separator';

export const WithCustomChild = () => (
  <Menu>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
    <div style={{ padding: '8px' }}>
      <i>CustomChild</i>
    </div>
  </Menu>
);
WithCustomChild.storyName = 'with Custom Child';

export const WithMaxHeight: Story = () => (
  <MoveControls>
    <Menu maxHeight={100}>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem>MenuItem1</MenuItem>
      <MenuSeparator />
      <MenuItem>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
      <MenuHeader>MenuFooter</MenuHeader>
    </Menu>
  </MoveControls>
);
WithMaxHeight.storyName = 'with maxHeight';

export const WithWidth = () => (
  <Menu width={300}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>LongItem LongItem LongItem LongItem LongItem LongItem</MenuItem>
  </Menu>
);
WithWidth.storyName = 'with width';

export const WithLongItems = () => (
  <Menu>
    <MenuHeader>MenuHeaderMenuHeaderMenuHeaderMenuHeader</MenuHeader>
    <MenuItem>MenuItem1 MenuItem1 MenuItem1 MenuItem1 MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithLongItems.storyName = 'with long Items';

export const WithoutShadow = () => (
  <Menu>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithoutShadow.storyName = 'without Shadow';

export const WithDisabledMenuItem: Story = () => (
  <Menu>
    <MenuItem disabled>MenuItem1</MenuItem>
    <MenuItem data-tid="menuitem-notdisabled">MenuItem2</MenuItem>
  </Menu>
);
WithDisabledMenuItem.storyName = 'with disabled MenuItem';

class MoveControls extends React.Component<React.PropsWithChildren> {
  private menu: Menu | null = null;

  public render() {
    return (
      <div>
        <div id="move-buttons">
          <button id="move-up" onClick={this.moveUp}>
            Move Up
          </button>
          <button id="move-down" onClick={this.moveDown}>
            Move Down
          </button>
        </div>
        <br />
        <div data-tid="menu-container" style={{ padding: 10 }}>
          {React.isValidElement(this.props.children)
            ? React.cloneElement(this.props.children, { ref: this.refMenu } as MenuItemProps)
            : this.props.children}
        </div>
      </div>
    );
  }

  private refMenu = (el: Menu) => {
    this.menu = el;
  };

  private moveUp = () => {
    if (this.menu) {
      this.menu.up();
    }
  };

  private moveDown = () => {
    if (this.menu) {
      this.menu.down();
    }
  };
}
