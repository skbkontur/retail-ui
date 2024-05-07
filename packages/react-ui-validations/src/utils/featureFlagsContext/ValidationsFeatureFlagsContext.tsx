import React from 'react';

export type ValidationTheme = 'light' | 'dark';

export interface ValidationsFeatureFlags {
  validationsRemoveExtraSpans?: boolean;
  fixedValidationTextColors?: boolean;
  theme?: ValidationTheme;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationsRemoveExtraSpans: false,
  fixedValidationTextColors: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
