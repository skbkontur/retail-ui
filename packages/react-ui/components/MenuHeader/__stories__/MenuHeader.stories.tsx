import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MenuHeader } from '../MenuHeader';
import { Gapped } from '../../Gapped';

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
