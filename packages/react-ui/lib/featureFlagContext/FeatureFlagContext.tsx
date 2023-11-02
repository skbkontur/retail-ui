import React from 'react';

export interface featureFlagObject {
  ValidationsWrapperAlignTooltip: boolean;
}

export const featureFlagDefault: featureFlagObject = {
  ValidationsWrapperAlignTooltip: false,
};

export type FeatureFlagIn = Partial<featureFlagObject>;

export const FeatureFlagContext = React.createContext<FeatureFlagIn>(featureFlagDefault);
FeatureFlagContext.displayName = 'FeatureFlagContext';
