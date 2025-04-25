import React from 'react';

import type { Meta } from '../../../typings/stories';
import { SidePageFooter } from '../SidePageFooter';

export default {
  title: 'Overlay/SidePage/SidePageFooter',
  component: SidePageFooter,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
