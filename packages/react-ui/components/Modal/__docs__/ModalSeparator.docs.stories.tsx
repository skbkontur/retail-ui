import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ModalSeparator } from '../ModalSeparator';

export default {
  title: 'Overlay/Modal/ModalSeparator',
  component: ModalSeparator,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
