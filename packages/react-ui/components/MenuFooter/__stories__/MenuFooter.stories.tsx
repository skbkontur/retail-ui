import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { MenuFooter } from '../MenuFooter.js';
import { Gapped } from '../../Gapped/index.js';

const meta: Meta = {
  title: 'MenuFooter',
  component: MenuFooter,
};

export default meta;

export const Size = () => {
  return (
    <Gapped>
      <MenuFooter size={'small'}>Маленький</MenuFooter>
      <MenuFooter size={'medium'}>Средний</MenuFooter>
      <MenuFooter size={'large'}>Большой</MenuFooter>
    </Gapped>
  );
};
Size.storyName = 'size';
