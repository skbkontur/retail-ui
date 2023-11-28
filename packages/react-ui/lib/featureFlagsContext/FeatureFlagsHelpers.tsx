import { reactUIFeatureFlagsDefault, ReactUIFeatureFlags } from './ReactUIFeatureFlagsContext';

export const getFullReactUIFlagsContext = (flags: ReactUIFeatureFlags) => {
  return { ...reactUIFeatureFlagsDefault, ...flags };
};
