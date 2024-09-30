import React from 'react';
import type { Decorator } from '@storybook/react';

import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';
const createFeatureFlagsWithBoolean = (featureFlags: string[]) =>
  featureFlags.reduce((acc, featureFlag) => {
    return { ...acc, [featureFlag]: true };
  }, {});

const FeatureFlagsDecorator: Decorator = (Story, context) => {
  const { globals } = context;
  const { activeFeatureFlags }: { [key: string]: string[] } = globals.multiselect;
  const activeFeatureFlagsWithBoolean =
    activeFeatureFlags?.length > 0 ? createFeatureFlagsWithBoolean(activeFeatureFlags) : {};

  return (
    <ReactUIFeatureFlagsContext.Provider value={{ ...activeFeatureFlagsWithBoolean }}>
      <Story />
    </ReactUIFeatureFlagsContext.Provider>
  );
};

export default FeatureFlagsDecorator;