import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { SidePageHeader } from '../SidePageHeader.js';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePageHeader',
  component: SidePageHeader,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
