import React from 'react';

import { Meta, Story } from '../../typings/stories';

import { styles } from './simple.styles';

export default {
  title: 'ChromeHoverTest',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '0 200px 200px 0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Simple: Story = () => (
  <>
    <button className={styles.button()}>text</button>
  </>
);
Simple.storyName = 'simple';

Simple.parameters = {
  creevey: {
    tests: {
      async hovered() {
        await this.browser
          .actions({
            bridge: true,
          })
          .move({
            origin: this.browser.findElement({ css: 'button' }),
          })
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
      },
    },
  },
};
