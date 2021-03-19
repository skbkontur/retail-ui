import { is8pxTheme } from '../../lib/theming/ThemeHelpers';
import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  paging() {
    return css`
      user-select: none;
      outline: 0;
    `;
  },

  dots(t: Theme) {
    return css`
      color: ${t.pagingDotsColor};
      display: inline-block;
      font-size: ${t.pagingFontSize};
      line-height: ${t.pagingLineHeight};
      padding: ${t.pagingDotsPadding};
    `;
  },

  forwardLink(t: Theme) {
    return css`
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: inline-block;
      font-size: ${t.pagingFontSize};
      line-height: ${t.pagingLineHeight};
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
      ${cssName(styles.forwardLink(t))}& {
        color: ${t.pagingForwardLinkDisabledColor};
      }
    `;
  },

  pageLinkWrapper() {
    return css`
      display: inline-block;
      font-size: 0;
      text-align: center;
      user-select: none;
      vertical-align: top;
    `;
  },

  pageLink(t: Theme) {
    return css`
      border-radius: 50%;
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: block;
      font-size: ${t.pagingFontSize};
      line-height: ${t.pagingLineHeight};
      margin: 2px 1px;
      outline: none;
      min-width: ${t.pagingPageLinkMinWidth};
      padding: ${t.pagingPageLinkPaddingY} ${t.pagingPageLinkPaddingX}
        ${is8pxTheme(t) ? t.pagingPageLinkPaddingY : t.pagingPageLinkLegacyPaddingY};
      text-decoration: none;

      &:not(${cssName(styles.active())}):hover {
        background: ${t.pagingPageLinkHoverBg};
      }

      ${cssName(styles.active())}& {
        background: ${t.pagingPageLinkActiveBg};
        color: ${t.pagingPageLinkActiveColor};
      }
    `;
  },

  active() {
    return css`
      cursor: default;
    `;
  },

  pageLinkFocused(t: Theme) {
    return css`
      margin: 0 -1px !important;
      border: solid 2px ${t.borderColorFocus};
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

      ${cssName(styles.pageLinkWrapper())} & {
        color: ${t.pagingPageLinkHintColor};
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
