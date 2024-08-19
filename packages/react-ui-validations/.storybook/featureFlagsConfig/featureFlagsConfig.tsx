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

  return elements.filter((el) =>
    featureFlags.length === 0
      ? 'queryKey' in el && el.queryKey === 'emptyFeatureFlags'
      : !('queryKey' in el && el.queryKey === 'emptyFeatureFlags'),
  );
};

export const featureFlagsConfig: AddonConfig = {
  featureFlags: {
    icon: 'flag',
    viewMode: 'docs',
    elements: createFeatureFlagsElements(),
  },
};
