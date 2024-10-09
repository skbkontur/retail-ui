import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  paging(t: Theme) {
    return css`
      user-select: none;
      outline: 0;
      font-size: ${t.pagingFontSize};
      line-height: ${t.pagingLineHeight};
      display: inline-block;
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
      padding: ${t.pagingDotsPadding};
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
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: block;
      margin: ${t.pagingPageLinkMargin};
      outline: none;
      min-width: ${t.pagingPageLinkMinWidth};
      padding: ${t.pagingPageLinkPaddingY} ${t.pagingPageLinkPaddingX} ${t.pagingPageLinkPaddingY};
      text-decoration: none;

      &:hover {
        background: ${t.pagingPageLinkHoverBg};
      }
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
      background: ${t.pagingPageLinkActiveBg} !important; // override hover styles
      color: ${t.pagingPageLinkActiveColor};
    `;
  },

  pageLinkCurrentDisabled(t: Theme) {
    return css`
      background: ${t.pagingPageLinkDisabledActiveBg} !important;
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
