import React from 'react';

export type FeatureFlags = 'validationsRemoveExtraSpans' | 'darkTheme';

export type ValidationsFeatureFlags = Partial<Record<FeatureFlags, boolean>>;

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationsRemoveExtraSpans: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
