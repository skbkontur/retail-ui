import React from 'react';

import { Meta } from '../../../typings/stories';
import { MiniModalFooter } from '../MiniModalFooter';

export default {
  title: 'Overlay/MiniModal/MiniModalFooter',
  component: MiniModalFooter,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
