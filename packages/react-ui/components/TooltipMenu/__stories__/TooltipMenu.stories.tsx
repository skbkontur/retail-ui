import React from 'react';
import MenuIcon from '@skbkontur/react-icons/Menu';
import LightbulbIcon from '@skbkontur/react-icons/Lightbulb';

import { Meta, Story } from '../../../typings/stories';
import { MenuItem } from '../../MenuItem';
import { MenuHeader } from '../../MenuHeader';
import { MenuSeparator } from '../../MenuSeparator';
import { TooltipMenu } from '../TooltipMenu';
import { Button } from '../../Button';

export default {
  title: 'TooltipMenu',
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

export const SimpleExample: Story = () => (
  <TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </TooltipMenu>
);
SimpleExample.storyName = 'Simple example';

SimpleExample.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async clickAfterClickedOnCaption() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
          .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clickAfterClickedOnCaption');
      },
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
      async clickedOutside() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="PopupMenu"]' }))
          .click(this.browser.findElement({ css: 'body' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clickedOutside');
      },
      async tabPress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
      },
      async enterPress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .sendKeys(this.keys.ENTER)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
      },
      async escapePress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .sendKeys(this.keys.ENTER)
          .sendKeys(this.keys.ESCAPE)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('escapePress');
      },
    },
  },
};

export const ExampleWithWidthOfMenu = () => (
  <TooltipMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={300}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </TooltipMenu>
);
ExampleWithWidthOfMenu.storyName = 'Example with width of menu';
ExampleWithWidthOfMenu.parameters = { creevey: { skip: true } };

export const ExampleWithMaximumHeightOfMenu = () => (
  <TooltipMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
    <MenuHeader>Заголовок меню</MenuHeader>
    <MenuSeparator />
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </TooltipMenu>
);
ExampleWithMaximumHeightOfMenu.storyName = 'Example with maximum height of menu';
ExampleWithMaximumHeightOfMenu.parameters = { creevey: { skip: true } };

export const CaptionAcceptsAnArbitraryElement = () => (
  <TooltipMenu
    caption={
      <span style={{ display: 'inline-block' }} tabIndex={0}>
        <MenuIcon size={32} />
      </span>
    }
    menuWidth="220px"
  >
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </TooltipMenu>
);
CaptionAcceptsAnArbitraryElement.storyName = 'Caption accepts an arbitrary element';
CaptionAcceptsAnArbitraryElement.parameters = { creevey: { skip: true } };

export const MenuInRightPositionOnly = () => (
  <TooltipMenu
    caption={
      <span style={{ display: 'inline-block' }} tabIndex={0}>
        <LightbulbIcon size={32} />
      </span>
    }
    menuWidth="160px"
    positions={['right top', 'right middle', 'right bottom']}
  >
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </TooltipMenu>
);
MenuInRightPositionOnly.storyName = 'Menu in right position only';
MenuInRightPositionOnly.parameters = { creevey: { skip: true } };

export const MenuInTopPositionOnlyAlignRight = () => (
  <TooltipMenu
    caption={
      <span style={{ display: 'inline-block' }} tabIndex={0}>
        <LightbulbIcon size={32} />
      </span>
    }
    menuWidth="150px"
    positions={['top right']}
  >
    <MenuItem>Раз</MenuItem>
    <MenuItem>Два</MenuItem>
    <MenuItem>Три</MenuItem>
  </TooltipMenu>
);
MenuInTopPositionOnlyAlignRight.storyName = 'Menu in top position only, align right';
MenuInTopPositionOnlyAlignRight.parameters = { creevey: { skip: true } };

export const MenuWithoutAnimations = () => (
  <TooltipMenu disableAnimations caption={<Button use="primary">Нет анимации</Button>}>
    <MenuHeader>Анимация не пройдет</MenuHeader>
    <MenuSeparator />
    <MenuItem>Я не верю в мультики</MenuItem>
  </TooltipMenu>
);
MenuWithoutAnimations.storyName = 'Menu without animations';
MenuWithoutAnimations.parameters = { creevey: { skip: true } };
