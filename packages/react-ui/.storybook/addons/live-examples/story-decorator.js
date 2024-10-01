import { addons } from '@storybook/manager-api';
import React from 'react';
import { CanvasReplacer, Example } from './components';
import { extractLanguageFromFilename } from './components/utils';
import { LIVE_EXAMPLES_ADDON_ID } from './config';
import { DARK_THEME, DEFAULT_THEME, DEFAULT_THEME_8PX_OLD, FLAT_THEME_8PX_OLD, THEME_2022, THEME_2022_DARK, ThemeFactory, ThemeContext } from '@skbkontur/react-ui';
import { DEFAULT_THEME_MOBILE } from '@skbkontur/react-ui/lib/theming/themes/DefaultThemeMobile';
export var reactUiThemes = {
  DEFAULT_THEME: DEFAULT_THEME,
  DARK_THEME: DARK_THEME,
  DEFAULT_THEME_8PX_OLD: DEFAULT_THEME_8PX_OLD,
  FLAT_THEME_8PX_OLD: FLAT_THEME_8PX_OLD,
  DEFAULT_THEME_MOBILE: DEFAULT_THEME_MOBILE,
  THEME_2022: THEME_2022,
  THEME_2022_DARK: THEME_2022_DARK
};
export var decorator = function decorator(storyFn, context) {
  var _docs$source;
  var story = storyFn();
  if (context.viewMode !== 'docs' || context.parameters.defaultCanvas || addons.getConfig()[LIVE_EXAMPLES_ADDON_ID].defaultCanvas) return story;
  var _context$parameters = context.parameters,
    _context$parameters$l = _context$parameters.live,
    live = _context$parameters$l === void 0 ? true : _context$parameters$l,
    _context$parameters$e = _context$parameters.expanded,
    expanded = _context$parameters$e === void 0 ? false : _context$parameters$e,
    docs = _context$parameters.docs,
    scope = _context$parameters.scope;
  var code = docs !== null && docs !== void 0 && (_docs$source = docs.source) !== null && _docs$source !== void 0 && _docs$source.originalSource ? "render(".concat(docs.source.originalSource, ")") : 'No code available';
  return /*#__PURE__*/React.createElement(CanvasReplacer, {
    id: context.id
  }, /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, function (theme) {
    var example = /*#__PURE__*/React.createElement(Example, {
      code: code,
      live: live,
      expanded: expanded,
      scope: scope,
      language: typeof context.parameters.fileName === 'string' ? extractLanguageFromFilename(context.parameters.fileName) : undefined
    });
    var storybookTheme = reactUiThemes[context.globals.theme] || DEFAULT_THEME; // todo typed
    if (storybookTheme === DEFAULT_THEME) {
      return example;
    }
    return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
      value: ThemeFactory.create(theme, storybookTheme)
    }, example);
  }));
};
export default decorator;