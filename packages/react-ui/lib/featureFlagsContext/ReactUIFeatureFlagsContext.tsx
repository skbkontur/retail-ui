import React from 'react';

export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  kebabHintToastRemovePin?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  tokenInputRemoveWhitespaceFromDefaultDelimiters: false,
  kebabHintToastRemovePin: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);
ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
