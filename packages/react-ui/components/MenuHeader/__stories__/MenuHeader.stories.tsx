import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MenuHeader } from '../MenuHeader';
import { Gapped } from '../../Gapped';

export default {
  title: 'MenuHeader',
  component: MenuHeader,
} as Meta;

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
