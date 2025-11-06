import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ModalHeader } from '../ModalHeader';

const meta: Meta = {
  title: 'Overlay/Modal/ModalHeader',
  component: ModalHeader,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
