import React from 'react';

export interface ReactUIFeatureFlags {
  comboBoxAllowValueChangeInEditingState?: boolean;
  dateInputFixSameNuberTypingOnRefocus?: boolean;
  dateInputAllowInvalidValuesInDays?: boolean;
  radioGroupRemoveBaselineSpacer?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  comboBoxAllowValueChangeInEditingState: false,
  dateInputFixSameNuberTypingOnRefocus: false,
  dateInputAllowInvalidValuesInDays: false,
  radioGroupRemoveBaselineSpacer: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
