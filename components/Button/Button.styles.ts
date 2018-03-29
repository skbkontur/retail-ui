import { ITheme } from '../theme';

export default function Button(theme: ITheme) {
  return {
    wrap: {
      boxSizing: 'border-box',
      display: 'inline-block',
      padding: 1
    },

    root: {
      border: '0',
      color: theme.text.colorDefault,
      cursor: 'pointer',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 14,
      margin: 0,
      outline: 0,
      overflow: 'visible',
      position: 'relative',
      width: '100%',

      '&::-moz-focus-inner': {
        border: 0,
        padding: 0
      },

      '&:active': {
        paddingTop: 1,
        verticalAlign: -1
      },

      '&:after': {
        content: '',
        display: 'inline-block',
        verticalAlign: 'baseline',
        width: 0
      },

      '&$focus': {
        boxShadow: [
          ['inset 0 0 0 1px #fff'],
          [`0 0 0 2px ${theme.common.borderColorFocus}`]
        ],
        position: 'relative',
        zIndex: 2
      },

      '&$checked': {
        background: theme.button.checkedBg,
        boxShadow: [
          ['0 0 0 1px rgba(0, 0, 0, 0.6)'],
          ['inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)']
        ],
        color: '#fff',
        paddingTop: '1px',

        '&:hover': {
          background: theme.button.checkedBg,
          boxShadow: [
            ['0 0 0 1px rgba(0, 0, 0, 0.6)'],
            ['inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)']
          ]
        },

        '&$focus': {
          boxShadow: [
            ['inset 0 0 0 1px #fff'],
            [`0 0 0 2px ${theme.common.borderColorFocus}`]
          ],
          position: 'relative',
          zIndex: '2'
        }
      }
    },

    active: {},

    focus: {},

    checked: {},

    borderless: {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none'
      },
      '&:active': {
        boxShadow: 'none'
      }
    },

    caption: {
      position: 'relative',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      width: '100%'
    },

    icon: {
      display: 'inline-block',
      paddingRight: '7px'
    },

    sizeSmall: {
      height: '32px',
      lineHeight: '32px',
      padding: '0 15px'
    },

    sizeMedium: {
      fontSize: 16,
      height: '38px',
      lineHeight: '38px',
      padding: '0 15px'
    },

    DEPRECATED_sizeMedium: {
      fontSize: 14,
      height: '38px',
      lineHeight: '38px',
      padding: '0 15px'
    },

    sizeLarge: {
      fontSize: 16,
      height: '42px',
      lineHeight: 'px',
      padding: '0 20px'
    },

    buttonWithIcon: {
      paddingRight: 15,
      paddingLeft: 15
    },

    default: generateUseStyles(
      theme.button.defaultHoverBgStart,
      theme.button.defaultHoverBgEnd,
      theme.button.defaultHoverShadow,
      theme.button.defaultActiveBg,
      theme.button.defaultActiveShadow,
      theme.button.defaultBgStart,
      theme.button.defaultBgEnd,
      theme.button.defaultShadow,
      'none'
    ),

    primary: generateUseStyles(
      theme.button.primaryHoverBgStart,
      theme.button.primaryHoverBgEnd,
      theme.button.primaryHoverShadow,
      theme.button.primaryActiveBg,
      theme.button.primaryActiveShadow,
      theme.button.primaryBgStart,
      theme.button.primaryBgEnd,
      theme.button.primaryShadow,
      '#fff'
    ),

    success: generateUseStyles(
      theme.button.successHoverBgStart,
      theme.button.successHoverBgEnd,
      theme.button.successHoverShadow,
      theme.button.successActiveBg,
      theme.button.successActiveShadow,
      theme.button.successBgStart,
      theme.button.successBgEnd,
      theme.button.successShadow,
      '#fff'
    ),

    danger: generateUseStyles(
      theme.button.dangerHoverBgStart,
      theme.button.dangerHoverBgEnd,
      theme.button.dangerHoverShadow,
      theme.button.dangerActiveBg,
      theme.button.dangerActiveShadow,
      theme.button.dangerBgStart,
      theme.button.dangerBgEnd,
      theme.button.dangerShadow,
      '#fff'
    ),

    pay: generateUseStyles(
      theme.button.payHoverBgStart,
      theme.button.payHoverBgEnd,
      theme.button.payHoverShadow,
      theme.button.payActiveBg,
      theme.button.payActiveShadow,
      theme.button.payBgStart,
      theme.button.payBgEnd,
      theme.button.payShadow,
      'none'
    ),

    link: {
      display: 'inline',
      padding: '0',
      margin: '0',
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      height: 'auto',

      '& $caption': {
        display: 'inline'
      },

      '&$disabled': {
        boxShadow: 'none',
        background: 'none'
      },

      '&$focus $caption': {
        textDecoration: 'underline'
      },

      $icon: {
        paddingRight: theme.link.iconPadding
      },

      ...generateLinkStyles(
        theme.link.color,
        theme.link.hoverColor,
        theme.link.hoverColor,
        theme.link.activeColor
      )
    },

    disabled: {
      background: theme.common.bgDisabled,
      boxShadow: `0 0 0 1px ${theme.common.borderColorGrayLight}`,
      color: '#808080',
      cursor: 'default',
      pointerEvents: 'none',

      '&:active': {
        paddingTop: 0,
        verticalAlign: 0
      }
    },

    loading: {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      borderRadius: 'inherit',
      overflow: 'hidden',

      '&:before': {
        content: '""',
        height: '100%',
        position: 'absolute',
        opacity: '0.2',
        background: `linear-gradient(
          -110deg, #ccc 30%, transparent 0, transparent 60%, #ccc 0
        )`,
        backgroundSize: '30px 100%',
        top: '0',
        left: '0',
        right: '-30px',
        transform: 'rotateY(180deg) skewX(0deg) skewY(0deg)',
        animation: 'btn_loading 1s linear infinite'
      }
    },

    [keyframes('btn_loading')]: {
      from: {
        transform: 'translateX(0) rotateY(180deg)'
      },
      to: {
        transform: 'translateX(-30px) rotateY(180deg)'
      }
    },

    btn_loading: {},
    btn_loading_arrow: {},

    warning: {
      borderRadius: 'inherit',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      boxShadow: `0 0 0 2px ${theme.common.borderColorWarning}`
    },

    error: {
      extend: 'warning',
      boxShadow: `0 0 0 2px ${theme.common.borderColorError}`
    },

    narrow: {
      paddingLeft: 5,
      paddingRight: 5
    },

    noPadding: {
      paddingLeft: 0,
      paddingRight: 0
    },

    noRightPadding: {
      paddingRight: 0
    },

    // TODO: arrow styles
    arrow: {},
    wrap_arrow: {},
    arrow_loading: {},
    arrow_warning: {},
    arrow_error: {}
  };
}

const generateUseStyles = (
  hoverColorStart: string,
  hoverColorEnd: string,
  hoverShadow: string | string[][],
  activeColor: string,
  activeShadow: string | string[][],
  colorStart: string,
  colorEnd: string,
  shadow: string | string[][],
  color: string
) => ({
  backgroundImage: `linear-gradient(${colorStart}, ${colorEnd})`,
  color,
  boxShadow: shadow,

  '&:hover': {
    backgroundImage: `linear-gradient(${hoverColorStart}, ${hoverColorEnd})`,
    boxShadow: hoverShadow
  },

  '&:active': {
    background: activeColor,
    boxShadow: activeShadow
  },

  '&$active': {
    background: activeColor,
    boxShadow: activeShadow
  }
});

const generateLinkStyles = (
  color: string,
  hoverColor: string,
  focusColor: string,
  activeColor: string
) => ({
  borderRadius: '1px',
  outline: 'none',
  textDecoration: 'none',
  color,

  '&:hover': {
    color: hoverColor
  },

  '&$focus': {
    color: focusColor
  },

  '&:active': {
    color: activeColor,
    verticalAlign: '0'
  }
});

const keyframes = (name: string) => '@keyframes ' + name;
