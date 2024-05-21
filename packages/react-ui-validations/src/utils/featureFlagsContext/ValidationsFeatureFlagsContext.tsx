import React from 'react';

export type FeatureFlags = 'validationsRemoveExtraSpans' | 'fixedValidationTextColors' | 'darkTheme';

export type ValidationsFeatureFlags = Record<FeatureFlags, boolean | undefined>;

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationsRemoveExtraSpans: false,
  fixedValidationTextColors: false,
  darkTheme: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
