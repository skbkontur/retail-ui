import React from 'react';

export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  sidePageEnableFocusLockWhenBackgroundBlocked?: boolean;
  spinnerLoaderRemoveDefaultCaption?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  tokenInputRemoveWhitespaceFromDefaultDelimiters: false,
  sidePageEnableFocusLockWhenBackgroundBlocked: false,
  spinnerLoaderRemoveDefaultCaption: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);
ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
