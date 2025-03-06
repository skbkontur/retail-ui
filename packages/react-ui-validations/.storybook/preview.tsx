import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import React from 'react';
import { Preview } from '@storybook/react';
import { LIVE_EXAMPLES_ADDON_ID, Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { addons } from '@storybook/manager-api';
import { isNonNullable } from '@skbkontur/react-ui/lib/utils';
import styled from 'styled-components';
import { HandThumbDownIcon } from '@skbkontur/icons/icons/HandThumbDownIcon';
import { HandThumbUpIcon } from '@skbkontur/icons/icons/HandThumbUpIcon';
import ThumbUpIcon from '@skbkontur/react-icons/ThumbUp';
import { DocsContainer } from '@storybook/blocks';

import * as Validations from '../src/index';
import * as ReactUI from '../../react-ui/index';
import * as ControlsWithValidations from '../docs/Pages_NEW/Concepts/InlineValidations/ControlsWithValidations';
import { Form } from '../docs/Common/Form';
import { SpaceFiller } from '../docs/Common/SpaceFiller';

import FeatureFlagsDecorator from './decorators/Features/FeatureFlagsDecorator';
import { ThemeDecorator } from './decorators/Theme/ThemeDecorator';

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

const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);

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
    docs: {
      container: ({ children, context }) => (
        // prevent sb default font-family and other styles
        // see https://github.com/storybookjs/storybook/blob/c6b8ca7faec9d6b73f71c112100506ef41dde619/code/lib/blocks/src/components/DocsPage.tsx#L19
        <div className="sb-unstyled">
          <DocsContainer context={context}>{children}</DocsContainer>
        </div>
      ),
    },
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
      HandThumbDownIcon,
      HandThumbUpIcon,
      ThumbUpIcon,
      SpaceFiller,
    },
    decorators: [ThemeDecorator, FeatureFlagsDecorator],
  } as LiveConfig,
  showToolbar: !isDocsEnv,
});

export default preview;
