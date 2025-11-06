import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MiniModalHeader } from '../MiniModalHeader';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalHeader',
  component: MiniModalHeader,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
