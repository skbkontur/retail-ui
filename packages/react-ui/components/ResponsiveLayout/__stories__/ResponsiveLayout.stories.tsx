import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ResponsiveLayout } from '../ResponsiveLayout';

const meta: Meta = {
  title: 'ResponsiveLayout',
  component: ResponsiveLayout,
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: 'Default' },
      },
    },
  },
};

export default meta;

export const Default = () => {
  return <div />;
};
