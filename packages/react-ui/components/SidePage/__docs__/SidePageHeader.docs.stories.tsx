import React from 'react';

import type { Meta } from '../../../typings/stories';
import { SidePageHeader } from '../SidePageHeader';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePageHeader',
  component: SidePageHeader,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
