import React from 'react';

import { delay } from '../../../lib/utils';
import { Button } from '../../Button';
import { CreeveyTests, Meta } from '../../../typings/stories';
import { DropdownMenu } from '../DropdownMenu';
import { MenuHeader } from '../../../components/MenuHeader';
import { MenuItem } from '../../../components/MenuItem';
import { OkIcon } from '../../../internal/icons/16px';
import { PopupMenuDataTids } from '../../../internal/PopupMenu';

export default {
  title: 'DropdownMenu/Functional tests',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px 120px 150px',
          border: '1px solid #dfdede',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    creevey: {
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b)/ } },
    },
  },
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

export const WithItemsAndIcons = () => (
  <DropdownMenu caption={<Button>Click me</Button>}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
    <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </DropdownMenu>
);
WithItemsAndIcons.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};

export const WithItemsAndIconsWithoutTextAlignment = () => (
  <DropdownMenu preventIconsOffset caption={<Button>Click me</Button>}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
    <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </DropdownMenu>
);
WithItemsAndIconsWithoutTextAlignment.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};
