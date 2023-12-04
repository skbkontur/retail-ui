import React from 'react';

export interface ValidationsFeatureFlags {
  ValidationsRemoveExtraSpans?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  ValidationsRemoveExtraSpans: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);
ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
