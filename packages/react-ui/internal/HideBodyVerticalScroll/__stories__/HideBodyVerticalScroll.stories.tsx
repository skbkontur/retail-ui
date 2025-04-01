import React, { useLayoutEffect, useState } from 'react';

import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'HideBodyVerticalScroll',
} as Meta;

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

const renderScrollableContent = () => (
  <div>
    <SampleLockScroll />
    <div>{'s c r o l l . '.repeat(1000)}</div>
  </div>
);

export const WithScrollableContent: Story = () => renderScrollableContent();

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

export const Multiple_WithScrollableContent: Story = () => (
  <>
    <HideBodyVerticalScroll />
    {renderScrollableContent()}
  </>
);

export const DisorderlyUnmountAndResize: Story = () => (
  <>
    <button data-tid="resize" onClick={() => window.dispatchEvent(new Event('resize'))}>
      window.dispatchEvent(new Event('resize'))
    </button>
    <SampleLockScroll key="1" />
    <SampleLockScroll key="2" style={{ top: 60 }} />
    <div>{'s c r o l l . '.repeat(1000)}</div>
  </>
);
