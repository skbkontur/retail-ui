import React from 'react';
import type { Meta, Story } from '@skbkontur/react-ui-validations/typings/stories.js';

// import { FeatureFlagToggle } from '../../../../.storybook-docs/FeatureFlagToggle';

const meta: Meta = {
  title: 'Information/Feature flags',
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Пустая история нужна, чтобы страница нормально собиралась */
export const Default: Story = () => {
  return <div />;
};
