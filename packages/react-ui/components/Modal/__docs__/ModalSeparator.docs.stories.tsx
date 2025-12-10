import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { ModalSeparator } from '../ModalSeparator.js';

const meta: Meta = {
  title: 'Overlay/Modal/ModalSeparator',
  component: ModalSeparator,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
