import React from 'react';

import { Meta } from '../../../typings/stories';
import { ResponsiveLayout } from '../ResponsiveLayout';

export default {
  title: 'ResponsiveLayout',
  component: ResponsiveLayout,
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: 'Default' },
      },
    },
  },
} as Meta;

export const Default = () => {
  return <div />;
};
