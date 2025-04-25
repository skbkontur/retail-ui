import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ModalHeader } from '../ModalHeader';

export default {
  title: 'Overlay/Modal/ModalHeader',
  component: ModalHeader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
