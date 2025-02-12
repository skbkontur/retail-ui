import React from 'react';

export interface ValidationsFeatureFlags {
  ignoreOpenDropdownOnSubmitValidation?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  ignoreOpenDropdownOnSubmitValidation: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
