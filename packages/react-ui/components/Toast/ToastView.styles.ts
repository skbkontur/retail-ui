import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';

const getVerticalPaddingsWithCompensation = (theme: Theme) => {
  const { toastPaddingY, fontFamilyCompensationBaseline } = theme;
  const paddingY = parseInt(toastPaddingY);
  const compensation = parseInt(fontFamilyCompensationBaseline);
  return [`${paddingY - compensation}px`, `${paddingY + compensation}px`];
};

export const styles = memoizeStyle({
  root(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddingsWithCompensation(t);
    return css`
      background: ${t.toastBg};
      border-radius: ${t.toastBorderRadius};
      border: ${t.toastBorder};
      color: ${t.toastColor};
      display: inline-flex;
      font-size: ${t.toastFontSize};
      line-height: ${t.toastLineHeight};
      opacity: 1;
      padding: ${paddingTop} ${t.toastPaddingX} ${paddingBottom};
      position: relative;
      top: ${t.toastTop};
    `;
  },

  wrapper(t: Theme) {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 0;
      text-align: center;
      border-radius: ${t.toastBorderRadius};
    `;
  },

  closeWrapper(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddingsWithCompensation(t);
    return css`
      display: flex;
      margin: -${paddingTop} -${t.toastPaddingX} -${paddingBottom} -${t.toastClosePadding};
    `;
  },

  link(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddingsWithCompensation(t);
    const marginRight = `${Math.round(parseInt(t.toastPaddingX) * 1.5)}px`;
    const padding = isTheme2022(t) ? `${paddingTop} ${paddingBottom}` : `${paddingTop} 0 ${paddingBottom}`;

    return css`
      border: none;
      font: inherit;
      color: ${t.toastLinkColor};
      cursor: pointer;
      display: inline-block;
      font-weight: 600;
      background-color: transparent;

      margin: -${paddingTop} ${marginRight} -${paddingBottom} ${t.toastPaddingX};

      padding: ${padding};

      &:hover {
        background: ${t.toastLinkBgHover};
        text-decoration: ${t.toastLinkTextDecorationHover};
      }

      &:active {
        background: ${t.toastLinkBgActive};
      }
    `;
  },

  close(t: Theme) {
    return css`
      box-sizing: content-box !important; // fix "reset.css" problem
      color: ${t.toastCloseColor};
      cursor: pointer;
      display: inline-block;
      height: ${t.toastCloseSize};
      line-height: 0;
      padding: ${t.toastClosePadding};
      text-align: center;
      width: ${t.toastCloseSize};

      &:hover {
        color: ${t.toastCloseHoverColor};
      }
    `;
  },
});
