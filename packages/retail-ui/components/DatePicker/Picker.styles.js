

import type { ITheme } from '../theme/index';

export default function Picker(theme: ITheme) {
  return {
    root: {
      display: 'inline-block',
      background: '#fff',
      boxShadow: [
        ['0 0 0 1px rgba(0, 0, 0, 0.1)'],
        ['0 3px 10px 0 rgba(0, 0, 0, 0.2)']
      ],
      zIndex: '1000',
      fontSize: '0'
    },

    todayWrapper: {
      border: 'none',
      backgroundColor: 'white',
      borderTop: '1px solid #dfdede',
      paddingTop: '7px',
      paddingBottom: '8px',
      color: '@link-color',
      display: 'block',
      width: '100%',
      fontSize: '14px',

      '&:hover': {
        backgroundColor: '#f5f5f5',
        cursor: 'pointer'
      },

      '&:active': {
        color: theme.link.activeColor
      }
    }
  };
}
