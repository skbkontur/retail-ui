import { featureFlagsDefault, FeatureFlags } from './FeatureFlagsContext';

export const getFullFlagsContext = (flags: FeatureFlags) => {
  return { ...featureFlagsDefault, ...flags };
};
