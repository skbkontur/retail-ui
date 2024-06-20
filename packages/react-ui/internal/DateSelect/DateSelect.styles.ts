import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('select')({
  arrow: 'arrow',
});

export const styles = memoizeStyle({
  disabled(t: Theme) {
    return css`
      padding: ${t.btnPaddingYSmall} calc(5px + ${t.btnIconSizeSmall} + ${t.btnIconGapSmallRight}) ${t.btnPaddingYSmall}
        5px;
      border: ${t.btnBorderWidth} solid transparent;
    `;
  },
});
