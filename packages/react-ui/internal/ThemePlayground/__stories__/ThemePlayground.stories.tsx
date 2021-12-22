import React from 'react';

import { Story } from '../../../typings/stories';
import { ThemeContextPlayground } from '../../../internal/ThemePlayground/ThemeContextPlayground';
import { delay } from '../../../lib/utils';

export default { title: 'ThemeProvider' };

export const Playground: Story = () => <ThemeContextPlayground />;
Playground.storyName = 'playground';

Playground.parameters = {
  creevey: {
    skip: [
      {
        tests: ['default theme top', 'flat theme top', 'dark theme top'],
        in: ['ie11', 'ie118px', 'ie11NewTheme'],
        reason: 'flacky input outlines',
      },
    ],
    tests: {
      async ['default theme top']() {
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('default theme top');
      },
      async ['default theme bottom']() {
        await this.browser.executeScript(function () {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('default theme bottom');
      },
      async ['flat theme top']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="flat"]' }))
          .perform();
        await delay(500);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('flat theme top');
      },
      async ['flat theme bottom']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="flat"]' }))
          .perform();
        await this.browser.executeScript(function () {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('flat theme bottom');
      },
      async ['dark theme top']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="dark"]' }))
          .perform();
        await delay(500);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('dark theme top');
      },
      async ['dark theme bottom']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="dark"]' }))
          .perform();
        await this.browser.executeScript(function () {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('dark theme bottom');
      },
    },
  },
};
