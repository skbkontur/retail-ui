

import type { ITheme } from '../theme/index';

export default function DatePicker(theme: ITheme) {
  return {
    root: {
      display: 'inline-block',
      position: 'relative'
    },

    picker: {
      position: 'relative',
      top: '-1px'
    },

    openButton: {
      color: '#333',
      userSelect: 'none',
      position: 'absolute',
      padding: '0 10px',
      right: '0',
      cursor: 'pointer',
      zIndex: '3',
      top: '0',
      bottom: '0'
    },

    openButtonDisabled: {
      color: theme.link.disabledColor
    }
  };
}
