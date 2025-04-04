import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ModalBody } from '../ModalBody';

export default {
  title: 'Overlay/Modal/ModalBody',
  component: ModalBody,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
