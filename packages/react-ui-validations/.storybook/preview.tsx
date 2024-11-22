import { setFilter } from '@skbkontur/react-props2attrs';
import { findAmongParents } from '@skbkontur/react-sorge/lib';
import React from 'react';
import { Preview } from '@storybook/react';
import { LIVE_EXAMPLES_ADDON_ID, Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { addons } from '@storybook/manager-api';

import * as Validations from '../src/index';
import * as ReactUI from '../../react-ui/index';
import * as ControlsWithValidations from '../docs/Pages_NEW/Concepts/InlineValidations/ControlsWithValidations';
import { Form } from '../docs/Common/Form';

import { ThemeDecodator } from '@skbkontur/react-ui/.storybook/decorators/Theme/ThemeDecorator';
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
    creevey: {
      captureElement: '#test-element',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'API reference',
          'Отображение',
          [
            'Начало работы',
            'Виды валидаций',
            'Уровни валидаций',
            'Сообщения об ошибках',
            'Валидность формы',
            'Скролл к валидации',
          ],
          'Описание валидаций',
          [
            'Валидация объектов',
            'Валидация массивов',
            'Зависимые валидации',
            'Независимые валидации',
            'Переиспользуемые валидации',
            'Отсутствующие узлы',
          ],
          'Примеры',
          ['Пример из Контур.Гайдов', 'Пример массива', 'Редакторы', 'Кастомные контролы'],
          'Концепции',
          ['Встраиваемые валидации'],
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
    },
    decorators: [ThemeDecodator, FeatureFlagsDecorator],
  } as LiveConfig,
  showToolbar: !isDocsEnv,
});

export default preview;
