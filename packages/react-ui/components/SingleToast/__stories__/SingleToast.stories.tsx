import React from 'react';
import { action } from '@storybook/addon-actions';

import type { Meta } from '../../../typings/stories';
import { SingleToast } from '../SingleToast';

export default {
  title: 'SingleToast',
  component: SingleToast,
  decorators: [
    (Story: () => JSX.Element) => (
      <div
        // make some space for Toast
        style={{
          paddingTop: 300,
          paddingBottom: 8,
          paddingLeft: 8,
          paddingRight: 600,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const StaticErrorMethod = () => (
  <>
    <SingleToast />
    <button data-tid="error-theme" onClick={() => SingleToast.push('vasik', { use: 'error' })}>
      Показать статический тост с ошибкой
    </button>
  </>
);
StaticErrorMethod.storyName = 'static error method';

export const StaticDefaultMethod = () => (
  <>
    <SingleToast />
    <button data-tid="default-theme" onClick={() => SingleToast.push('vasik', { use: 'default' })}>
      Показать статический тост в стандартной расцветке
    </button>
  </>
);
StaticDefaultMethod.storyName = 'static default method';

export const StaticDefaultMethodWithAction = () => (
  <>
    <SingleToast />
    <button
      data-tid="static-default-theme-with-action"
      onClick={() =>
        SingleToast.push('vasik', {
          use: 'default',
          action: {
            label: 'Закрыть',
            handler(): void {
              action('Закрыть');
            },
          },
        })
      }
    >
      Показать статический тост с действием
    </button>
  </>
);
StaticDefaultMethodWithAction.storyName = 'static default method with action';

export const WithOverrideDefaultColor = () => (
  <>
    <SingleToast theme={{ toastBg: '#00BEA2', toastColor: '#ffff' }} />
    <button data-tid="override-default-theme" onClick={() => SingleToast.push('vasik', { use: 'default' })}>
      Показать статический тост в расцветке продукта
    </button>
  </>
);
WithOverrideDefaultColor.storyName = 'with override default color';

// TODO: после выпиливания старого api для Toast.push удалить историю и скриншотный тест
export const OldApi = () => (
  <>
    <SingleToast />
    <button
      data-tid="old-api"
      onClick={() => SingleToast.push('vasik', { handler: () => {}, label: 'Cancel' }, 10_000, true, 'error')}
    >
      Старый api для метода push
    </button>
  </>
);
OldApi.storyName = 'old api';
