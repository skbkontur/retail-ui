import React from 'react';

import { Meta } from '../../../typings/stories';
import { MenuSeparator } from '../MenuSeparator';

export default {
  title: 'MenuSeparator',
  component: MenuSeparator,
  parameters: {
    creevey: {
      skip: {
        'kind-skip-0': { stories: 'Default' },
      },
    },
  },
} as Meta;

export const Default = () => {
  return <MenuSeparator />;
};
