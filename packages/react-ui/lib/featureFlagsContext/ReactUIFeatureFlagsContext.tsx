import React from 'react';

export interface ReactUIFeatureFlags {
  textareaBaselineAlign?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  textareaBaselineAlign: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
