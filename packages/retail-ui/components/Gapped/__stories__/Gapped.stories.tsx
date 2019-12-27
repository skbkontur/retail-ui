// import 'creevey';
import React from 'react';
import Chai from 'chai';
// import Mocha from 'mocha';
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

const Square = () => <div style={{ width: '50px', height: '50px', background: '#aaa' }} />;

export const Horizontal = () => (
  <div style={{ border: '1px solid black' }}>
    <Gapped gap={20}>
      <Square />
      <Square />
    </Gapped>
  </div>
);

export const Vertical = () => (
  <div style={{ border: '1px solid black' }}>
    <Gapped gap={20} vertical>
      <Square />
      <Square />
    </Gapped>
  </div>
);

export const WrapElements = () => (
  <div style={{ border: '1px solid black', width: '400px' }}>
    <Gapped gap={100}>
      <Square />
      <Square />
      <Square />
      <Square />
    </Gapped>
  </div>
);

export const DontCoverOtherElements = () => (
  <div style={{ border: '1px solid black', width: '400px' }}>
    <div style={{ margin: '8px' }}>
      <Toggle />
      {' <= Try to click me!'}
    </div>
    <div style={{ position: 'relative' }}>
      <Gapped gap={100}>
        <Square />
        <Square />
      </Gapped>
    </div>
  </div>
);

interface WithMatchImage extends Chai.Assertion {
  matchImage: () => Promise<void>;
}

DontCoverOtherElements.story = {
  parameters: {
    creevey: {
      skip: { in: null, reason: "Don't work for now" },
      _seleniumTests({ By }: typeof Selenium, { expect }: typeof Chai) {
        return {
          async click(this: Mocha.Context) {
            await this.browser
              .actions({ bridge: true })
              .click(this.browser.findElement(By.css('[data-comp-name~="Toggle"]')))
              .perform();

            await (expect(await this.browser.findElement(By.css('#test-element')).takeScreenshot())
              .to as WithMatchImage).matchImage();
          },
        };
      },
    },
  },
};
