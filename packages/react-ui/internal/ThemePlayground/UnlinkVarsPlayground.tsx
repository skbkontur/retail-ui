import React, { useState } from 'react';

import { Checkbox } from '../../components/Checkbox/index.js';
import type { CheckboxProps } from '../../components/Checkbox/index.js';
import { FileUploader } from '../../components/FileUploader/index.js';
import { Paging } from '../../components/Paging/index.js';
import { Radio } from '../../components/Radio/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import { getComponentsFromPropsList } from './helpers.js';

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
