import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root() {
    return css`
      display: inline-flex;
      font-weight: 400;
      text-decoration: none;
      position: relative;
      outline: none;
      user-select: none;
    `;
  },

  rootOld(t: ITheme) {
    return css`
      font-weight: 400;
      text-decoration: none;
      position: relative;
      bottom: 2px;
      outline: none;
      user-select: none;
      color: ${t.logoColor};

      &:hover {
        color: ${t.logoHoverColor};
      }
    `;
  },

  divider(t: ITheme) {
    return css`
      position: relative;
      height: 100%;
      margin-left: 16px;
      width: 1px;
      display: flex;
      align-items: center;
      overflow: hidden;

      &:before {
        content: '';
        display: block;
        height: 60%;
        min-height: 25px;
        width: 1px;
        left: 0;
        background-color: ${t.tdDividerBg};
      }
    `;
  },

  dividerOld(t: ITheme) {
    return css`
      height: 60%;
      margin: 0 0 0 10px;
      width: 1px;
      background-color: ${t.tdDividerBg};
    `;
  },

  konturLogo() {
    return css`
      display: inline-flex;
      vertical-align: baseline;
      margin-right: 2px;
    `;
  },

  productLogo() {
    return css`
      display: inline-flex;
      vertical-align: baseline;
    `;
  },

  dropdown() {
    return css`
      height: 100%;
      display: inline-flex;
      flex-wrap: nowrap;
    `;
  },

  dropdownOld() {
    return css`
      display: flex;
    `;
  }
};

export default jsStyles;
