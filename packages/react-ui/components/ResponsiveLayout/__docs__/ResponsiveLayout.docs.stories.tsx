import React from 'react';

import { Meta } from '../../../typings/stories';
import { ResponsiveLayout } from '../ResponsiveLayout';

export default {
  title: 'Layout/ResponsiveLayout',
  component: ResponsiveLayout,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
