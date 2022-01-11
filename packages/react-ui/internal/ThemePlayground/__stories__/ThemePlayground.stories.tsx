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
        in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'],
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
      async ['default old theme top']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="defaultOld"]' }))
          .perform();
        await delay(500);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('default old theme top');
      },
      async ['default old theme bottom']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="defaultOld"]' }))
          .perform();
        await this.browser.executeScript(function () {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('default old theme bottom');
      },
      async ['flat old theme top']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="flatOld"]' }))
          .perform();
        await delay(500);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('flat old theme top');
      },
      async ['flat old theme bottom']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="flatOld"]' }))
          .perform();
        await this.browser.executeScript(function () {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('flat old theme bottom');
      },
      async ['dark old theme top']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="darkOld"]' }))
          .perform();
        await delay(500);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('dark old theme top');
      },
      async ['dark old theme bottom']() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-prop-id="darkOld"]' }))
          .perform();
        await this.browser.executeScript(function () {
          document.documentElement.scrollTop = document.documentElement.offsetHeight;
        });
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('dark old theme bottom');
      },
    },
  },
};
