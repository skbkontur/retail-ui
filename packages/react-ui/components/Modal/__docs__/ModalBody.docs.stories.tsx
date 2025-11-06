import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ModalBody } from '../ModalBody';

const meta: Meta = {
  title: 'Overlay/Modal/ModalBody',
  component: ModalBody,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
