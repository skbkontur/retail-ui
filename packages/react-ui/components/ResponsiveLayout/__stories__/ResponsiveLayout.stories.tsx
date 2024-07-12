import { Meta } from '../../../typings/stories';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { MenuSeparator } from '../../MenuSeparator';
import React from 'react';

export default {
  title: 'Layout/ResponsiveLayout',
  component: ResponsiveLayout,
} as Meta;

export const DefaultResponsiveLayout = () => {
  return <MenuSeparator />;
};
