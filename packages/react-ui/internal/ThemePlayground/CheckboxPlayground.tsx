import React from 'react';

import { Gapped } from '../../components/Gapped/index.js';
import type { CheckboxProps } from '../../components/Checkbox/index.js';
import { Checkbox } from '../../components/Checkbox/index.js';

import { getComponentsFromPropsList } from './helpers.js';

type CheckboxProp = CheckboxProps & { focused?: boolean };
const propsList: CheckboxProp[] = [
  { children: 'Default' },
  { children: 'Checked', checked: true },
  { children: 'Disabled', checked: true, disabled: true },
  { children: 'Semichecked', initialIndeterminate: true },
  { children: 'Focused', focused: true },
  { children: 'Error', error: true },
  { children: 'Warning', warning: true },
];

export const CheckboxPlayground = () => {
  return (
    <Gapped gap={0} vertical>
      {getComponentsFromPropsList(<Checkbox />, propsList)}
    </Gapped>
  );
};
