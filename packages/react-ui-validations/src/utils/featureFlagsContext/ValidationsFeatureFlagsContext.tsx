import React from 'react';

export type FeatureFlags = '';

export type ValidationsFeatureFlags = Partial<Record<FeatureFlags, boolean>>;

export const validationsFeatureFlagsDefault: ValidationsFeatureFlags = {};

export const ValidationsFeatureFlagsContext =
  React.createContext<ValidationsFeatureFlags>(validationsFeatureFlagsDefault);

ValidationsFeatureFlagsContext.displayName = 'ValidationsFeatureFlagsContext';
ValidationsFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ValidationsFeatureFlagsContext';
