import React from 'react';

export interface FeatureFlags {
  TokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
}

export const featureFlagsDefault: FeatureFlags = {
  TokenInputRemoveWhitespaceFromDefaultDelimiters: false,
};

export const FeatureFlagsContext = React.createContext<FeatureFlags>(featureFlagsDefault);
FeatureFlagsContext.displayName = 'FeatureFlagsContext';
