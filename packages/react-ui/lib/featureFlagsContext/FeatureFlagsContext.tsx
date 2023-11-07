import React from 'react';

export interface FeatureFlags {
  ValidationTooltipRemoveWrapper: boolean;
}

export const featureFlagsDefault: FeatureFlags = {
  ValidationTooltipRemoveWrapper: false,
};

export const FeatureFlagsContext = React.createContext<FeatureFlags>(featureFlagsDefault);
FeatureFlagsContext.displayName = 'FeatureFlagsContext';
