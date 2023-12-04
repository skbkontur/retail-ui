import React from 'react';

export interface ValidationsFeatureFlags {
  ValidationsWrapperAndContainerRemoveExtraSpan?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  ValidationsWrapperAndContainerRemoveExtraSpan: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);
ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
