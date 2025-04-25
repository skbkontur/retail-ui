import type { ReactUIFeatureFlags } from './ReactUIFeatureFlagsContext';
import { reactUIFeatureFlagsDefault } from './ReactUIFeatureFlagsContext';

export const getFullReactUIFlagsContext = (flags: ReactUIFeatureFlags) => {
  return { ...reactUIFeatureFlagsDefault, ...flags };
};
