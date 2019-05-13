import FLAT_VARIABLES from '../../../components/variables.flat.less';

const FLAT_THEME = Object.assign({}, FLAT_VARIABLES);

Object.defineProperties(FLAT_THEME, {
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
  chbBoxIndeterminateBgHover: {
    get() {
      return this.chbCheckedBg;
    },
  },
  chbBoxIndeterminateBgActive: {
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

export default Object.freeze(FLAT_THEME);
