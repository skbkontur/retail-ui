import React from 'react';

export interface ReactUIFeatureFlags {
  textareaUseSafari17Workaround?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  textareaUseSafari17Workaround: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
