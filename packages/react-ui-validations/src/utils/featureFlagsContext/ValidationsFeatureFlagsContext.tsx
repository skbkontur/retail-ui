import React from 'react';

import { Nullable } from '../../../typings/Types';

export interface ValidationsFeatureFlags extends Record<string, Nullable<boolean>> {
  validationsRemoveExtraSpans?: boolean;
  fixedValidationTextColors?: boolean;
  darkTheme?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationsRemoveExtraSpans: false,
  fixedValidationTextColors: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
