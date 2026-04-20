import type { Decorator } from '@storybook/react';
import React from 'react';

import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext/index.js';
const createFeatureFlagsWithBoolean = (featureFlags: string[]) =>
  featureFlags.reduce((acc, featureFlag) => {
    return { ...acc, [featureFlag]: true };
  }, {});

const FeatureFlagsDecorator: Decorator = (Story, context) => {
  const { featureFlags } = context.globals;
  const activeFeatureFlagsWithBoolean = featureFlags?.length > 0 ? createFeatureFlagsWithBoolean(featureFlags) : {};

  return (
    <ReactUIFeatureFlagsContext.Provider value={{ ...activeFeatureFlagsWithBoolean }}>
      <Story />
    </ReactUIFeatureFlagsContext.Provider>
  );
};

export default FeatureFlagsDecorator;
