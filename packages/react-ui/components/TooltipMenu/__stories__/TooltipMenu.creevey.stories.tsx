import React from 'react';
import MenuIcon from '@skbkontur/react-icons/Menu';
import LightbulbIcon from '@skbkontur/react-icons/Lightbulb';

import { delay } from '../../../lib/utils';
import { CreeveyTests, Meta } from '../../../typings/stories';
import { TooltipMenu } from '../TooltipMenu';
import { MenuHeader } from '../../../components/MenuHeader';
import { MenuItem } from '../../../components/MenuItem';
import { PopupMenuDataTids } from '../../../internal/PopupMenu';

export default {
  title: 'TooltipMenu/Functional tests',
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
  <div style={{ width: 200, textAlign: 'center' }}>
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex={0}>
          <MenuIcon size={32} />
        </span>
      }
    >
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<LightbulbIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<LightbulbIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </TooltipMenu>
  </div>
);
WithItemsAndIcons.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};

export const WithItemsAndIconsWithoutTextAlignment = () => (
  <div style={{ width: 200, textAlign: 'center' }}>
    <TooltipMenu
      caption={
        <span style={{ display: 'inline-block' }} tabIndex={0}>
          <MenuIcon size={32} />
        </span>
      }
      enableTextAlignment={false}
    >
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<LightbulbIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<LightbulbIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </TooltipMenu>
  </div>
);
WithItemsAndIconsWithoutTextAlignment.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};
