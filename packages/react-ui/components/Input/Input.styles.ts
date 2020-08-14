import { css, keyframes /*memoizeStyle*/ } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { shift } from '../../lib/styles/DimensionFunctions';
import { resetText } from '../../lib/styles/Mixins';
import { isIE11, isEdge } from '../../lib/utils';

import { InputProps } from './Input';

const styles = {
  wrapper() {
    return css`
      align-items: center;
      display: flex;
      margin: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;
      text-overflow: clip;
      white-space: nowrap;
      width: 100%;

      &::before {
        content: '\\A0';
        display: inline-block;
        width: 0;
      }
    `;
  },

  root(
    t: Theme,
    focus: boolean,
    error: boolean,
    warning: boolean,
    disabled: boolean,
    borderless: boolean,
    size: InputProps['size'],
  ) {
    return css`
      ${resetText()};

      align-items: center;
      background-clip: ${getRootBackgroundClip(disabled)};
      background-color: ${getRootBackgroundColor(t, disabled)};
      border-width: ${t.inputBorderWidth};
      border-style: solid;
      border-color: ${getRootBorderColor(t, borderless, focus, error, warning, disabled)};
      box-shadow: ${getRootBoxShadow(t, borderless, focus, error, warning, disabled)};
      box-sizing: border-box;
      color: ${t.inputColor};
      cursor: text;
      display: inline-flex;
      outline: ${getRootOutline(t, focus, error, warning)};
      position: relative;
      width: ${t.inputWidth};
      z-index: ${getRootZIndex(focus, error, warning)};

      font-size: ${getRootFontSize(t, size)};
      line-height: ${getRootLineHeight(t, size)};
      height: ${getRootHeight(t, size)};
      padding-top: ${getRootPaddingTop(t, size)};
      padding-bottom: ${getRootPaddingBottom(t, size)};
      padding-left: ${getRootPaddingX(t, size)};
      padding-right: ${getRootPaddingX(t, size)};
      border-radius: ${getRootBorderRadius(t, size)};

      & * {
        box-sizing: border-box;
      }
    `;
  },

  placeholder(t: Theme, focus: boolean) {
    return css`
      -ms-user-select: none;
      color: ${getPlaceholderColor(t, focus)};
      cursor: text;
      font-size: inherit;
      height: 100%;
      left: 0;
      overflow: hidden;
      pointer-events: none;
      position: absolute;
      top: 0;
      user-select: none;
      white-space: nowrap;
      width: 100%;
    `;
  },

  input(t: Theme, disabled: boolean, focus: boolean) {
    return css`
      -webkit-appearance: none;
      background: transparent;
      border: 0 none;
      color: ${getInputColor(t, disabled)};
      font: inherit;
      line-height: inherit;
      margin: 0;
      outline: none;
      padding: 0;
      text-overflow: clip;
      white-space: nowrap;
      width: 100%;
      pointer-events: ${getInputPointerEvents(disabled)};

      /* fix text color in safari */
      -webkit-text-fill-color: currentcolor;

      &:-moz-placeholder {
        opacity: 1;
      }
      &::-moz-placeholder {
        opacity: 1;
      }
      &::-ms-clear {
        display: none;
      }
      &:-moz-placeholder {
        color: ${getPlaceholderColor(t, focus)};
        -webkit-text-fill-color: ${getPlaceholderColor(t, focus)};
      }
      &::-moz-placeholder {
        color: ${getPlaceholderColor(t, focus)};
        -webkit-text-fill-color: ${getPlaceholderColor(t, focus)};
      }
      &::placeholder {
        color: ${getPlaceholderColor(t, focus)};
        -webkit-text-fill-color: ${getPlaceholderColor(t, focus)};
      }
    `;
  },

  blink(t: Theme) {
    const blinkAnimation = keyframes`
    0% {
      background-color: ${t.inputBlinkColor};
    }
  `;
    return css`
      animation: ${blinkAnimation} 0.15s ease-in;
    `;
  },

  prefix(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColor};
    `;
  },

  suffix(t: Theme) {
    return css`
      color: ${t.inputPlaceholderColor};
    `;
  },

  sideContainer() {
    return css`
      align-items: center;
      display: flex;
      flex-shrink: 0;
      height: 100%;

      &::before {
        content: '\\a0';
        display: inline-block;
        width: 0;
      }
    `;
  },

  rightContainer() {
    return css`
      justify-self: flex-end;
      margin: 0 0 0 auto;
      padding-left: 0;
    `;
  },

  icon(t: Theme, size: InputProps['size'], disabled: boolean) {
    return css`
      color: ${t.inputIconColor};
      width: ${getIconWidth(t, size)}
      flex-shrink: 0;
      cursor: ${getIconCursor(disabled)};
      z-index: 2;
      text-align: center;
      box-sizing: content-box !important;
    `;
  },

  leftIcon(t: Theme, size: InputProps['size']) {
    return css`
      padding-right: ${getIconPaddingX(t, size)};
    `;
  },

  rightIcon(t: Theme, size: InputProps['size']) {
    return css`
      padding-left: ${getIconPaddingX(t, size)};
    `;
  },
};

const getRootBackgroundColor = (t: Theme, disabled: boolean): string => {
  switch (true) {
    case disabled:
      return t.inputDisabledBg;
    default:
      return t.inputBg;
  }
};

const getRootBackgroundClip = (disabled: boolean): string => {
  switch (true) {
    case disabled:
      return 'inherit';
    default:
      return 'padding-box';
  }
};

const getRootBoxShadow = (
  t: Theme,
  borderless: boolean,
  focus: boolean,
  error: boolean,
  warning: boolean,
  disabled: boolean,
): string => {
  switch (true) {
    case borderless:
    case disabled:
      return 'none';
    case (error || warning) && (isIE11 || isEdge):
      return 'none';
    case error:
      return `0 0 0 ${t.inputOutlineWidth} ${t.inputBorderColorError}`;
    case warning:
      return `0 0 0 ${t.inputOutlineWidth} ${t.inputBorderColorWarning}`;
    case focus && (isIE11 || isEdge):
      return 'none';
    case focus:
      return t.inputFocusShadow;
    default:
      return t.inputShadow;
  }
};

const getRootBorderColor = (
  t: Theme,
  borderless: boolean,
  focus: boolean,
  error: boolean,
  warning: boolean,
  disabled: boolean,
): string => {
  switch (true) {
    case borderless:
      return 'transparent';
    case disabled:
      return t.inputDisabledBorderColor;
    case error:
      return t.inputBorderColorError;
    case warning:
      return t.inputBorderColorWarning;
    case focus:
      return t.inputBorderColorFocus;
    default:
      return `${t.inputBorderTopColor} ${t.inputBorderColor} ${t.inputBorderColor}`;
  }
};

const getRootOutline = (t: Theme, focus: boolean, error: boolean, warning: boolean): string => {
  switch (true) {
    case error && (isIE11 || isEdge):
      return `${t.inputBorderWidth} solid ${t.inputBorderColorError}`;
    case warning && (isIE11 || isEdge):
      return `${t.inputBorderWidth} solid ${t.inputBorderColorWarning}`;
    case focus && (isIE11 || isEdge):
      return `${t.inputOutlineWidth} solid ${t.inputFocusOutline}`;
    case focus:
    default:
      return 'none';
  }
};

const getRootZIndex = (focus: boolean, error: boolean, warning: boolean): string => {
  switch (true) {
    case focus:
    case error:
    case warning:
      return '2';
    default:
      return 'inherit';
  }
};

const getRootFontSize = (t: Theme, size: InputProps['size']): string => {
  switch (size) {
    case 'large':
      return t.inputFontSizeLarge;
    case 'medium':
      return t.inputFontSizeMedium;
    case 'small':
    default:
      return t.inputFontSizeSmall;
  }
};

const getRootLineHeight = (t: Theme, size: InputProps['size']): string => {
  if (isIE11 || isEdge) {
    return 'normal';
  }

  switch (size) {
    case 'large':
      return t.inputLineHeightLarge;
    case 'medium':
      return t.inputLineHeightMedium;
    case 'small':
    default:
      return t.inputLineHeightSmall;
  }
};

const getRootHeight = (t: Theme, size: InputProps['size']): string => {
  switch (size) {
    case 'large':
      return t.inputHeightLarge;
    case 'medium':
      return t.inputHeightMedium;
    case 'small':
    default:
      return t.inputHeightSmall;
  }
};

const getRootPaddingY = (t: Theme, size: InputProps['size']): string => {
  switch (size) {
    case 'large':
      return t.inputPaddingYLarge;
    case 'medium':
      return t.inputPaddingYMedium;
    case 'small':
    default:
      return t.inputPaddingYSmall;
  }
};

const getRootPaddingX = (t: Theme, size: InputProps['size']): string => {
  switch (size) {
    case 'large':
      return t.inputPaddingXLarge;
    case 'medium':
      return t.inputPaddingXMedium;
    case 'small':
    default:
      return t.inputPaddingXSmall;
  }
};

const getRootPaddingTop = (t: Theme, size: InputProps['size']): string => {
  let paddingTop = getRootPaddingY(t, size);

  if (size === 'large') {
    paddingTop = shift(paddingTop, '-1');
  }
  if (isIE11 || isEdge) {
    paddingTop = shift(paddingTop, '-1');
  }

  return paddingTop;
};

const getRootPaddingBottom = (t: Theme, size: InputProps['size']): string => {
  let paddingBottom = getRootPaddingY(t, size);

  if (size === 'large') {
    paddingBottom = shift(paddingBottom, '1');
  }
  if (isIE11 || isEdge) {
    paddingBottom = shift(paddingBottom, '1');
  }

  return paddingBottom;
};

const getRootBorderRadius = (t: Theme, size: InputProps['size']): string => {
  switch (size) {
    case 'large':
      return t.inputBorderRadiusLarge;
    case 'medium':
      return t.inputBorderRadiusMedium;
    case 'small':
    default:
      return t.inputBorderRadiusSmall;
  }
};

const getPlaceholderColor = (t: Theme, focus: boolean): string => {
  return focus ? t.inputPlaceholderColorLight : t.inputPlaceholderColor;
};

const getInputColor = (t: Theme, disabled: boolean): string => {
  return disabled ? t.inputTextColorDisabled : t.inputTextColor;
};

const getInputPointerEvents = (disabled: boolean): string => {
  return disabled ? 'none' : 'inherit';
};

const getIconWidth = (t: Theme, size: InputProps['size']): string => {
  switch (size) {
    case 'large':
      return t.inputIconSizeLarge;
    case 'medium':
      return t.inputIconSizeMedium;
    case 'small':
    default:
      return t.inputIconSizeSmall;
  }
};

const getIconPaddingX = (t: Theme, size: InputProps['size']): string => {
  switch (size) {
    case 'large':
      return t.inputIconGapLarge;
    case 'medium':
      return t.inputIconGapMedium;
    case 'small':
    default:
      return t.inputIconGapSmall;
  }
};

const getIconCursor = (disabled: boolean): string => {
  return disabled ? 'default' : 'text';
};

// export const jsStyles = memoizeStyle(styles);
export const jsStyles = styles;
