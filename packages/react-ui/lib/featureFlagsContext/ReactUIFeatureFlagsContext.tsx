import React from 'react';

export interface ReactUIFeatureFlags {
  dateInputFixSameNumberTypingOnRefocus?: boolean;
  dateInputAllowInvalidValuesInDays?: boolean;
  comboBoxAllowValueChangeInEditingState?: boolean;
  stickyReduceLayoutEvents?: boolean;
  radioGroupRemoveBaselineSpacer?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  dateInputFixSameNumberTypingOnRefocus: false,
  dateInputAllowInvalidValuesInDays: false,
  comboBoxAllowValueChangeInEditingState: false,
  stickyReduceLayoutEvents: false,
  radioGroupRemoveBaselineSpacer: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
