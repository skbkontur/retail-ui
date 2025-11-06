import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MiniModalBody } from '../MiniModalBody';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalBody',
  component: MiniModalBody,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
