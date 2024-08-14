import { AddonConfig } from '../../typings/storybookAddonMultiple';
import { validationsFeatureFlagsDefault } from '../../src';

const featureFlags = Object.keys(validationsFeatureFlagsDefault).map((featureFlag) => ({
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
