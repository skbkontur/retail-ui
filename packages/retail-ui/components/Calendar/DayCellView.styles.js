// @flow

import type { ITheme } from '../theme';

export default function DayCellView(theme: ITheme) {
  return {
    cell: {
      display: 'inline-block',
      boxSizing: 'border-box',
      textAlign: 'center',
      border: '1px solid transparent',
      outline: 'none',
      fontSize: '14px',
      padding: '0',
      background: 'white',
      userSelect: 'none',

      '&:hover': {
        backgroundColor: theme.common.bgActive,
        color: 'white',
        cursor: 'pointer'
      },
      '&:disabled': {
        opacity: 0.5,
        pointerEvents: 'none'
      },
      '&:active:hover': {
        color: 'white'
      }
    },

    weekend: {
      color: 'red'
    },

    today: {
      border: '1px solid #8b8b8b'
    },

    selected: {
      backgroundColor: '#e9e9e9'
    }
  };
}
