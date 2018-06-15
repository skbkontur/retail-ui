

import type { ITheme } from '../theme/index';

import fontEot from './mask-char-font/font.eot';
import fontWoff from './mask-char-font/font.woff';
import fontWoff2 from './mask-char-font/font.woff2';

export default function DateInput(theme: ITheme) {
  return {
    '@font-face': {
      fontFamily: 'kontur-mask-char',
      src: [
        `url('${fontEot}')`, // For IE11 in IE8 mode.
        `url('${fontEot}?#iefix') format('embedded-opentype')`,
        `url('${fontWoff2}') format('woff2')`,
        `url('${fontWoff}') format('woff')`
      ]
    },

    wrapper: {
      fontFamily: 'kontur-mask-char, Segoe UI, Helevetica Neue',
      display: 'inline-block',
      position: 'relative'
    },

    root: {
      fontFamily: 'kontur-mask-char, Segoe UI, Helevetica Neue',
      cursor: 'text'
    },

    disabled: {
      background: theme.common.bgDisabled,
      borderColor: theme.common.borderColorGrayLight,
      color: theme.text.colorDisabled,
      pointerEvents: 'none'
    },

    mask: {
      color: '#b8b8b8'
    },

    delimiter: {
      color: '#b8b8b8',

      '& $filled': {
        color: 'inherit'
      }
    },

    filled: {},

    icon: {
      position: 'absolute',
      right: '0',
      top: '0',
      bottom: '0',
      width: '40px',
      cursor: 'pointer',
      userSelect: 'none'
    },

    iconInner: {
      position: 'absolute',
      right: '10px',
      top: '0',
      bottom: '0',
      height: '20px',
      margin: 'auto'
    }
  };
}
