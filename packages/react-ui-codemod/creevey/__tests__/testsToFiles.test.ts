const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../testsToFiles');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
  import React, { useState } from 'react';

  export default {
    title: 'Input',
  };

  export const NoTests: Story = () => <Input />;

  export const WithTests: Story = () => <Input />;
  WithTests.parameters = {
    creevey: {
      captureElement: 'body',
      tests: {
       async idle() {
        await this.expect(this.takeScreenshot()).to.matchImage('idle');
       },
        async PlainAndTyped() {
          const plain = await this.takeScreenshot();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('text')
            .perform();

          await delay(1000);

          const typed = await this.takeScreenshot();
          await this.expect({ plain, typed }).to.matchImages();
        },
      },
    },
  };

`,
  `
  import React, { useState } from 'react';

  export default {
    title: 'Input',
  };

  export const NoTests: Story = () => <Input />;

  export const WithTests: Story = () => <Input />;
  `,
  `basic stories with and without tests`,
);
