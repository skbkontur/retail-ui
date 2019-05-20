import DEFAULT_VARIABLES from '../../../components/variables.less';
import { defineInternalTheme } from '../ThemeHelpers';

const DEFAULT_THEME = defineInternalTheme(DEFAULT_VARIABLES, {
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
  toggleBgWarning: {
    get() {
      return this.warningMain;
    },
  },
  toggleBgError: {
    get() {
      return this.errorMain;
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
});

export default DEFAULT_THEME;
