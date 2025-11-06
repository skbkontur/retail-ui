import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ModalFooter } from '../ModalFooter';

const meta: Meta = {
  title: 'Overlay/Modal/ModalFooter',
  component: ModalFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
