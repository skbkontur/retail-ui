import { featureFlagDefault, FeatureFlagIn } from './FeatureFlagContext';

export const getFullFlagContext = (flags: FeatureFlagIn) => {
  return { ...featureFlagDefault, ...flags };
};
