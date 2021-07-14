import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      display: inline-block;
      position: relative;

      @media ${t.mobileMediaQuery}  {
        width: ${t.mobileSelectWidth};
      },
    `;
  },

  rootMobile(t: Theme) {
    return css`
      left: 0;
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 100000;
    `;
  },

  mobileWithSearch(t: Theme) {
    return css`
      top: 0;
      right: 0;
      max-height: 100vh;
      background-color: ${t.bgDefault};
    `;
  },

  placeholder(t: Theme) {
    return css`
      color: ${t.selectPlaceholderColor};
      text-overflow: ellipsis;
    `;
  },

  placeholderDisabled(t: Theme) {
    return css`
      color: ${t.selectPlaceholderColorDisabled};
    `;
  },

  customUsePlaceholder() {
    return css`
      color: inherit;
      opacity: 0.7;
    `;
  },

  arrowWrap(t: Theme) {
    return css`
      color: ${t.selectMenuArrowColor};
      flex-shrink: 0;
    `;
  },

  customUseArrow() {
    return css`
      color: inherit !important;
      opacity: 0.7;
    `;
  },

  label() {
    return css`
      flex: 1 1 auto;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `;
  },

  search() {
    return css`
      margin: 1px 4px 4px;
    `;
  },

  leftIconSmall(t: Theme) {
    return css`
      padding-right: ${t.selectIconGapSmall};
      width: ${t.btnIconSizeSmall};
    `;
  },

  leftIconMedium(t: Theme) {
    return css`
      padding-right: ${t.selectIconGapMedium};
      width: ${t.btnIconSizeMedium};
    `;
  },

  leftIconLarge(t: Theme) {
    return css`
      padding-right: ${t.selectIconGapLarge};
      width: ${t.btnIconSizeLarge};
    `;
  },

  leftIconLink(t: Theme) {
    return css`
      padding-right: ${t.btnLinkIconMarginRight};
    `;
  },

  selectButtonContainer() {
    return css`
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
    `;
  },

  bg(t: Theme) {
    return css`
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      background: #333333;
      opacity: 50%;
      z-index: 9999;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
