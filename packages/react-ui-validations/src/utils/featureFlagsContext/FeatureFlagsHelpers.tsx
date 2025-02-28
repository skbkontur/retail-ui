import type { ValidationsFeatureFlags } from './ValidationsFeatureFlagsContext';
import { validationsFeatureFlagsDefault } from './ValidationsFeatureFlagsContext';

export const getFullValidationsFlagsContext = (flags: ValidationsFeatureFlags) => {
  return { ...validationsFeatureFlagsDefault, ...flags };
};
