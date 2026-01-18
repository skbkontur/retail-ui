import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { ModalFooter } from '../ModalFooter.js';

const meta: Meta = {
  title: 'Overlay/Modal/ModalFooter',
  component: ModalFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
