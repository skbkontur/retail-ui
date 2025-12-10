import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { MenuSeparator } from '../MenuSeparator.js';

const meta: Meta = {
  title: 'MenuSeparator',
  component: MenuSeparator,
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
  return <MenuSeparator />;
};
