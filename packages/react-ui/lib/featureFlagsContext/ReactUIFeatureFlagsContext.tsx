import React from 'react';

export interface ReactUIFeatureFlags {
  tokenInputRemoveWhitespaceFromDefaultDelimiters?: boolean;
  sidePageEnableFocusLockWhenBackgroundBlocked?: boolean;
  spinnerLoaderRemoveDefaultCaption?: boolean;
  menuItemsAtAnyLevel?: boolean;
  textareaUseSafari17Workaround?: boolean;
  comboBoxAllowValueChangeInEditingState?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  tokenInputRemoveWhitespaceFromDefaultDelimiters: false,
  sidePageEnableFocusLockWhenBackgroundBlocked: false,
  spinnerLoaderRemoveDefaultCaption: false,
  menuItemsAtAnyLevel: false,
  textareaUseSafari17Workaround: false,
  comboBoxAllowValueChangeInEditingState: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
