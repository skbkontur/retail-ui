import React from 'react';

export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  sidePageAddFocusLockWhenBackgroundBlocked?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  tokenInputRemoveWhitespaceFromDefaultDelimiters: false,
  sidePageAddFocusLockWhenBackgroundBlocked: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);
ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
