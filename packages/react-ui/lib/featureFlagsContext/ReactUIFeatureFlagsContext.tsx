import React from 'react';

export interface ReactUIFeatureFlags {
  TokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  TokenInputRemoveWhitespaceFromDefaultDelimiters: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);
ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
