import React from 'react';

export type FeatureFlags = 'validationsRemoveExtraSpans' | 'fixedValidationTextColors' | 'darkTheme';

export type ValidationsFeatureFlags = Partial<Record<FeatureFlags, boolean>>;

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationsDivWrapper: false,
  fixedValidationTextColors: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
