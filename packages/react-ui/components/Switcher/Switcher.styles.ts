import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css`
      line-height: normal;
    `;
  },

  wrap() {
    return css`
      display: inline-block;
      vertical-align: middle;
    `;
  },

  input() {
    return css`
      height: 0;
      opacity: 0;
      position: absolute;
      width: 0;
    `;
  },

  caption(t: Theme) {
    return css`
      color: ${t.switcherTextColor};
      vertical-align: middle;
      display: inline-block;
    `;
  },

  captionSmall(t: Theme) {
    return css`
      margin-right: ${t.switcherCaptionGapSmall};
      font-size: ${t.switcherCaptionFontSizeSmall};
      line-height: ${t.switcherCaptionLineHeightSmall};
    `;
  },

  captionMedium(t: Theme) {
    return css`
      margin-right: ${t.switcherCaptionGapMedium};
      font-size: ${t.switcherCaptionFontSizeMedium};
      line-height: ${t.switcherCaptionLineHeightMedium};
    `;
  },

  captionLarge(t: Theme) {
    return css`
      margin-right: ${t.switcherCaptionGapLarge};
      font-size: ${t.switcherCaptionFontSizeLarge};
      line-height: ${t.switcherCaptionLineHeightLarge};
    `;
  },

  error(t: Theme) {
    const insideWidth = parseInt(t.btnBorderWidth);
    const outsideWidth = `${parseInt(t.switcherOutlineWidth) - insideWidth}px`;
    return css`
      border-radius: ${t.switcherBorderRadius};
      box-shadow: inset 0 0 0 ${insideWidth}px ${t.borderColorError}, 0 0 0 ${outsideWidth} ${t.borderColorError};
    `;
  },
});
