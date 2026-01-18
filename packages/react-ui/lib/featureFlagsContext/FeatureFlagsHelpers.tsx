import type { ReactUIFeatureFlags } from './ReactUIFeatureFlagsContext.js';
import { reactUIFeatureFlagsDefault } from './ReactUIFeatureFlagsContext.js';

export const getFullReactUIFlagsContext = (flags: ReactUIFeatureFlags): ReactUIFeatureFlags => {
  return { ...reactUIFeatureFlagsDefault, ...flags };
};
