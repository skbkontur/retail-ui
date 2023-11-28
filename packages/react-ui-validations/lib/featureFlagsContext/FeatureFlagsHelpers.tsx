import { validationsFeatureFlagsDefault, ValidationsFeatureFlags } from './ValidationsFeatureFlagsContext';

export const getFullValidationsFlagsContext = (flags: ValidationsFeatureFlags) => {
  return { ...validationsFeatureFlagsDefault, ...flags };
};
