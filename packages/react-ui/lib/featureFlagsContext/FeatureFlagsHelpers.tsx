import { featureFlagsDefault, FeatureFlags } from './FeatureFlagsContext';

export const getFullFlagContext = (flags: FeatureFlags) => {
  return { ...featureFlagsDefault, ...flags };
};
