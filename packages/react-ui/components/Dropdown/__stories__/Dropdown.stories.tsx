import React from 'react';
import { StoryFn } from '@storybook/addons';
import AddIcon from '@skbkontur/react-icons/Add';
import BabyIcon from '@skbkontur/react-icons/Baby';
import { CSFStory } from 'creevey';

import { Dropdown } from '../Dropdown';
import { MenuItem } from '../../MenuItem';

export default {
  title: 'Dropdown',
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div className="dropdown-test-container" style={{ height: 150, width: 400, padding: 4 }}>
        {story()}
      </div>
    ),
  ],
};

export const SimpleDropdown: CSFStory<JSX.Element> = () => (
  <Dropdown caption="Items">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);

SimpleDropdown.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat'], tests: 'MenuItem hover' }],
    tests: {
      async idle() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await this.expect(await element.takeScreenshot()).to.matchImage('idle');
      },
      async clicked() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name^="Dropdown"]' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('clicked');
      },
      async ['MenuItem hover']() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name^="Dropdown"]' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .move({
            origin: this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }),
          })
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('MenuItem hover');
      },
      async ['selected item']() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name^="Dropdown"]' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('selected item');
      },
    },
  },
};

export const WithFixedWidth: CSFStory<JSX.Element> = () => (
  <Dropdown caption="Items" width={300}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithFixedWidth.storyName = 'With fixed width';
WithFixedWidth.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithOverflow = () => (
  <Dropdown caption="Lorem ipsum dollar all mubarak ibn ahmed" width={100}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithOverflow.storyName = 'With overflow';
WithOverflow.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithIcon = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIcon.storyName = 'With icon';
WithIcon.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithMenuItemIcon: CSFStory<JSX.Element> = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem icon={<AddIcon />}>Menu item</MenuItem>
    <MenuItem>Another item</MenuItem>
  </Dropdown>
);
WithMenuItemIcon.storyName = 'With MenuItem icon';

WithMenuItemIcon.parameters = {
  creevey: {
    captureElement: '.dropdown-test-container',
    tests: {
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name^="Dropdown"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
    },
  },
};

export const WithIconAndOverflow = () => (
  <Dropdown icon={<AddIcon />} caption="Lorem ipsum dollar all mubarak ibn ahmed" width="100px">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIconAndOverflow.storyName = 'With icon and overflow';
WithIconAndOverflow.parameters = { creevey: { captureElement: '.dropdown-test-container' } };
