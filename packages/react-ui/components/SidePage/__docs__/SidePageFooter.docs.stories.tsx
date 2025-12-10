import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { SidePageFooter } from '../SidePageFooter.js';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePageFooter',
  component: SidePageFooter,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
