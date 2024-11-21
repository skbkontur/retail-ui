import { DocsContext } from '@storybook/blocks';
import type { ModuleExports } from '@storybook/types';
import React, { useContext } from 'react';

import { Sticky } from '../../Sticky';
import { Select } from '../../Select';
import { Switcher } from '../../Switcher';
import { Gapped } from '../../Gapped';
import { Toggle } from '../../Toggle';

export const Meta = ({ of }: { of: ModuleExports }) => {
  const context = useContext(DocsContext);

  if (of) {
    context.referenceMeta(of, true);
  }

  return (
    <Sticky side="top">
      <div style={{ padding: '20px', margin: '0 -20px', background: 'white' }}>
        <Gapped>
          <Select
            items={['LIGHT_THEME', 'DARK_THEME', 'LIGHT_THEME_2022_0', 'DARK_THEME_2022_0']}
            //@ts-expect-error: store is not public
            value={context.store.globals.globals.theme}
            onValueChange={(value) => {
              context.channel.emit('updateGlobals', { globals: { theme: value } });
            }}
          />
          <Switcher
            items={['ru-RU', 'en-EN']}
            //@ts-expect-error: store is not public
            value={context.store.globals.globals.locale}
            onValueChange={(value) => {
              context.channel.emit('updateGlobals', { globals: { locale: value } });
            }}
          />
        </Gapped>
        <br />
        <Gapped vertical>
          <Toggle>featureFlagOne</Toggle>
          <Toggle>featureFlagTwo</Toggle>
          <Toggle>featureFlagThree</Toggle>
          <Toggle>featureFlagFour</Toggle>
          <Toggle>featureFlagFIve</Toggle>
        </Gapped>
      </div>
    </Sticky>
  );
};
