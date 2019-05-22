import DEFAULT_VARIABLES from '../../../components/variables.less';
import { defineInternalTheme } from '../ThemeHelpers';
import ColorFunctions from '../../styles/ColorFunctions';
import { keyframes } from '../Emotion';

const DEFAULT_THEME = defineInternalTheme(DEFAULT_VARIABLES, {
  bgActive: {
    get() {
      return this.blueLight;
    },
  },
  borderColorFocus: {
    get() {
      return this.blueLight;
    },
  },
  borderColorError: {
    get() {
      return this.errorMain;
    },
  },
  borderColorWarning: {
    get() {
      return this.warningMain;
    },
  },
  controlHeightSmall: {
    get() {
      const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;
      const paddingYSmall = parseInt(this.controlPaddingYSmall, 10) || 0;
      const lineHeightSmall = parseInt(this.controlLineHeightSmall, 10) || 0;
      return `${2 * borderWidth + 2 * paddingYSmall + lineHeightSmall}`;
    },
  },
  controlHeightMedium: {
    get() {
      const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;
      const paddingYMedium = parseInt(this.controlPaddingYMedium, 10) || 0;
      const lineHeightMedium = parseInt(this.controlLineHeightMedium, 10) || 0;
      return `${2 * borderWidth + 2 * paddingYMedium + lineHeightMedium}`;
    },
  },
  controlHeightLarge: {
    get() {
      const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;
      const paddingYLarge = parseInt(this.controlPaddingYLarge, 10) || 0;
      const lineHeightLarge = parseInt(this.controlLineHeightLarge, 10) || 0;
      return `${2 * borderWidth + 2 * paddingYLarge + lineHeightLarge}`;
    },
  },
  linkHoverColor: {
    get() {
      return this.linkColor;
    },
  },
  linkDisabledColor: {
    get() {
      return this.textColorDisabled;
    },
  },
  dropdownMenuHoverBg: {
    get() {
      return this.bgActive;
    },
  },
  btnDisabledShadowColor: {
    get() {
      return this.borderColorGrayLight;
    },
  },
  tabColorFocus: {
    get() {
      return this.borderColorFocus;
    },
  },
  tabColorError: {
    get() {
      return this.btnDangerBg;
    },
  },
  tabColorWarning: {
    get() {
      return this.btnPayBg;
    },
  },
  tabColorSuccess: {
    get() {
      return this.btnSuccessBg;
    },
  },
  tabColorPrimary: {
    get() {
      return this.btnPrimaryBg;
    },
  },
  tabColorHover: {
    get() {
      return this.borderColorFocusLight;
    },
  },
  tabColorHoverError: {
    get() {
      return ColorFunctions.lighten(this.tabColorError, '25%');
    },
  },
  tabColorHoverWarning: {
    get() {
      return ColorFunctions.lighten(this.tabColorWarning, '25%');
    },
  },
  tabColorHoverSuccess: {
    get() {
      return ColorFunctions.lighten(this.tabColorSuccess, '25%');
    },
  },
  tabColorHoverPrimary: {
    get() {
      return ColorFunctions.lighten(this.tabColorPrimary, '25%');
    },
  },
  calendarCellHoverBgColor: {
    get() {
      return this.bgActive;
    },
  },
  dateSelectMenuBg: {
    get() {
      return this.bgDefault;
    },
  },
  dateSelectMenuItemBgActive: {
    get() {
      return this.bgActive;
    },
  },
  dateSelectMenuItemBgDisabled: {
    get() {
      return this.bgDefault;
    },
  },
  dateSelectMenuItemFontActive: {
    get() {
      return this.textColorInvert;
    },
  },
  dateSelectMenuItemFontSelected: {
    get() {
      return this.textColorDefault;
    },
  },
  dateSelectMenuItemFontDisabled: {
    get() {
      return this.textColorDisabled;
    },
  },
  pagingForwardLinkColor: {
    get() {
      return this.linkColor;
    },
  },
  pagingForwardLinkDisabledColor: {
    get() {
      return this.linkDisabledColor;
    },
  },
  toggleBgError: {
    get() {
      return this.errorMain;
    },
  },
  toggleBgWarning: {
    get() {
      return this.warningMain;
    },
  },
  toggleFocusShadowColor: {
    get() {
      return this.borderColorFocus;
    },
  },
  inputFocusShadow: {
    get() {
      return `0 0 0 1px ${this.borderColorFocus}`;
    },
  },
  inputDisabledBg: {
    get() {
      return this.bgDisabled;
    },
  },
  inputDisabledBorderColor: {
    get() {
      return this.borderColorGrayLight;
    },
  },
  inputDisabledColor: {
    get() {
      return this.bgDisabled;
    },
  },
  inputFocusOutline: {
    get() {
      return this.borderColorFocus;
    },
  },
  inputBorderWidth: {
    get() {
      return this.controlBorderWidth;
    },
  },
  inputBorderTopColor: {
    get() {
      return this.borderColorGrayDark;
    },
  },
  chbBorderColorFocus: {
    get() {
      return this.borderColorFocus;
    },
  },
  textareaBorderTopColor: {
    get() {
      return this.borderColorGrayDark;
    },
  },
  textareaDisabledBg: {
    get() {
      return this.bgDisabled;
    },
  },
  textareaDisabledBorderColor: {
    get() {
      return this.borderColorGrayLight;
    },
  },
  spinnerBgColor: {
    get() {
      return this.grayXLight;
    },
  },
  spinnerDimmedColor: {
    get() {
      return this.gray;
    },
  },
  spinnerCaptionColor: {
    get() {
      return this.gray;
    },
  },
  spinnerKeyframesCloudOffset: {
    get() {
      return keyframes`
        0% { stroke-dashoffset: 10; }
        100% { stroke-dashoffset: 116; }
      `;
    },
  },
  spinnerKeyframesCloudLength: {
    get() {
      return keyframes`
        0% { stroke-dasharray: 10, 96; }
        50% { stroke-dasharray: 50, 56; }
        100% { stroke-dasharray: 10, 96;}
      `;
    },
  },
  spinnerKeyframesCircleOffset: {
    get() {
      return keyframes`
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -37; }
      `;
    },
  },
  spinnerKeyframesCircleLength: {
    get() {
      return keyframes`
        0% { stroke-dasharray: 10, 27; }
        50% {  stroke-dasharray: 30, 7; }
        100% { stroke-dasharray: 10, 27; }
      `;
    },
  },
  spinnerKeyframesCircleRotate: {
    get() {
      return keyframes`
        100% { transform: rotate(360deg); }
      `;
    },
  },
  spinnerKeyframesColor: {
    get() {
      return keyframes`
        100%, 0% { stroke: ${this.red}; }
        40% { stroke: ${this.yellow}; }
        66% { stroke: ${this.green}; }
        80%, 90% { stroke: ${this.brand}; }
      `;
    },
  },
});

export default DEFAULT_THEME;
