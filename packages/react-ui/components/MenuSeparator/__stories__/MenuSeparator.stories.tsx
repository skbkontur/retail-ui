import { Meta } from '../../../typings/stories';
import { MenuSeparator } from '../MenuSeparator';
import React from 'react';

export default {
  title: 'Menu/MenuSeparator',
  component: MenuSeparator,
} as Meta;

export const DefaultMenuSeparator = () => {
  return <MenuSeparator />;
};
DefaultMenuSeparator.storyName = 'Default';
