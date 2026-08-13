import { injectGlobal } from '@emotion/css';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import type { Meta } from '@storybook/react';
import React from 'react';

import { Heading } from '../Heading.js';
import { Text } from '../Text.js';

// oxlint-disable-next-line import/no-default-export
export default {
  title: 'Typography',
  component: Text,
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta;

injectGlobal(`
  [data-role="preview"] * {
    font-family: Lab Grotesque, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [data-role=wrapper]:has([data-typography-controls]),
  [data-role=preview]:has([data-typography-controls]) {
    overflow: visible !important;
    padding-bottom: 0 !important;
  }
`);

/**
 * Пример текста с заголовками и парагарфами
 */
export const ExampleBasic = () => {
  return (
    <Gapped vertical gap={12}>
      <Heading as="h2" use="heading-xs">
        Документация Kontur UI
      </Heading>
      <Text as="p" use="body-wide-l">
        Набор готовых React-компонентов, токенов, шаблонов и принципов, которые помогают разработчикам быстро и
        предсказуемо собирать пользовательские интерфейсы. Подходит для команд, которым важны консистентность и
        увеличение скорости вывода продуктов в продакшн.
      </Text>
    </Gapped>
  );
};

ExampleBasic.storyName = 'Базовый пример';
