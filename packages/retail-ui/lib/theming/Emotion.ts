import createEmotion, { Options } from 'create-emotion';
import Upgrade from '../Upgrades';
import LESS_VARIABLES from '../../components/variables.module.less';

// NOTE Copy-paste from https://github.com/Andarist/stylis-plugin-extra-scope
function extraScopePlugin(extra: string): Options['stylisPlugins'] {
  return (context, _content, selectors, _parents, _line, _column, _length, type) => {
    if (context !== 2 || type === 107) {
      return;
    }
    for (let i = 0; i < selectors.length; i++) {
      selectors[i] = `${extra} ${selectors[i]}`;
    }
  };
}

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
  stylisPlugins: scope ? extraScopePlugin(scope) : undefined,
});

export function prefixer<T = { [key: string]: string }>(classes: T): T {
  return Object.entries(classes).reduce<T>(
    (pc, [key, value]) => ({ ...pc, [key]: `${PREFIX}-${value}-${Math.floor(Math.random() * 1e8).toString(16)}` }),
    {} as T,
  );
}
