import { injectGlobal } from '@emotion/css';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import type { Meta } from '@storybook/react';
import React from 'react';

import { Text } from '../Text.js';

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
      <Text as="h2" size="24" weight="bold">
        Когда требуется создавать службу охраны труда
      </Text>
      <Text as="p" size="18" wide>
        Работодатели с численностью более 50 человек создают свою службу охраны труда или вводят в штатное расписание
        должность специалиста по охране труда в обязательном порядке (ч. 1 ст. 223 ТК РФ). Предприятия с меньшим штатом
        организуют СОТ с учетом своей специфики.
      </Text>
    </Gapped>
  );
};

ExampleBasic.storyName = 'Базовый пример';
