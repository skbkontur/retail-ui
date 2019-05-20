import FLAT_VARIABLES from '../../../components/variables.flat.less';
import { defineInternalTheme } from "../ThemeHelpers";

const FLAT_THEME = defineInternalTheme(FLAT_VARIABLES,{
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
  radioCheckedBgColor: {
    get() {
      return this.chbCheckedBg;
    },
  },
});


export default FLAT_THEME;
