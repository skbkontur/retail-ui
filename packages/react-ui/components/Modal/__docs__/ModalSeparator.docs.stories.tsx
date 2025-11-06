import React from 'react';

import type { Meta } from '../../../typings/stories';
import { ModalSeparator } from '../ModalSeparator';

const meta: Meta = {
  title: 'Overlay/Modal/ModalSeparator',
  component: ModalSeparator,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
