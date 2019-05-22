import createEmotion from 'create-emotion';
import extraScopePlugin from 'stylis-plugin-extra-scope';
import Upgrade from '../Upgrades';

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
  key: 'react-ui',
  stylisPlugins: scope ? [extraScopePlugin(scope)] : undefined,
});
