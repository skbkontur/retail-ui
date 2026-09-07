import React from 'react';

import { Checkbox } from '../../components/Checkbox/index.js';
import type { CheckboxProps } from '../../components/Checkbox/index.js';
import { Gapped } from '../../components/Gapped/index.js';
import { getComponentsFromPropsList } from './helpers.js';

type CheckboxProp = CheckboxProps & { focused?: boolean };
const propsList: CheckboxProp[] = [
  { children: 'Обычный' },
  { children: 'Выбран', checked: true },
  { children: 'Отключён', checked: true, disabled: true },
  { children: 'Частично выбран', initialIndeterminate: true },
  { children: 'В фокусе', focused: true },
  { children: 'Ошибка', error: true },
  { children: 'Предупреждение', warning: true },
];

export const CheckboxPlayground = () => {
  return (
    <Gapped gap={0} vertical>
      {getComponentsFromPropsList(<Checkbox />, propsList)}
    </Gapped>
  );
};
