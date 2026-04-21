import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
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
        leftIcon={<IconCheckARegular16 />}
        rightIcon={<IconCheckARegular16 />}
      />
      <InternalTextareaWithLayout
        size={'medium'}
        value={'WithLayout Size: medium'}
        autoResize
        rows={1}
        leftIcon={<IconCheckARegular16 />}
        rightIcon={<IconCheckARegular16 />}
      />
      <InternalTextareaWithLayout
        size={'large'}
        value={'WithLayout Size: large'}
        autoResize
        rows={1}
        leftIcon={<IconCheckARegular16 />}
        rightIcon={<IconCheckARegular16 />}
      />
    </Gapped>
  );
};
