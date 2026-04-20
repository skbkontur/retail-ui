import { CheckAIcon16Regular } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Regular.js';
import React from 'react';

import { Gapped } from '../../../components/Gapped/index.js';
import type { Story } from '../../../typings/stories.js';
import { InternalTextareaWithLayout } from '../InternalTextareaWithLayout.js';

export default { title: 'InternalTextareaWithLayout' };
export const DifferentSizes: Story = () => {
  return (
    <Gapped vertical>
      <InternalTextareaWithLayout size={'small'} value={'WithLayout Size: small'} autoResize rows={1} />
      <InternalTextareaWithLayout size={'medium'} value={'WithLayout Size: medium'} autoResize rows={1} />
      <InternalTextareaWithLayout size={'large'} value={'WithLayout Size: large'} autoResize rows={1} />
      <InternalTextareaWithLayout
        size={'small'}
        value={'WithLayout Size: small'}
        autoResize
        rows={1}
        leftIcon={<CheckAIcon16Regular />}
        rightIcon={<CheckAIcon16Regular />}
      />
      <InternalTextareaWithLayout
        size={'medium'}
        value={'WithLayout Size: medium'}
        autoResize
        rows={1}
        leftIcon={<CheckAIcon16Regular />}
        rightIcon={<CheckAIcon16Regular />}
      />
      <InternalTextareaWithLayout
        size={'large'}
        value={'WithLayout Size: large'}
        autoResize
        rows={1}
        leftIcon={<CheckAIcon16Regular />}
        rightIcon={<CheckAIcon16Regular />}
      />
    </Gapped>
  );
};
