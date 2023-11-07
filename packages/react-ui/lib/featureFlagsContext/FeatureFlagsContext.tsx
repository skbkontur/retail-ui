import React from 'react';

export interface FeatureFlags {
  ValidationTooltipRemoveWrapper: boolean;
}

export const featureFlagDefault: FeatureFlags = {
  ValidationTooltipRemoveWrapper: false,
};

export const FeatureFlagsContext = React.createContext<FeatureFlags>(featureFlagDefault);
FeatureFlagsContext.displayName = 'FeatureFlagsContext';
