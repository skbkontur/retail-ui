import React, { useLayoutEffect, useState } from 'react';

import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { delay } from '../../../lib/utils';

export default {
  title: 'HideBodyVerticalScroll',
  parameters: {
    creevey: { skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } } },
  },
} as Meta;

const testScrollLockUnlock: CreeveyTests = {
  async 'scroll, lock, unlock'() {
    const toggle = async () => {
      await this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css: '[data-tid~="toggle-lock"]' }))
        .perform();
      await delay(1000);
    };

    await this.browser.executeScript(function () {
      const scrollContainer = window.document.documentElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    });
    const scrolled = await this.browser.takeScreenshot();

    await toggle();
    const locked = await this.browser.takeScreenshot();

    await toggle();
    const unlocked = await this.browser.takeScreenshot();

    await this.expect({ scrolled, locked, unlocked }).to.matchImages();
  },
};

const SampleLockScroll = ({ style }: { style?: React.CSSProperties }) => {
  const [locked, setLocked] = useState(false);
  const toggle = () => setLocked((prev) => !prev);
  const status = locked ? 'on page' : 'not mounted';

  return (
    <div style={{ position: 'fixed', margin: 10, padding: 10, background: '#eee', ...style }}>
      <div>
        <button onClick={toggle} data-tid="toggle-lock">
          toggle
        </button>
        <span> HideBodyVerticalScroll: {status}</span>
        {locked && <HideBodyVerticalScroll />}
      </div>
    </div>
  );
};

export const Sample: Story = () => (
  <div>
    <SampleLockScroll />
    <div>{'s c r o l l . '.repeat(100)}</div>
  </div>
);
Sample.parameters = { creevey: { tests: testScrollLockUnlock } };

export const WithScrollableContent: Story = () => (
  <div>
    <SampleLockScroll />
    <div>{'s c r o l l . '.repeat(1000)}</div>
  </div>
);
WithScrollableContent.parameters = { creevey: { tests: testScrollLockUnlock } };

export const WithHTMLOverflowYScroll: Story = () => {
  useLayoutEffect(() => {
    document.documentElement.style.overflowY = 'scroll';

    return () => {
      document.documentElement.style.overflowY = '';
    };
  }, []);

  return (
    <div>
      <SampleLockScroll />
      <div>{'s c r o l l . '.repeat(100)}</div>
    </div>
  );
};
WithHTMLOverflowYScroll.storyName = 'With html.overflowY=scroll';
WithHTMLOverflowYScroll.parameters = { creevey: { tests: testScrollLockUnlock } };

export const Multiple_WithScrollableContent: Story = () => (
  <>
    <HideBodyVerticalScroll />
    <WithScrollableContent />
  </>
);
Multiple_WithScrollableContent.parameters = { creevey: { tests: testScrollLockUnlock } };

export const DisorderlyUnmountAndResize: Story = () => (
  <>
    <button data-tid="resize" onClick={() => window.dispatchEvent(new Event('resize'))}>
      window.dispatchEvent(new Event(&apos;resize&apos;))
    </button>
    <SampleLockScroll key="1" />
    <SampleLockScroll key="2" style={{ top: 60 }} />
    <div>{'s c r o l l . '.repeat(1000)}</div>
  </>
);

DisorderlyUnmountAndResize.parameters = {
  creevey: {
    skip: { 'themes dont affect logic': { in: /^(?!\bchrome2022\b)/ } },
    tests: {
      async 'idle, hide, show, resize'() {
        const toggle = async (index: number) => {
          await this.browser.findElement({ css: `div:nth-of-type(${index}) [data-tid~="toggle-lock"]` }).click();
        };

        const idle = await this.browser.takeScreenshot();

        await toggle(1);
        await toggle(2);
        const hide = await this.browser.takeScreenshot();

        await toggle(1);
        await toggle(2);
        const show = await this.browser.takeScreenshot();

        await this.browser.findElement({ css: '[data-tid="resize"]' }).click();
        const resize = await this.browser.takeScreenshot();

        await this.expect({ idle, hide, show, resize }).to.matchImages();
      },
    },
  },
};
