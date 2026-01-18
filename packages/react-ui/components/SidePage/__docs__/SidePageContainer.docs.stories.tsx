import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { SidePageContainer } from '../SidePageContainer.js';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePageContainer',
  component: SidePageContainer,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
