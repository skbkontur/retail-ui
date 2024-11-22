import React from 'react';

export interface ReactUIFeatureFlags {
  comboBoxAllowValueChangeInEditingState?: boolean;
  TEST?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  comboBoxAllowValueChangeInEditingState: false,
  TEST: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
