import { DocsContext } from '@storybook/blocks';
import type { ModuleExports } from '@storybook/types';
import React, { useContext } from 'react';

import { Sticky } from '../../Sticky';
import { Switcher } from '../../Switcher';

export const Meta = ({ of }: { of: ModuleExports }) => {
  const context = useContext(DocsContext);

  if (of) {
    context.referenceMeta(of, true);
  }

  return (
    <Sticky side="top">
      <div style={{ padding: '20px', margin: '0 -20px', background: 'white' }}>
        <Switcher
          items={['LIGHT_THEME', 'DARK_THEME']}
          //@ts-expect-error: store is not public
          value={context.store.globals.globals.theme}
          onValueChange={(value) => {
            context.channel.emit('updateGlobals', { globals: { theme: value } });
          }}
        />
      </div>
    </Sticky>
  );
};
