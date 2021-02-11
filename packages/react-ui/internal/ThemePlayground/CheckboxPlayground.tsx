import React from 'react';

import { Gapped } from '../../components/Gapped';
import { Checkbox, CheckboxProps } from '../../components/Checkbox';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';

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

export const CheckboxPlayground = () => {
  const theme = React.useContext(ThemeContext);
  const gap = is8pxTheme(theme) ? 0 : 10;
  return (
    <Gapped gap={gap} vertical>
      {getComponentsFromPropsList(<Checkbox />, propsList)}
    </Gapped>
  );
};
