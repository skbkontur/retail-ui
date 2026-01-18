import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { ResponsiveLayout } from '../ResponsiveLayout.js';

const meta: Meta = {
  title: 'Layout/ResponsiveLayout',
  component: ResponsiveLayout,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
