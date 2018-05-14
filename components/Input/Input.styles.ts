import { ITheme } from '../theme';

const sidePadding = 10;
const sidePaddingPadded = 25;

const verticalPadding = {
  small: 6,
  medium: 10,
  large: 12
};

const paddingMixin = (size: 'small' | 'medium' | 'large') => ({
  paddingTop: verticalPadding[size],
  paddingBottom: verticalPadding[size],
  paddingLeft: sidePadding,
  paddingRight: sidePadding
});

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
    lineHeight: '20px',
    margin: '0',
    outline: 'none',
    width: '100%',
    webkitAppearance: 'none',
    transition: 'background-color 0.15s ease-in',

    '&:focus': {
      borderColor: theme.common.borderColorFocus,
      boxShadow: `0 0 0 1px ${theme.common.borderColorFocus}`,
      zIndex: '2'
    },

    '&::-ms-clear': {
      display: 'none'
    }
  },
  blink: {
    backgroundColor: theme.common.blinkColor
  },
  sizeSmall: {
    '& $input': {
      ...paddingMixin('small')
    }
  },
  sizeMedium: {
    '& $input': {
      ...paddingMixin('medium'),
      fontSize: '16px'
    },
    '& $icon': {
      fontSize: '16px',
      height: '22px'
    }
  },
  DEPRECATED_sizeMedium: {
    '& $input': {
      ...paddingMixin('medium'),
      fontSize: '14px'
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
      ...paddingMixin('large'),
      fontSize: '16px'
    },
    '& $placeholder': {
      fontSize: '16px',
      height: '21px'
    },
    '& $icon': {
      fontSize: '16px',
      height: '22px'
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
    position: 'absolute',
    top: '0',
    bottom: '0',
    height: 20,
    margin: 'auto'
  },
  leftIcon: {
    ...iconBase(),
    left: 0,

    '& $icon': {
      left: sidePadding
    }
  },
  rightIcon: {
    ...iconBase(),
    right: 0,

    '& $icon': {
      right: sidePadding
    }
  },
  borderless: {
    borderColor: 'transparent'
  }
});

const iconBase = () => ({
  color: '#a9a9a9',
  cursor: 'text',
  position: 'absolute',
  top: '0',
  bottom: '0',
  width: sidePaddingPadded,
  display: 'inline-block',
  zIndex: '2'
});
