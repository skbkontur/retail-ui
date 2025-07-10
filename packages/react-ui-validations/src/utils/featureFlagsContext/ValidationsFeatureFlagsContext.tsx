import React from 'react';

export interface ValidationsFeatureFlags {
  dropdownsDoNotOpenOnFocusByValidation?: boolean;
  hideTooltipOnSelectionControls?: boolean;
  validationWrapperValidateOnMount?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  dropdownsDoNotOpenOnFocusByValidation: false,
  hideTooltipOnSelectionControls: false,
  validationWrapperValidateOnMount: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
