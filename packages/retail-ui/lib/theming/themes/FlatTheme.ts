import FLAT_VARIABLES from '../../../components/variables.flat.less';
import { defineInternalTheme } from '../ThemeHelpers';

const FLAT_THEME = defineInternalTheme(FLAT_VARIABLES, {
  btnCheckedShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnCheckedBg}`;
    },
  },
  btnCheckedShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnCheckedBg}`;
    },
  },
  btnFocusBorder: {
    get() {
      return `1px solid ${this.borderColorFocus}`;
    },
  },
  btnCheckedHoverBorderColor: {
    get() {
      return this.btnCheckedBg;
    },
  },
  btnDefaultShadowArrowLeft: {
    get() {
      return this.btnDefaultShadowArrow;
    },
  },
  btnDefaultCheckedShadowArrow: {
    get() {
      return `1px -1px 0 0 rgba(0, 0, 0, 0.15), 0 0 0 1px ${this.btnCheckedBg}`;
    },
  },

  btnDefaultHoverShadowArrow: {
    get() {
      return `1px -1px 0 0 ${this.btnDefaultHoverBorderColor}, 1px -1px 0 0 ${this.btnDefaultHoverBg};`;
    },
  },
  btnDefaultHoverShadowArrowLeft: {
    get() {
      return `1px -1px 0 0 ${this.btnDefaultHoverBorderColor}, 1px -1px 0 0 ${this.btnDefaultHoverBg};`;
    },
  },
  btnDefaultActiveShadowArrow: {
    get() {
      return `1px -1px 0 0 ${this.btnDefaultActiveBorderColor}, 1px -1px 0 0 ${this.btnDefaultActiveBg};`;
    },
  },
  btnDefaultActiveShadowArrowLeft: {
    get() {
      return `1px -1px 0 0 ${this.btnDefaultActiveBorderColor}, 1px -1px 0 0 ${this.btnDefaultActiveBg};`;
    },
  },
  btnPrimaryShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnPrimaryDisabledBg};`;
    },
  },
  btnPrimaryShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnPrimaryDisabledBg};`;
    },
  },
  btnPrimaryHoverShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnPrimaryHoverBg};`;
    },
  },
  btnPrimaryHoverShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnPrimaryHoverBg};`;
    },
  },
  btnPrimaryActiveShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnPrimaryActiveBg};`;
    },
  },
  btnPrimaryActiveShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnPrimaryActiveBg};`;
    },
  },
  btnSuccessShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnSuccessDisabledBg};`;
    },
  },
  btnSuccessShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnSuccessDisabledBg};`;
    },
  },
  btnSuccessHoverShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnSuccessHoverBg};`;
    },
  },
  btnSuccessHoverShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnSuccessHoverBg};`;
    },
  },
  btnSuccessActiveShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnSuccessActiveBg};`;
    },
  },
  btnSuccessActiveShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnSuccessActiveBg};`;
    },
  },
  btnDangerShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnDangerDisabledBg};`;
    },
  },
  btnDangerShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnDangerDisabledBg};`;
    },
  },
  btnDangerHoverShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnDangerHoverBg};`;
    },
  },
  btnDangerHoverShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnDangerHoverBg};`;
    },
  },
  btnDangerActiveShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnDangerActiveBg};`;
    },
  },
  btnDangerActiveShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnDangerActiveBg};`;
    },
  },
  btnPayShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnPayDisabledBg};`;
    },
  },
  btnPayShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnPayDisabledBg};`;
    },
  },
  btnPayHoverShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnPayHoverBg};`;
    },
  },
  btnPayHoverShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnPayHoverBg};`;
    },
  },
  btnPayActiveShadowArrow: {
    get() {
      return `0 0 0 1px ${this.btnPayActiveBg};`;
    },
  },
  btnPayActiveShadowArrowLeft: {
    get() {
      return `0 0 0 1px ${this.btnPayActiveBg};`;
    },
  },
  inputDisabledBorderColor: {
    get() {
      return this.inputDisabledBg;
    },
  },
  chbBorder: {
    get() {
      return this.btnDefaultBorder;
    },
  },
  chbBorderColorFocus: {
    get() {
      return this.borderColorFocus;
    },
  },
  chbHoverBg: {
    get() {
      return this.btnDefaultHoverBg;
    },
  },
  chbActiveBg: {
    get() {
      return this.btnDefaultActiveBg;
    },
  },
  chbCheckedBg: {
    get() {
      return this.borderColorFocus;
    },
  },
  chbBoxIndeterminateBg: {
    get() {
      return this.chbCheckedBg;
    },
  },
  radioHoverBg: {
    get() {
      return this.chbHoverBg;
    },
  },
  radioActiveBg: {
    get() {
      return this.chbActiveBg;
    },
  },
  radioFocusShadow: {
    get() {
      return `inset 0 0 0 1px ${this.outlineColorFocus};`;
    },
  },
  radioCheckedBgColor: {
    get() {
      return this.chbCheckedBg;
    },
  },
  textareaDisabledBorderColor: {
    get() {
      return this.textareaDisabledBg;
    },
  },
});

export default FLAT_THEME;
