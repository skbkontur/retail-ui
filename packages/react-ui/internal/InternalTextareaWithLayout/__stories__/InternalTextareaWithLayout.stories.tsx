import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';

import { Story } from '../../../typings/stories';
import { Gapped } from '../../../components/Gapped';
import { InternalTextareaWithLayout } from '../InternalTextareaWithLayout';

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
        leftIcon={<OkIcon />}
        rightIcon={<OkIcon />}
      />
      <InternalTextareaWithLayout
        size={'medium'}
        value={'WithLayout Size: medium'}
        autoResize
        rows={1}
        leftIcon={<OkIcon />}
        rightIcon={<OkIcon />}
      />
      <InternalTextareaWithLayout
        size={'large'}
        value={'WithLayout Size: large'}
        autoResize
        rows={1}
        leftIcon={<OkIcon />}
        rightIcon={<OkIcon />}
      />
    </Gapped>
  );
};
