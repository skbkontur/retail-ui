import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MiniModalBody } from '../MiniModalBody';

export default {
  title: 'Overlay/MiniModal/MiniModalBody',
  component: MiniModalBody,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
