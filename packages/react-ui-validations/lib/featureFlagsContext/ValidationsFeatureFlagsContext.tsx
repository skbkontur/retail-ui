import React from 'react';

export interface ValidationsFeatureFlags {
  validationsRemoveExtraSpans?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationsRemoveExtraSpans: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);
ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
