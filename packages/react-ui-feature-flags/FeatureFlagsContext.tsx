import React from 'react';

export interface FeatureFlags {
  TokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  ValidationsWrapperAndContainerRemoveExtraSpan?: boolean;
}

export const featureFlagsDefault: FeatureFlags = {
  TokenInputRemoveWhitespaceFromDefaultDelimiters: false,
  ValidationsWrapperAndContainerRemoveExtraSpan: false,
};

export const FeatureFlagsContext = React.createContext<FeatureFlags>(featureFlagsDefault);
FeatureFlagsContext.displayName = 'FeatureFlagsContext';
