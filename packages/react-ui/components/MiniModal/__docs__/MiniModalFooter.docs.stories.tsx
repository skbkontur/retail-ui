import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MiniModalFooter } from '../MiniModalFooter';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalFooter',
  component: MiniModalFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
