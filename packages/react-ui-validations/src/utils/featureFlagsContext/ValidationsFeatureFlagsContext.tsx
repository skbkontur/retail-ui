import React from 'react';

export interface ValidationsFeatureFlags {
  validationTooltipExtendedPositions?: boolean;
}

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationTooltipExtendedPositions: false,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
