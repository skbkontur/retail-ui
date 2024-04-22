import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';

import { delay } from '../../../lib/utils';
import { CreeveyTests, Meta } from '../../../typings/stories';
import { MenuHeader } from '../../../components/MenuHeader';
import { MenuItem } from '../../../components/MenuItem';
import { PopupMenuDataTids } from '../../../internal/PopupMenu';
import { Kebab } from '../Kebab';

export default {
  title: 'Kebab/Functional tests',
  decorators: [
    (Story: () => JSX.Element) => (
      <div
        style={{
          padding: '180px 0',
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
  <div style={{ width: 200, textAlign: 'center' }}>
    <Kebab>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Kebab>
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
    <Kebab preventIconsOffset>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
      <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Kebab>
  </div>
);
WithItemsAndIconsWithoutTextAlignment.parameters = {
  creevey: {
    tests: textAlignmentTests,
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } },
  },
};
