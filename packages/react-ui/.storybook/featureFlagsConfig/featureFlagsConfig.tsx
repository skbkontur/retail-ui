import { AddonConfig } from '../../typings/storybookAddonMultiple';
import { reactUIFeatureFlagsDefault } from '../../lib/featureFlagsContext';

const featureFlags = Object.keys(reactUIFeatureFlagsDefault).map((featureFlag) => ({
  value: featureFlag,
  title: featureFlag,
}));

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
