import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css`
      display: inline-block;
      position: relative;
    `;
  },

  rootMobile(t: Theme) {
    return css`
      width: ${t.selectRootWidthMobile};
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

  arrowDisabled(t: Theme) {
    return css`
      color: ${t.selectMenuArrowColorDisabled};
    `;
  },

  customUseArrow() {
    return css`
      color: inherit;
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
});
