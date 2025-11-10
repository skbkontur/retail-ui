import React from 'react';

import type { Meta, Story } from '../../../typings/stories';
// import { FeatureFlagToggle } from '../../FeatureFlagToggle';

const meta: Meta = {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Пустая история нужна, чтобы страница нормально собиралась */
export const Default: Story = () => {
  return <div />;
};
