import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const getVerticalPaddingsWithCompensation = (theme: Theme) => {
  const { toastPaddingY, fontFamilyCompensationBaseline } = theme;
  const paddingY = parseInt(toastPaddingY);
  const compensation = parseInt(fontFamilyCompensationBaseline);
  return [`${paddingY - compensation}px`, `${paddingY + compensation}px`];
};

const styles = {
  root(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddingsWithCompensation(t);
    return css`
      background: ${t.toastBg};
      border-radius: ${t.toastBorderRadius};
      border: ${t.toastBorder};
      color: ${t.toastColor};
      display: inline-block;
      font-size: ${t.toastFontSize};
      line-height: ${t.toastLineHeight};
      opacity: 1;
      padding: ${paddingTop} ${t.toastPaddingX} ${paddingBottom};
      position: relative;
      top: ${t.toastTop};
    `;
  },

  wrapper() {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 0;
      text-align: center;
    `;
  },

  closeWrapper(t: Theme) {
    return css`
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
    `;
  },

  link(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddingsWithCompensation(t);
    const leftMargin = `${parseInt(t.toastPaddingX) - parseInt(t.toastLinkLegacyMarginLeft)}px`;
    const marginRight = `${Math.round(parseInt(t.toastPaddingX) * 1.5 + parseInt(t.toastLinkLegacyMarginRight))}px`;
    return css`
      color: ${t.toastLinkColor};
      cursor: pointer;
      display: inline-block;
      font-weight: 600;

      margin: -${paddingTop} ${marginRight} -${paddingBottom} ${leftMargin};

      padding: ${paddingTop} 0 ${paddingBottom} 0;

      &:hover {
        text-decoration: underline;
      }
    `;
  },

  close(t: Theme) {
    return css`
      color: ${t.toastCloseColor};
      cursor: pointer;
      display: inline-block;
      height: ${t.toastCloseSize};
      line-height: 0;
      padding: ${t.toastClosePadding};
      padding-right: ${parseInt(t.toastClosePadding) - parseInt(t.toastCloseLegacyShift)}px;
      text-align: center;
      width: ${t.toastCloseSize};

      &:hover {
        color: ${t.toastCloseHoverColor};
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
