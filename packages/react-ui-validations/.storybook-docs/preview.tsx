import { IconHandThumbDownRegular16 } from '@skbkontur/icons/IconHandThumbDownRegular16';
import { IconHandThumbUpRegular16 } from '@skbkontur/icons/IconHandThumbUpRegular16';
import { isNonNullable } from '@skbkontur/react-ui/lib/utils';
import { LIVE_EXAMPLES_ADDON_ID } from '@skbkontur/storybook-addon-live-examples';
import type { Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { addons } from '@storybook/manager-api';
import type { Preview } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import * as ReactUI from '../../react-ui/index.js';
import { Form } from '../docs/Common/Form.js';
import { SpaceFiller } from '../docs/Common/SpaceFiller';
import * as ControlsWithValidations from '../docs/Pages_NEW/Concepts/InlineValidations/ControlsWithValidations.js';
import * as Validations from '../index.js';
import FeatureFlagsDecorator from './decorators/Features/FeatureFlagsDecorator';
import { ThemeDecorator } from './decorators/Theme/ThemeDecorator';
import { FeatureFlagToggle } from './FeatureFlagToggle';

const preview: Preview = {
  decorators: [
    (Story: any) => (
      <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
        <Story />
      </div>
    ),
    FeatureFlagsDecorator,
  ],

  parameters: {
    creevey: {
      captureElement: '#test-element',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'API reference',
          'Displaying',
          [
            'Getting started',
            'Validation type',
            'Validation level',
            'Error messages',
            'Form validity',
            'Scroll to validation',
          ],
          'Validator',
          ['Objects', 'Arrays', 'Dependent', 'Independent', 'Reusable', 'Missing nodes'],
          'Examples',
          ['Guides example', 'Array example', 'Editors', 'Custom controls'],
          'Concepts',
          ['Inline validations'],
        ],
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'React UI Theme',
    defaultValue: 'LIGHT_THEME',
  },
  validationsFeatureFlags: {
    name: 'React UI Validations Feature flags',
    description: 'React UI Validations Feature flags',
    defaultValue: [],
  },
};

addons.setConfig({
  [LIVE_EXAMPLES_ADDON_ID]: {
    scope: {
      ...Validations,
      ...ReactUI,
      ...ControlsWithValidations,
      Form,
      isNonNullable,
      styled,
      IconHandThumbDownRegular16,
      IconHandThumbUpRegular16,
      SpaceFiller,
      FeatureFlagToggle,
    },
    decorators: [ThemeDecorator, FeatureFlagsDecorator],
  } as LiveConfig,
  showToolbar: false,
});

export default preview;
