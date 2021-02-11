import React from 'react';

import { Gapped } from '../../components/Gapped';
import { Radio, RadioProps } from '../../components/Radio';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';

import { getComponentsFromPropsList } from './helpers';

const propsList: RadioProps<string>[] = [
  { value: '', children: 'Default', checked: false },
  { value: '', children: 'Checked' },
  { value: '', children: 'Disabled', disabled: true },
  { value: '', children: 'Focused', focused: true },
  { value: '', children: 'Error', error: true },
  { value: '', children: 'Warning', warning: true },
];

export const RadioPlayground = () => {
  const theme = React.useContext(ThemeContext);
  const gap = is8pxTheme(theme) ? 0 : 10;
  return (
    <Gapped gap={gap} vertical>
      {getComponentsFromPropsList(<Radio value={''} checked />, propsList)}
    </Gapped>
  );
};
