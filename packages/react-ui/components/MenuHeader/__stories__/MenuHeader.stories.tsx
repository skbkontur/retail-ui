import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { Gapped } from '../../Gapped/index.js';
import { MenuHeader } from '../MenuHeader.js';

const meta: Meta = {
  title: 'MenuHeader',
  component: MenuHeader,
};

export default meta;

export const Size = () => {
  return (
    <Gapped>
      <MenuHeader size={'small'}>Маленький</MenuHeader>
      <MenuHeader size={'medium'}>Средний</MenuHeader>
      <MenuHeader size={'large'}>Большой</MenuHeader>
    </Gapped>
  );
};
Size.storyName = 'size';
