import React from 'react';

import { Meta } from '../../../typings/stories';
import { MiniModalHeader } from '../MiniModalHeader';

export default {
  title: 'Overlay/MiniModal/MiniModalHeader',
  component: MiniModalHeader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
