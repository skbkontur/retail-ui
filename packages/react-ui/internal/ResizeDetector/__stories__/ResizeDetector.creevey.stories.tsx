import React from 'react';

import { Button } from '../../../components/Button/index.js';
import { Gapped } from '../../../components/Gapped/index.js';
import type { Meta, Story } from '../../../typings/stories.js';
import { ResizeDetector } from '../ResizeDetector.js';

const meta: Meta = {
  title: 'ResizeDetector',
};

export default meta;

export const IframeAccessibility: Story = () => (
  <Gapped vertical>
    <p>
      Слева обычная кнопка, справа кнопка с ResizeDetector. При переходе клавишей Tab скринридер обе должен называть
      «AB».
    </p>
    <Gapped>
      <Button>AB</Button>
      <Button>
        <ResizeDetector useResizeObserver={false}>
          <span>AB</span>
        </ResizeDetector>
      </Button>
    </Gapped>
  </Gapped>
);

IframeAccessibility.parameters = { creevey: { skip: true } };
