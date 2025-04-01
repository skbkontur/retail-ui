import React, { useState } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import type { CheckboxProps } from '../../components/Checkbox';
import { Checkbox } from '../../components/Checkbox';
import { Radio } from '../../components/Radio';
import { FileUploader } from '../../components/FileUploader';
import { Paging } from '../../components/Paging';

import { getComponentsFromPropsList } from './helpers';

type CheckboxProp = CheckboxProps & { focused?: boolean };
const propsList: CheckboxProp[] = [
  { children: 'Semichecked', initialIndeterminate: true },
  { children: 'Checked', checked: true },
  { children: 'Checked & Focused', checked: true, focused: true },
];

export const UnlinkVarsPlayground = () => {
  const theme = ThemeFactory.create({ borderColorFocus: '#7474DA', linkColor: '#0000cc' });
  const [active, setActive] = useState(3);
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ display: 'grid', gap: '10px' }}>
        {getComponentsFromPropsList(<Checkbox />, propsList)}
        <Paging activePage={active} pagesCount={5} onPageChange={(num) => setActive(num)} />
        <FileUploader />
        <Radio value={'foo'} focused />
      </div>
    </ThemeContext.Provider>
  );
};
