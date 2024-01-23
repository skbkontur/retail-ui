import React from 'react';

export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  sidePageAddFocusLockWhenBackgroundBlocked?: boolean;
  spinnerLoaderRemoveDefaultCaption?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  tokenInputRemoveWhitespaceFromDefaultDelimiters: false,
  sidePageAddFocusLockWhenBackgroundBlocked: false,
  spinnerLoaderRemoveDefaultCaption: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);
ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
