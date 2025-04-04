import React from 'react';

import { Meta } from '../../../typings/stories';
import { SidePageHeader } from '../SidePageHeader';

export default {
  title: 'Overlay/SidePage/SidePageHeader',
  component: SidePageHeader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
