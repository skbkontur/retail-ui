import React from 'react';

import { Meta } from '../../../typings/stories';
import { MiniModalIndent } from '../MiniModalIndent';

export default {
  title: 'Overlay/MiniModal/MiniModalIndent',
  component: MiniModalIndent,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
