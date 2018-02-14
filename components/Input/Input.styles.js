// @flow

import type { ITheme } from '../theme';

const sidePadding = 10;
const sidePaddingPadded = 25;

export default (theme: ITheme) => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    width: 250
  },
  input: {
    border: `1px solid ${theme.common.borderColorGrayLight}`,
    borderTopColor: theme.common.borderColorGrayDark,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '14px',
    lineHeight: '16px',
    margin: '0',
    outline: 'none',
    padding: [[0, sidePadding]],
    width: '100%',
    webkitAppearance: 'none',

    '&:focus': {
      borderColor: theme.common.borderColorFocus,
      boxShadow: `0 0 0 1px ${theme.common.borderColorFocus}`,
      position: 'relative',
      zIndex: '2'
    },

    '&::-ms-clear': {
      display: 'none'
    }
  },
  sizeSmall: {
    '& $input': {
      lineHeight: '32px'
    }
  },
  sizeMedium: {
    '& $input': {
      lineHeight: '38px',
      fontSize: '16px'
    },
    '& $leftIcon': {
      lineHeight: '40px',
      height: '40px'
    },
    '& $rightIcon': {
      lineHeight: '40px',
      height: '40px'
    }
  },
  sizeLarge: {
    '& $input': {
      lineHeight: '42px',
      fontSize: '16px'
    },
    '& $placeholder': {
      fontSize: '16px',
      height: '21px'
    },
    '& $leftIcon': {
      lineHeight: '44px',
      height: '44px'
    },
    '& $rightIcon': {
      lineHeight: '44px',
      height: '44px'
    }
  },
  disabled: {
    '& $input': {
      background: theme.common.bgDisabled,
      borderColor: theme.common.borderColorGrayLight,
      color: theme.text.colorDisabled
    },
    '& $leftIcon': {
      cursor: 'default'
    },
    '& $rightIcon': {
      cursor: 'default'
    }
  },
  warning: {
    '& $input': {
      borderColor: theme.common.borderColorWarning,
      boxShadow: `0 0 0 1px ${theme.common.borderColorWarning}`,
      position: 'relative',
      zIndex: '2'
    }
  },
  error: {
    '& $input': {
      borderColor: theme.common.borderColorError,
      boxShadow: `0 0 0 1px ${theme.common.borderColorError}`,
      position: 'relative',
      zIndex: '2'
    }
  },
  padLeft: {
    '& $input': {
      paddingLeft: sidePaddingPadded
    },

    '& $placeholder': {
      left: sidePaddingPadded + 1
    }
  },
  padRight: {
    '& $input': {
      paddingRight: sidePaddingPadded
    },

    '& $placeholder': {
      right: sidePaddingPadded + 1
    }
  },
  placeholder: {
    bottom: 1,
    color: '#aaa',
    fontSize: 14,
    lineHeight: 'normal',
    left: sidePadding + 1,
    overflow: 'hidden',
    position: 'absolute',
    right: sidePadding + 1,
    top: 1,
    margin: 'auto',
    whiteSpace: 'nowrap',
    zIndex: '2',
    userSelect: 'none',
    msUserSelect: 'none',
    cursor: 'text',
    height: 18
  },
  icon: {
    color: '#a9a9a9',
    cursor: 'text',
    lineHeight: '34px',
    height: '34px',
    position: 'absolute',
    top: '0',
    zIndex: '2'
  },
  leftIcon: {
    extend: 'icon',
    left: 8
  },
  rightIcon: {
    extend: 'icon',
    right: 8
  },
  borderless: {
    borderColor: 'transparent'
  },
  searchLine: {
    fontSize: '15px',
    borderRadius: '2px',

    '& $leftIcon': {
      fontSize: '22px'
    },
    '&:focus': {
      borderColor: 'transparent',
      boxShadow: 'none'
    }
  }
});
