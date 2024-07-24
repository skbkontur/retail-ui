import { AddonConfig } from '../../typings/storybookAddonMultiple';

const featureFlags = [
  {
    value: 'tokenInputRemoveWhitespaceFromDefaultDelimiters',
    title: 'tokenInputRemoveWhitespaceFromDefaultDelimiters',
  },
  {
    value: 'kebabHintRemovePin',
    title: 'kebabHintRemovePin',
  },
  {
    value: 'sidePageEnableFocusLockWhenBackgroundBlocked',
    title: 'sidePageEnableFocusLockWhenBackgroundBlocked',
  },
  {
    value: 'spinnerLoaderRemoveDefaultCaption',
    title: 'spinnerLoaderRemoveDefaultCaption',
  },
  {
    value: 'menuItemsAtAnyLevel',
    title: 'menuItemsAtAnyLevel',
  },
  {
    value: 'textareaUseSafari17Workaround',
    title: 'textareaUseSafari17Workaround',
  },
  {
    value: 'linkFocusOutline',
    title: 'linkFocusOutline',
  },
  {
    value: 'comboBoxAllowValueChangeInEditingState',
    title: 'comboBoxAllowValueChangeInEditingState',
  },
  {
    value: 'hintAddDynamicPositioning',
    title: 'hintAddDynamicPositioning',
  },
];

export const featureFlagsConfig: AddonConfig = {
  featureFlags: {
    icon: 'flag',
    viewMode: 'docs',
    elements: [
      {
        type: 'userDefinedSelect',
        allowEmpty: true,
        queryKey: 'activeFeatureFlags',
        options: featureFlags,
      },
      { type: 'reset' },
    ],
  },
};
