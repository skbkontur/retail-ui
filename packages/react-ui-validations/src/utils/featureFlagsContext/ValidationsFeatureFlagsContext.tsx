import React from 'react';

export interface ValidationsFeatureFlags {
  dropdownsDoNotOpenOnFocusByValidation?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  dropdownsDoNotOpenOnFocusByValidation: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
