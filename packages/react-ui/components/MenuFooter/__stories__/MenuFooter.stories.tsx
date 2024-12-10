import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MenuFooter } from '../MenuFooter';
import { Gapped } from '../../Gapped';

export default {
  title: 'MenuFooter',
} as Meta;

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
