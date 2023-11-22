import React from 'react';

export interface FeatureFlags {
  ValidationsWrapperAndContainerRemoveExtraSpan?: boolean;
}

export const featureFlagsDefault: FeatureFlags = {
  ValidationsWrapperAndContainerRemoveExtraSpan: false,
};

export const FeatureFlagsContext = React.createContext<FeatureFlags>(featureFlagsDefault);
FeatureFlagsContext.displayName = 'FeatureFlagsContext';
