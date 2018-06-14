// @flow

import type { ITheme } from '../theme/index';

export default function Checkbox(theme: ITheme) {
  return {
    root: {
      cursor: 'pointer',
      display: 'inline-block',
      position: 'relative',
      userSelect: 'none',
      lineHeight: '20px',

      '&$withoutCaption $box': {
        position: 'relative'
      },

      '&:hover $box': {
        background: 'linear-gradient(-180deg, #f2f2f2 0, #dfdfdf 100%)'
      },

      '&:active $box': {
        background: '#e1e1e1',
        boxShadow: [
          ['0 -1px 0 0 rgba(0, 0, 0, 0.1)'],
          ['0 0 0 1px rgba(0, 0, 0, 0.2)'],
          ['inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)']
        ]
      }
    },

    withoutCaption: {},

    disabled: {
      color: theme.text.colorDisabled,
      cursor: 'default',

      '& $box': {
        background: `${theme.common.bgDisabled} !important`,
        color: theme.text.colorDisabled,
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.15) !important'
      }
    },

    input: {
      display: 'inline-block',
      opacity: 0,
      width: 0,
      height: 0,
      position: 'absolute',
      zIndex: -1
    },

    box: {
      position: 'absolute',
      display: 'inline-block',
      top: '2px',
      left: 0,
      background: 'linear-gradient(#fdfdfd, #ededed)',
      boxShadow: [
        ['0 1px 0 0 rgba(0, 0, 0, 0.15)'],
        ['0 0 0 1px rgba(0, 0, 0, 0.15)']
      ],
      borderRadius: '2px',
      width: '16px',
      height: '16px',
      color: theme.text.colorDefault,
      lineHeight: '20px'
    },

    focus: {
      '& $box': {
        boxShadow: [
          ['inset 0 0 0 1px #fff'],
          [`0 0 0 2px ${theme.common.borderColorFocus}`]
        ]
      }
    },

    warning: {
      '& $box': {
        boxShadow: [
          ['inset 0 0 0 1px #fff'],
          [`0 0 0 2px ${theme.common.borderColorWarning}`]
        ]
      }
    },

    error: {
      '& $box': {
        boxShadow: [
          ['inset 0 0 0 1px #fff'],
          [`0 0 0 2px ${theme.common.borderColorError}`]
        ]
      }
    },

    ok: {
      left: '1px',
      position: 'absolute',
      top: '-2px'
    },

    caption: {
      paddingLeft: '26px'
    }
  };
}
