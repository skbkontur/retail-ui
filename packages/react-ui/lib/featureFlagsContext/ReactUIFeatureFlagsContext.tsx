import React from 'react';

export interface ReactUIFeatureFlags {
  textareaUseSafari17Workaround?: boolean;
  popupUnifyPositioning?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  textareaUseSafari17Workaround: false,
  popupUnifyPositioning: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
