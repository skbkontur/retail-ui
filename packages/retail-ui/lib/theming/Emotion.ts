import createEmotion from 'create-emotion';
import extraScopePlugin from 'stylis-plugin-extra-scope';
import Upgrade from '../Upgrades';
import LESS_VARIABLES from '../../components/variables.module.less';

const PREFIX = 'react-ui';

// NOTE: for ones who overrides specificityLevel at custom less
const specificityLevel = parseInt(LESS_VARIABLES.specificityLevel, 10) || 0;
if (specificityLevel) {
  Upgrade.setSpecificityLevel(specificityLevel);
}

const scope = new Array(Upgrade.getSpecificityLevel()).fill('.retail-ui').join('');

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

export function prefixer<T = { [key: string]: string }>(classes: T): T {
  return Object.entries(classes).reduce<T>(
    (pc, [key, value]) => ({ ...pc, [key]: `${PREFIX}-${value}-${Math.floor(Math.random() * 1e8).toString(16)}` }),
    {} as T,
  );
}
