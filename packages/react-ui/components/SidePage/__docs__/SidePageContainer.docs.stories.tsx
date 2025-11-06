import React from 'react';

import type { Meta } from '../../../typings/stories';
import { SidePageContainer } from '../SidePageContainer';

const meta: Meta = {
  title: 'Overlay/SidePage/SidePageContainer',
  component: SidePageContainer,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const Default = () => {
  return <div />;
};
