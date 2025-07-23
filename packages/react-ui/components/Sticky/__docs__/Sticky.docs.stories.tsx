import React from 'react';
import { Sticky } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Layout/Sticky',
  component: Sticky,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  const style = {
    padding: 10,
    background: '#f0f0f0',
  };

  let stop = null;

  return (
    <div>
      <Sticky side="top" getStop={() => stop}>
        {(fixed) => (
          <div style={style}>
            Header
            <div>
              fixed: <b>{String(fixed)}</b>
            </div>
          </div>
        )}
      </Sticky>
      Content
      <div style={{ height: 1000 }} />
      <div ref={(el) => (stop = el)} style={{ borderTop: '1px solid' }} />
      <div style={{ height: 1000 }} />
      <Sticky side="bottom" getStop={() => stop} offset={20}>
        {(fixed) => (
          <div style={style}>
            Footer
            <div>
              fixed: <b>{String(fixed)}</b>
            </div>
          </div>
        )}
      </Sticky>
      <div style={{ height: 100 }} />
    </div>
  );
};
Example1.storyName = 'Базовый пример';
