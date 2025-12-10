import type { ValidationsFeatureFlags } from './ValidationsFeatureFlagsContext.js';
import { validationsFeatureFlagsDefault } from './ValidationsFeatureFlagsContext.js';

export const getFullValidationsFlagsContext = (flags: ValidationsFeatureFlags) => {
  return { ...validationsFeatureFlagsDefault, ...flags };
};
