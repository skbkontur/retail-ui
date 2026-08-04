import React from 'react';

export interface ReactUIFeatureFlags {
  maskedInputUseLegacyBehavior?: boolean;
  selectAutoScrollToSelectedItem?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  selectAutoScrollToSelectedItem: false,
  maskedInputUseLegacyBehavior: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
