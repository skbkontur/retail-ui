import React from 'react';

import { delay } from '../../../lib/utils';
import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { OkIcon } from '../../icons/16px';
import { PopupMenu, PopupMenuDataTids } from '../PopupMenu';
import { MenuItem } from '../../../components/MenuItem';
import { MenuHeader } from '../../../components/MenuHeader';
import { Button } from '../../../components/Button';

export default {
  title: 'PopupMenu/Functional tests',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 200,
          border: '1px solid #dfdede',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const textAlignmentTests: CreeveyTests = {
  async opened() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: `[data-tid~="${PopupMenuDataTids.caption}"]` }))
      .perform();
    await delay(1000);

    await this.expect(await this.takeScreenshot()).to.matchImage('opened');
  },
};

export const WithItems: Story = () => (
  <PopupMenu caption={<Button>Click me</Button>}>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);
WithItems.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};
WithItems.storyName = 'with Items';

export const WithItemsWithIcons: Story = () => (
  <PopupMenu caption={<Button>Click me</Button>}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
    <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);
WithItemsWithIcons.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};

export const WithItemsWithIconsWithoutTextAlignment: Story = () => (
  <PopupMenu preventIconsOffset caption={<Button>Click me</Button>}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
    <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);
WithItemsWithIconsWithoutTextAlignment.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};
