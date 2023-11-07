import {featureFlagDefault, FeatureFlags} from './FeatureFlagsContext';

export const getFullFlagContext = (flags: FeatureFlags) => {
  return { ...featureFlagDefault, ...flags };
};
