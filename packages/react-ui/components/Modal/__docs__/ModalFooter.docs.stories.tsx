import React from 'react';

import { Meta } from '../../../typings/stories';
import { ModalFooter } from '../ModalFooter';

export default {
  title: 'Overlay/Modal/ModalFooter',
  component: ModalFooter,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
