import React from 'react';
import type { Decorator } from '@storybook/react';

import { ValidationsFeatureFlagsContext } from '../../../src/';

const createFeatureFlagsWithBoolean = (featureFlags: string[]) =>
  featureFlags.reduce((acc, featureFlag) => {
    return { ...acc, [featureFlag]: true };
  }, {});

const FeatureFlagsDecorator: Decorator = (Story, context) => {
  const { validationsFeatureFlags } = context.globals;
  const activeFeatureFlagsWithBoolean =
    validationsFeatureFlags?.length > 0 ? createFeatureFlagsWithBoolean(validationsFeatureFlags) : {};
  return (
    <ValidationsFeatureFlagsContext.Provider value={{ ...activeFeatureFlagsWithBoolean }}>
      <Story />
    </ValidationsFeatureFlagsContext.Provider>
  );
};

export default FeatureFlagsDecorator;
