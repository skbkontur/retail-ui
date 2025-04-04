import React from 'react';

import { Meta } from '../../../typings/stories';
import { SidePageContainer } from '../SidePageContainer';

export default {
  title: 'Overlay/SidePage/SidePageContainer',
  component: SidePageContainer,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default = () => {
  return <div />;
};
