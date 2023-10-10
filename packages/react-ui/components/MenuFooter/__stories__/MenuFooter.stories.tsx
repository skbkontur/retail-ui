import React from 'react';

import { Meta } from '../../../typings/stories';
import { MenuFooter } from '../MenuFooter';
import { Gapped } from '../../Gapped';

export default {
  title: 'MenuFooter',
} as Meta;

export const Size = () => {
  return (
    <Gapped>
      <MenuFooter size={SizeType.Small}>Маленький</MenuFooter>
      <MenuFooter size={SizeType.Medium}>Средний</MenuFooter>
      <MenuFooter size={SizeType.Large}>Большой</MenuFooter>
    </Gapped>
  );
};
Size.storyName = 'size';
