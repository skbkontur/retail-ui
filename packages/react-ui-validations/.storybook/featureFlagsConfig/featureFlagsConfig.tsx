import { AddonConfig, ElementsType } from '../../typings/storybookAddonMultiple';
import { validationsFeatureFlagsDefault } from '../../src';

const featureFlags = Object.keys(validationsFeatureFlagsDefault).map((featureFlag) => ({
  value: featureFlag,
  title: featureFlag,
}));

const createFeatureFlagsElements = (): ElementsType => {
  const elements: ElementsType = [
    {
      type: 'userDefinedSelect',
      allowEmpty: true,
      queryKey: 'activeFeatureFlags',
      options: featureFlags,
    },
    {
      type: 'singleSelect',
      queryKey: 'emptyFeatureFlags',
      options: [
        {
          value: 'Фиче-флаги не созданы',
          title: 'Фиче-флаги не созданы',
        },
      ],
    },
    { type: 'reset' },
  ];

  if (featureFlags.length === 0) {
    return elements.filter((el) => 'queryKey' in el && el.queryKey === 'emptyFeatureFlags');
  }
  return elements;
};

export const featureFlagsConfig: AddonConfig = {
  featureFlags: {
    icon: 'flag',
    viewMode: 'docs',
    elements: createFeatureFlagsElements(),
  },
};
