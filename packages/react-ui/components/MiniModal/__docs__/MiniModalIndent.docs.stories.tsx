import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { MiniModalIndent } from '../MiniModalIndent.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalIndent',
  component: MiniModalIndent,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
