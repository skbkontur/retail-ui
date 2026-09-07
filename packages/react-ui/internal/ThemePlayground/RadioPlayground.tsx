import React from 'react';

import { Gapped } from '../../components/Gapped/index.js';
import { Radio } from '../../components/Radio/index.js';
import type { RadioProps } from '../../components/Radio/index.js';
import { getComponentsFromPropsList } from './helpers.js';

const propsList: Array<RadioProps<string>> = [
  { value: '', children: 'Обычный', checked: false },
  { value: '', children: 'Выбран' },
  { value: '', children: 'Отключён', disabled: true },
  { value: '', children: 'В фокусе', focused: true },
  { value: '', children: 'Ошибка', error: true },
  { value: '', children: 'Предупреждение', warning: true },
];

export const RadioPlayground = () => {
  return (
    <Gapped gap={0} vertical>
      {getComponentsFromPropsList(<Radio value={''} checked />, propsList)}
    </Gapped>
  );
};
