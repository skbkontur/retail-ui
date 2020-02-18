import { css, cssName } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  paging(t: Theme) {
    return css`
      user-select: none;
      outline: 0;
    `;
  },

  dots(t: Theme) {
    return css`
      color: ${t.pagingDotsColor};
      display: inline-block;
      font-size: 16px;
      padding: 6px 10px 0;
    `;
  },

  forwardLink(t: Theme) {
    return css`
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: inline-block;
      font-size: 16px;
      margin: 4px 0 2px 10px;
      outline: none;
      padding-right: 22px;
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

  forwardIcon() {
    return css`
      vertical-align: -2px;
      position: absolute;
      right: 0;
    `;
  },

  disabled(t: Theme) {
    return css`
      ${cssName(jsStyles.forwardLink(t))}& {
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
      border-radius: 16px;
      color: ${t.pagingForwardLinkColor};
      cursor: pointer;
      display: block;
      font-size: 16px;
      margin: 2px 1px;
      outline: none;
      padding: 2px 10px 5px;
      text-decoration: none;

      &:not(${cssName(jsStyles.active())}):hover {
        background: ${t.pagingPageLinkHoverBg};
      }

      ${cssName(jsStyles.active())}& {
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

  pageLinkHintPlaceHolder() {
    return css`
      height: 15px;
    `;
  },

  pageLinkHint(t: Theme) {
    return css`
      display: inline-block;
      margin: 0 -20px;
      font-size: 11px;

      ${cssName(jsStyles.pageLinkWrapper())} & {
        color: ${t.pagingPageLinkHintColor};
      }
    `;
  },
};
