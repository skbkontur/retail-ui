import React from 'react';

import { Meta } from '../../../typings/stories';
import { MenuHeader } from '../MenuHeader';
import { Gapped } from '../../Gapped';
import { SizeType } from '../../../internal/ThemePlayground/constants';

export default {
  title: 'MenuHeader',
} as Meta;

export const Size = () => {
  return (
    <Gapped>
      <MenuHeader size={SizeType.Small}>Маленький</MenuHeader>
      <MenuHeader size={SizeType.Medium}>Средний</MenuHeader>
      <MenuHeader size={SizeType.Large}>Большой</MenuHeader>
    </Gapped>
  );
};
Size.storyName = 'size';
