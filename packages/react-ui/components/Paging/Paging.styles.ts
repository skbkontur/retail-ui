import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  paging() {
    return css`
      user-select: none;
      outline: 0;
      display: inline-block;
      font-variant-numeric: tabular-nums;
    `;
  },

  pagingMobile() {
    return css`
      text-wrap-mode: nowrap;
    `;
  },

  /** @deprecated Это стиль старого размера `Paging`. Мы планируем удалить его в `6.0` */
  pagingLegacy(t: Theme) {
    return css`
      font-size: ${t.pagingFontSize};
      line-height: ${t.pagingLineHeight};
      font-variant-numeric: normal;
    `;
  },

  pagingSmall(t: Theme) {
    return css`
      font-size: ${t.pagingFontSizeSmall};
      line-height: ${t.pagingLineHeightSmall};
    `;
  },

  pagingMedium(t: Theme) {
    return css`
      font-size: ${t.pagingFontSizeMedium};
      line-height: ${t.pagingLineHeightMedium};
    `;
  },

  pagingLarge(t: Theme) {
    return css`
      font-size: ${t.pagingFontSizeLarge};
      line-height: ${t.pagingLineHeightLarge};
    `;
  },

  pagingDisabled() {
    return css`
      pointer-events: none;
    `;
  },

  dots(t: Theme) {
    return css`
      color: ${t.pagingDotsColor};
      display: inline-block;
    `;
  },

  /** @deprecated Это стиль старого размера `Paging`. Мы планируем удалить его в 6.0 */
  dotsLegacy(t: Theme) {
    return css`
      padding: ${t.pagingDotsPadding};
    `;
  },

  dotsSmall(t: Theme) {
    return css`
      line-height: 0;
      padding: ${t.pagingDotsPaddingSmall};
    `;
  },

  dotsMedium(t: Theme) {
    return css`
      line-height: 0;
      padding: ${t.pagingDotsPaddingMedium};
    `;
  },

  dotsLarge(t: Theme) {
    return css`
      line-height: 0;
      padding: ${t.pagingDotsPaddingLarge};
    `;
  },

  dotsDisabled(t: Theme) {
    return css`
      color: ${t.pagingDotsDisabledColor};
    `;
  },

  forwardLink(t: Theme) {
    return css`
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: inline-block;
      outline: none;
      position: relative;
      text-decoration: none;
      user-select: none;
      vertical-align: top;
    `;
  },

  /** @deprecated Это стиль старого размера `Paging`. Мы планируем удалить его в 6.0 */
  forwardLinkLegacy(t: Theme) {
    return css`
      margin-top: ${t.pagingPageForwardLinkMarginTop};
      margin-left: ${t.pagingPageForwardLinkMarginLeft};
      padding-right: ${t.pagingPageForwardLinkPaddingRight};
    `;
  },

  forwardLinkSmall(t: Theme) {
    return css`
      padding: ${t.pagingForwardLinkPaddingSmall};
    `;
  },

  forwardLinkMedium(t: Theme) {
    return css`
      padding: ${t.pagingForwardLinkPaddingMedium};
    `;
  },

  forwardLinkLarge(t: Theme) {
    return css`
      padding: ${t.pagingForwardLinkPaddingLarge};
    `;
  },

  forwardLinkMediumMobile(t: Theme) {
    return css`
      line-height: ${t.pagingFontSizeMedium};
      padding: ${t.pagingForwardLinkPaddingMediumMobile};
    `;
  },

  forwardLinkLargeMobile(t: Theme) {
    return css`
      line-height: ${t.pagingFontSizeLarge};
      padding: ${t.pagingForwardLinkPaddingLargeMobile};
    `;
  },

  forwardLinkDisabled(t: Theme) {
    return css`
      color: ${t.pagingForwardLinkDisabledColor};
      pointer-events: none;
    `;
  },

  pageLinkWrapper() {
    return css`
      display: inline-flex;
      flex-flow: column nowrap;
      text-align: center;
      user-select: none;
      vertical-align: top;
    `;
  },

  pageLink(t: Theme) {
    return css`
      box-sizing: ${t.pagingPageLinkBoxSizing};
      border-radius: ${t.pagingPageLinkBorderRadius};
      color: ${t.pagingPageLinkColor};
      cursor: pointer;
      display: block;
      outline: none;
      text-decoration: none;

      &:hover {
        background-color: ${t.pagingPageLinkHoverBg};
        transition: background-color ${t.transitionDuration} ${t.transitionTimingFunction};
      }

      &:active {
        background-color: ${t.pagingPageLinkActiveBg};
      }
    `;
  },

  /** @deprecated Это стиль старого размера `Paging`. Мы планируем удалить его в 6.0 */
  pageLinkLegacy(t: Theme) {
    return css`
      margin: ${t.pagingPageLinkMargin};
      min-width: ${t.pagingPageLinkMinWidth};
      padding: ${t.pagingPageLinkPaddingY} ${t.pagingPageLinkPaddingX};
    `;
  },

  pageLinkSmall(t: Theme) {
    return css`
      padding: ${t.pagingPageLinkPaddingYSmall} ${t.pagingPageLinkPaddingXSmall};
    `;
  },

  pageLinkMedium(t: Theme) {
    return css`
      padding: ${t.pagingPageLinkPaddingYMedium} ${t.pagingPageLinkPaddingXMedium};
    `;
  },

  pageLinkLarge(t: Theme) {
    return css`
      padding: ${t.pagingPageLinkPaddingYLarge} ${t.pagingPageLinkPaddingXLarge};
    `;
  },

  pageLinkDisabled(t: Theme) {
    return css`
      color: ${t.linkDisabledColor};
      pointer-events: none;
    `;
  },

  pageLinkCurrent(t: Theme) {
    return css`
      cursor: default;
      background-color: ${t.pagingPageLinkActiveBg} !important;
      color: ${t.pagingPageLinkActiveColor};
    `;
  },

  pageLinkCurrentDisabled(t: Theme) {
    return css`
      background-color: ${t.pagingPageLinkDisabledActiveBg} !important;
      color: ${t.linkDisabledColor};
    `;
  },

  pageLinkFocused(t: Theme) {
    return css`
      ${`
          box-shadow: 0 0 0 2px ${t.borderColorFocus};
        `}
    `;
  },

  transparent() {
    return css`
      color: transparent;
    `;
  },

  pageLinkHint(t: Theme) {
    return css`
      display: inline-block;
      margin: ${t.pagingPageLinkHintMargin};
      font-size: ${t.pagingPageLinkHintFontSize};
      height: ${t.pagingPageLinkHintLineHeight};
      line-height: ${t.pagingPageLinkHintLineHeight};
      color: ${t.pagingPageLinkHintColor};
    `;
  },
});
