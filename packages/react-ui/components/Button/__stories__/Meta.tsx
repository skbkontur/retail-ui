import { DocsContext } from '@storybook/blocks';
import type { ModuleExports } from '@storybook/types';
import { useContext } from 'react';

export const Meta = ({ of }: { of: ModuleExports }) => {
  const context = useContext(DocsContext);
  if (of) {
    context.referenceMeta(of, true);
  }
  return null;
}
