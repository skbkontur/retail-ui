import createEmotion from 'create-emotion';
import extraScopePlugin from 'stylis-plugin-extra-scope';

import { Upgrade } from '../Upgrades';
import LESS_VARIABLES from '../../components/variables.module.less';

const PREFIX = 'react-ui';

// NOTE: for ones who overrides specificityLevel at custom less
const specificityLevel = parseInt(LESS_VARIABLES.specificityLevel, 10) || 0;
if (specificityLevel) {
  Upgrade.setSpecificityLevel(specificityLevel);
}

const scope = new Array(Upgrade.getSpecificityLevel()).fill(`.${PREFIX}`).join('');

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({
  key: PREFIX,
  stylisPlugins: scope ? [extraScopePlugin(scope)] : undefined,
});

export const cssName = (className: string): string => `.${className}`;
