import { is8pxTheme } from '../../lib/theming/ThemeHelpers';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  paging(t: Theme) {
    return css`
      user-select: none;
      outline: 0;
      font-size: ${t.pagingFontSize};
      line-height: ${t.pagingLineHeight};
    `;
  },

  dots(t: Theme) {
    return css`
      color: ${t.pagingDotsColor};
      display: inline-block;
      padding: ${t.pagingDotsPadding};
    `;
  },

  forwardLink(t: Theme) {
    return css`
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: inline-block;
      margin-top: ${t.pagingPageForwardLinkMarginTop};
      margin-left: ${t.pagingPageForwardLinkMarginLeft};
      outline: none;
      padding-right: ${t.pagingPageForwardLinkPaddingRight};
      position: relative;
      text-decoration: none;
      user-select: none;
      vertical-align: top;
    `;
  },

  forwardLinkFocused() {
    return css`
      text-decoration: underline;
    `;
  },

  forwardIcon(t: Theme) {
    return css`
      vertical-align: -2px;
      position: absolute;
      margin-top: ${t.pagingForwardIconMarginTop};
      right: 0;
    `;
  },

  disabled(t: Theme) {
    return css`
      color: ${t.pagingForwardLinkDisabledColor};
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
      border-radius: ${t.pagingPageLinkBorderRadius};
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: block;
      margin: ${t.pagingPageLinkMargin};
      outline: none;
      min-width: ${t.pagingPageLinkMinWidth};
      padding: ${t.pagingPageLinkPaddingY} ${t.pagingPageLinkPaddingX}
        ${is8pxTheme(t) ? t.pagingPageLinkPaddingY : t.pagingPageLinkLegacyPaddingY};
      text-decoration: none;

      &:hover {
        background: ${t.pagingPageLinkHoverBg};
      }
    `;
  },

  active(t: Theme) {
    return css`
      cursor: default;
      background: ${t.pagingPageLinkActiveBg} !important; // override hover styles
      color: ${t.pagingPageLinkActiveColor};
    `;
  },

  pageLinkFocused(t: Theme) {
    return css`
      ${is8pxTheme(t)
        ? `
          box-shadow: 0 0 0 2px ${t.borderColorFocus};
        `
        : `
          margin: 0 -1px;
          border: solid 2px ${t.borderColorFocus};`}
    `;
  },

  transparent() {
    return css`
      color: transparent;
    `;
  },

  pageLinkHintPlaceHolder(t: Theme) {
    return css`
      height: ${t.pagingPageLinkHintLineHeight};
      line-height: ${t.pagingPageLinkHintLineHeight};
    `;
  },

  pageLinkHint(t: Theme) {
    return css`
      display: inline-block;
      margin: 0 -20px;
      font-size: ${t.pagingPageLinkHintFontSize};
      line-height: ${t.pagingPageLinkHintLineHeight};
      color: ${t.pagingPageLinkHintColor};
    `;
  },
});
