import React, { useState } from 'react';

import { delay } from '../../../lib/utils';
import { Button } from '../../Button';
import { CreeveyTests, Meta } from '../../../typings/stories';
import { DropdownMenu } from '../DropdownMenu';
import { MenuHeader } from '../../MenuHeader';
import { MenuItem } from '../../MenuItem';
import { OkIcon } from '../../../internal/icons/16px';
import { PopupMenuDataTids } from '../../../internal/PopupMenu';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';

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

const navigateInNestedMenuItems: CreeveyTests = {
  async navigate() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: `[data-tid~="${PopupMenuDataTids.caption}"]` }))
      .sendKeys(this.keys.DOWN)
      .sendKeys(this.keys.DOWN)
      .perform();
    const arrowDown = await this.browser.takeScreenshot();

    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ENTER)
      .perform();
    await delay(1000);
    const enter = await this.browser.takeScreenshot();

    await this.expect({ arrowDown, enter }).to.matchImages();
  },
};

export const WithNestedMenuItems = () => {
  const [caption, setCaption] = useState('not selected');
  const onClick = () => {
    setCaption('selected');
  };
  return (
    <ReactUIFeatureFlagsContext.Provider value={{ menuItemsAtAnyLevel: true }}>
      <DropdownMenu menuWidth="300px" caption={<Button use="primary">{caption}</Button>}>
        <>
          <div>
            <MenuItem>Раз</MenuItem>
            <MenuItem onClick={onClick}>Два</MenuItem>
          </div>
          <MenuItem>Три</MenuItem>
        </>
      </DropdownMenu>
    </ReactUIFeatureFlagsContext.Provider>
  );
};
WithNestedMenuItems.storyName = 'With nested menu items';
WithNestedMenuItems.parameters = {
  creevey: {
    tests: navigateInNestedMenuItems,
  },
};
