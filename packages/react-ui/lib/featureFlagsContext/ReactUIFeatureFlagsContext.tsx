import React from 'react';

export interface ReactUIFeatureFlags {
  spinnerLoaderRemoveDefaultCaption?: boolean;
  linkFocusOutline?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  spinnerLoaderRemoveDefaultCaption: false,
  linkFocusOutline: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
