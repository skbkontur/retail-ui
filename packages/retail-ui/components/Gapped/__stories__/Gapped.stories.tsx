import 'creevey';
import React from 'react';
import Chai from 'chai';
import Mocha from 'mocha';
import Selenium from 'selenium-webdriver';
import Gapped from '../Gapped';
import Toggle from '../../Toggle';

export default {
  title: 'Gapped',
  parameters: {
    creevey: {
      // NOTE Overwrite top-level skip option
      skip: { in: /.*Flat$/ },
      captureElement: '#test-element',
      __filename,
    },
  },
};

export const Horizontal = () => (
  <div style={{ border: '1px solid black' }}>
    <Gapped gap={20}>
      <div style={{ width: '50px', height: '50px', background: '#aaa' }} />
      <div style={{ width: '50px', height: '50px', background: '#aaa' }} />
    </Gapped>
  </div>
);

export const Vertical = () => (
  <div style={{ border: '1px solid black' }}>
    <Gapped gap={20} vertical>
      <div style={{ width: '50px', height: '50px', background: '#aaa' }} />
      <div style={{ width: '50px', height: '50px', background: '#aaa' }} />
    </Gapped>
  </div>
);

export const DontCoverOtherElements = () => (
  <div style={{ border: '1px solid black' }}>
    <div style={{ margin: '8px' }}>
      <Toggle />
      {' <= Try to click me!'}
    </div>
    <div style={{ zIndex: 1, transform: 'rotate(0)', isolation: 'isolate' }}>
      <Gapped gap={100}>
        <div style={{ width: '50px', height: '50px', background: '#aaa' }} />
        <div style={{ width: '50px', height: '50px', background: '#aaa' }} />
      </Gapped>
    </div>
  </div>
);

DontCoverOtherElements.story = {
  parameters: {
    creevey: {
      _seleniumTests({ By }: typeof Selenium, { expect }: typeof Chai) {
        return {
          async click(this: Mocha.Context) {
            await this.browser
              .actions({ bridge: true })
              .click(this.browser.findElement(By.css('[data-comp-name~="Toggle"]')))
              .perform();

            await expect(await this.browser.findElement(By.css('#test-element')).takeScreenshot()).to.matchImage();
          },
        };
      },
    },
  },
};
