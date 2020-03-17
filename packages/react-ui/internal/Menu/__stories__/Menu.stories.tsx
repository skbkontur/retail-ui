import React from 'react';
import { StoryFn } from '@storybook/addons';
import { CSFStory } from 'creevey';

import { Menu } from '../Menu';
import { MenuItem } from '../../../components/MenuItem';
import { MenuHeader } from '../../../components/MenuHeader';
import { MenuSeparator } from '../../../components/MenuSeparator';

export default {
  title: 'Menu',
  parameters: { creevey: { captureElement: '#menu-test-container' } },
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div id="menu-test-container" style={{ padding: 10 }}>
        {story()}
      </div>
    ),
  ],
};

export const WithItems = () => (
  <Menu>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithItems.story = { name: 'with Items' };

export const WithHeader = () => (
  <Menu>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithHeader.story = { name: 'with Header' };

export const WithSeparator = () => (
  <Menu>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
  </Menu>
);
WithSeparator.story = { name: 'with Separator' };

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
WithCustomChild.story = { name: 'with Custom Child' };

export const WithMaxHeight: CSFStory<JSX.Element> = () => (
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
WithMaxHeight.story = {
  name: 'with maxHeight',
  parameters: {
    creevey: {
      captureElement: '[data-tid="menu-container"',
      tests: {
        async idle() {
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async ['moved up from top to the last Item']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#move-up' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('moved up from top to the last Item');
        },
        async ['moved up from bottom to the first Item']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-up' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('moved up from bottom to the first Item');
        },
        async ['moved down from top to the last Item']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-down' }))
            .click(this.browser.findElement({ css: '#move-down' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('moved down from top to the last Item');
        },
        async ['moved down from bottom to the first Item']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-up' }))
            .click(this.browser.findElement({ css: '#move-down' }))
            .click(this.browser.findElement({ css: '#move-down' }))
            .click(this.browser.findElement({ css: '#move-down' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('moved down from bottom to the first Item');
        },
      },
    },
  },
};

export const WithWidth = () => (
  <Menu width={300}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>LongItem LongItem LongItem LongItem LongItem LongItem</MenuItem>
  </Menu>
);
WithWidth.story = { name: 'with width' };

export const WithLongItems = () => (
  <Menu>
    <MenuHeader>MenuHeaderMenuHeaderMenuHeaderMenuHeader</MenuHeader>
    <MenuItem>MenuItem1 MenuItem1 MenuItem1 MenuItem1 MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithLongItems.story = { name: 'with long Items' };

export const WithoutShadow = () => (
  <Menu hasShadow={false}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem>MenuItem1</MenuItem>
    <MenuSeparator />
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </Menu>
);
WithoutShadow.story = { name: 'without Shadow' };

export const WithDisabledMenuItem: CSFStory<JSX.Element> = () => (
  <Menu hasShadow={false}>
    <MenuItem disabled>MenuItem1</MenuItem>
    <MenuItem data-tid="menuitem-notdisabled">MenuItem2</MenuItem>
  </Menu>
);
WithDisabledMenuItem.story = {
  name: 'with disabled MenuItem',
  parameters: {
    creevey: {
      tests: {
        async mouseenter() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-tid="menuitem-notdisabled"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('mouseenter');
        },
      },
    },
  },
};

class MoveControls extends React.Component {
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
            ? React.cloneElement(this.props.children, { ref: this.refMenu })
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
