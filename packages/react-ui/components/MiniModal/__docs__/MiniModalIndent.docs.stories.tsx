import React from 'react';

import type { Meta } from '../../../typings/stories';
import { MiniModalIndent } from '../MiniModalIndent';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModalIndent',
  component: MiniModalIndent,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
