import React from 'react';

export interface ReactUIFeatureFlags {
  menuItemsAtAnyLevel?: boolean;
  textareaUseSafari17Workaround?: boolean;
  linkFocusOutline?: boolean;
  comboBoxAllowValueChangeInEditingState?: boolean;
  hintAddDynamicPositioning?: boolean;
  popupUnifyPositioning?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  menuItemsAtAnyLevel: false,
  textareaUseSafari17Workaround: false,
  linkFocusOutline: false,
  comboBoxAllowValueChangeInEditingState: false,
  hintAddDynamicPositioning: false,
  popupUnifyPositioning: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
