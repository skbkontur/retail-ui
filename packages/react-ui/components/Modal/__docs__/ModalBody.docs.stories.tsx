import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { ModalBody } from '../ModalBody.js';

const meta: Meta = {
  title: 'Overlay/Modal/ModalBody',
  component: ModalBody,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
