import React from 'react';

export interface ReactUIFeatureFlags {
  dateInputFixSameNumberTypingOnRefocus?: boolean;
  dateInputAllowInvalidValuesInDays?: boolean;
  comboBoxAllowValueChangeInEditingState?: boolean;
  stickyReduceLayoutEvents?: boolean;
  radioGroupRemoveBaselineSpacer?: boolean;
  groupAddHintAndTooltipSupport?: boolean;
  popupFixPinTearing?: boolean;
  autocompleteUseMaskedInput?: boolean;
  sidePageDisableHeaderShrink?: boolean;
  sidePageNotCutTitleOnStuckByDefault?: boolean;
  tokenInputCreateTokenOnBlurInWithoutReferenceMode?: boolean;
}

export const reactUIFeatureFlagsDefault: ReactUIFeatureFlags = {
  dateInputFixSameNumberTypingOnRefocus: false,
  dateInputAllowInvalidValuesInDays: false,
  comboBoxAllowValueChangeInEditingState: false,
  stickyReduceLayoutEvents: false,
  radioGroupRemoveBaselineSpacer: false,
  groupAddHintAndTooltipSupport: false,
  popupFixPinTearing: false,
  autocompleteUseMaskedInput: false,
  sidePageDisableHeaderShrink: false,
  sidePageNotCutTitleOnStuckByDefault: false,
  tokenInputCreateTokenOnBlurInWithoutReferenceMode: false,
};

export const ReactUIFeatureFlagsContext = React.createContext<ReactUIFeatureFlags>(reactUIFeatureFlagsDefault);

ReactUIFeatureFlagsContext.displayName = 'ReactUIFeatureFlagsContext';
ReactUIFeatureFlagsContext.__KONTUR_REACT_UI__ = 'ReactUIFeatureFlagsContext';
