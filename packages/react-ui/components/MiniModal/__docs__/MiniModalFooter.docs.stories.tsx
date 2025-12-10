import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { MiniModalFooter } from '../MiniModalFooter.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalFooter',
  component: MiniModalFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
