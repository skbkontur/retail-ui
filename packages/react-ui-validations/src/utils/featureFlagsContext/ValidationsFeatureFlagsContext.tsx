import React from 'react';

export type FeatureFlags = 'validationsDivWrapper';

export type ValidationsFeatureFlags = Partial<Record<FeatureFlags, boolean>>;

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {
  validationsDivWrapper: true,
};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
