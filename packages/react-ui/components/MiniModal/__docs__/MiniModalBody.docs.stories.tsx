import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { MiniModalBody } from '../MiniModalBody.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalBody',
  component: MiniModalBody,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
