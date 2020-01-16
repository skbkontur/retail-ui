import createEmotion from 'create-emotion';
import { Context, Plugin } from '@emotion/stylis';
import Upgrade from '../Upgrades';
import LESS_VARIABLES from '../../components/variables.module.less';

// NOTE Type according by https://github.com/thysultan/stylis.js
const KEYFRAME = 107;

// NOTE Copy-paste from https://github.com/Andarist/stylis-plugin-extra-scope
function extraScopePlugin(extra: string): Plugin {
  return (context, _content, selectors, _parents, _line, _column, _length, type) => {
    if (context !== Context.BLCKS || type === KEYFRAME) {
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
  stylisPlugins: scope ? extraScopePlugin(scope) : undefined,
});

export const cssName = (className: string): string => `.${className}`;
