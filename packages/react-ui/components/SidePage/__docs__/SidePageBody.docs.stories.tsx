import React from 'react';

import type { Meta } from '../../../typings/stories.js';
import { SidePageBody } from '../SidePageBody.js';

const meta: Meta = {
  title: 'Overlay/SidePage',
  component: SidePageBody,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const DefaultBody = () => {
  return <div />;
};
