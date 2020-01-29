import React from 'react';

import { Gapped } from '../../Gapped';
import { Radio, RadioProps } from '../../Radio';

import { getComponentsFromPropsList } from './helpers';

const propsList: Array<RadioProps<string>> = [
  { value: '', children: 'Default', checked: false },
  { value: '', children: 'Checked' },
  { value: '', children: 'Disabled', disabled: true },
  { value: '', children: 'Focused', focused: true },
  { value: '', children: 'Error', error: true },
  { value: '', children: 'Warning', warning: true },
];

export class RadioPlayground extends React.Component<{}, {}> {
  public render() {
    return <Gapped vertical>{getComponentsFromPropsList(<Radio value={''} checked />, propsList)}</Gapped>;
  }
}
