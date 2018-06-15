

import { ITheme } from '../theme/index';

export default function DateSelect(theme: ITheme) {
  return {
    root: {
      color: theme.text.colorDefault,
      cursor: 'pointer',
      display: 'inline-block',
      outline: '0',
      position: 'relative',
      textAlign: 'left',
      fontSize: '14px',
      lineHeight: '24px',
      paddingRight: '2px',

      '&:hover': {
        color: theme.link.color
      },

      '&$disabled': {
        color: 'inherit',
        cursor: 'default'
      }
    },

    disabled: {},

    caption: {
      position: 'relative'
    },

    arrow: {
      position: 'absolute',
      top: '0',
      right: '4px',
      lineHeight: '24px',
      float: 'right',
      opacity: '1',
      transition: 'opacity 0.2s ease-out',
      transform: 'scaleX(0.7)',
      color: '#a0a0a0'
    },

    arrowDisabled: {
      opacity: '0'
    },

    menuHolder: {
      background: '#fff',
      boxShadow: [
        ['0 0 0 1px rgba(0, 0, 0, 0.1)'],
        ['0 3px 10px 0 rgba(0, 0, 0, 0.2)']
      ],
      boxSizing: 'content-box',
      marginTop: '-11px',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: '1000'
    },

    isTopCapped: {
      marginTop: '0',
      paddingTop: '5px'
    },

    isBotCapped: {
      paddingBottom: '5px'
    },

    itemsHolder: {
      overflow: 'hidden',
      position: 'relative'
    },

    menuItem: {
      cursor: 'pointer',
      height: '24px',
      userSelect: 'none',
      lineHeight: '24px',
      paddingLeft: '10px',
      whiteSpace: 'nowrap',
      color: theme.text.colorDefault
    },

    menuItemSelected: {
      background: '#ececec'
    },

    menuItemActive: {
      background: theme.common.borderColorFocus,
      color: theme.text.colorInvert
    },

    menuUp: {
      ...menuButton(theme),
      '& span': {
        position: 'relative',
        top: '-0.5px'
      }
    },

    menuDown: {
      ...menuButton(theme),
      '& span': {
        position: 'relative',
        top: '-1px'
      }
    }
  };
}

const menuButton = theme => ({
  cursor: 'pointer',
  userSelect: 'none',
  background: '#fff',
  boxSizing: 'border-box',
  height: '16px',
  color: theme.text.colorDefault,
  textAlign: 'left',
  lineHeight: '0',
  paddingLeft: '18px',

  '&:hover': {
    background: theme.common.borderColorFocus,
    color: theme.text.colorInvert
  }
});
