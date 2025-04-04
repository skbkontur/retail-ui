import React from 'react';

import { Meta } from '../../../typings/stories';
import { SidePageBody } from '../SidePageBody';

export default {
  title: 'Overlay/SidePage/SidePageBody',
  component: SidePageBody,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
