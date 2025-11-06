import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ResponsiveLayout } from '../ResponsiveLayout';

const meta: Meta = {
  title: 'Layout/ResponsiveLayout',
  component: ResponsiveLayout,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
