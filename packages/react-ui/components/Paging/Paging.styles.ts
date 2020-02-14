import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import styles from './Paging.module.less';

export const jsStyles = {
  dots(t: Theme) {
    return css`
      color: ${t.pagingDotsColor};
    `;
  },

  forwardLink(t: Theme) {
    return css`
      color: ${t.pagingForwardLinkColor};
    `;
  },

  disabled(t: Theme) {
    return css`
      .${styles.forwardLink}& {
        color: ${t.pagingForwardLinkDisabledColor};
      }
    `;
  },

  pageLink(t: Theme) {
    return css`
      .${styles.pageLinkWrapper} & {
        color: ${t.pagingForwardLinkColor};
      }
      .${styles.pageLinkWrapper} &:not(.${styles.active}):hover {
        background: ${t.pagingPageLinkHoverBg};
      }
    `;
  },

  active(t: Theme) {
    return css`
      .${styles.pageLinkWrapper} .${styles.pageLink}& {
        background: ${t.pagingPageLinkActiveBg};
        color: ${t.pagingPageLinkActiveColor};
      }
    `;
  },

  focused(t: Theme) {
    return css`
      .${styles.pageLinkWrapper} .${styles.pageLink}& {
        border: solid 2px ${t.borderColorFocus};
      }
    `;
  },

  pageLinkHint(t: Theme) {
    return css`
      .${styles.pageLinkWrapper} & {
        color: ${t.pagingPageLinkHintColor};
      }
    `;
  },
};
