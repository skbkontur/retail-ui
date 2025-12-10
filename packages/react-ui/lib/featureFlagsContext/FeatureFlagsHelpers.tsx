import type { ReactUIFeatureFlags } from './ReactUIFeatureFlagsContext.js';
import { reactUIFeatureFlagsDefault } from './ReactUIFeatureFlagsContext.js';

export const getFullReactUIFlagsContext = (flags: ReactUIFeatureFlags) => {
  return { ...reactUIFeatureFlagsDefault, ...flags };
};
