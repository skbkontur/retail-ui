import React from 'react';

import { Gapped } from '../../components/Gapped';
import { Checkbox, CheckboxProps } from '../../components/Checkbox';

import { getComponentsFromPropsList } from './helpers';

const propsList: Array<CheckboxProps & { focused?: boolean }> = [
  { children: 'Default' },
  { children: 'Checked', checked: true },
  { children: 'Disabled', checked: true, disabled: true },
  { children: 'Semichecked', initialIndeterminate: true },
  { children: 'Focused', focused: true },
  { children: 'Error', error: true },
  { children: 'Warning', warning: true },
];

export class CheckboxPlayground extends React.Component<{}, {}> {
  public render() {
    return <Gapped vertical>{getComponentsFromPropsList(<Checkbox />, propsList)}</Gapped>;
  }
}
