import React from 'react';

import type { Meta } from '../../../typings/stories';
import { SidePageBody } from '../SidePageBody';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePageBody',
  component: SidePageBody,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
