import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import { withCreevey } from 'creevey/addon';
import React from 'react';
import { Preview } from '@storybook/react';

import { featureFlagsConfig } from './featureFlagsConfig/featureFlagsConfig';
import FeatureFlagsDecorator from './decorators/Features/FeatureFlagsDecorator';

setFilter((fiber) => {
  // Транслируем все пропы только для контролов
  const isControlComponent = !!findAmongParents(
    fiber,
    (fiberParent) => fiberParent.type && typeof fiberParent.type.__KONTUR_REACT_UI__ === 'string',
  );
  if (isControlComponent) {
    return null;
  }
  // Для остальных компонентов ограничиваемся тестовыми идентификаторами
  return ['data-tid', 'data-testid'];
});

const preview: Preview = {
  decorators: [
    (Story: any) => (
      <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
        <Story />
      </div>
    ),
    FeatureFlagsDecorator,
    withCreevey(),
  ],

  parameters: {
    creevey: {
      captureElement: '#test-element',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['FeatureFlags validations'],
      },
    },
    multiselect: featureFlagsConfig,
  },
};

export default preview;
