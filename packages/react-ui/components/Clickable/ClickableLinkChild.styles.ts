import { Theme } from '../../lib/theming/Theme';
import { memoizeStyle, css } from '../../lib/theming/Emotion';

export const linkChildStyles = memoizeStyle({
  linkLineTextWrapper(t: Theme) {
    // При hover'е подчеркивание из прозрачного переходит в currentColor.
    // За счет наложения этого цвета на подчеркивание lineText (currentColor с половинной прозрачностью)
    // достигается эффект перехода currentColor с половинной прозрачностью до currentColor.

    // Планировалось добавить transition и color-mix(in srgb, currentColor 50%, transparent) в lineText.
    // Однако, в chrome и edge сочетание transition, color-mix и currentColor вызывает моргание при transition.
    return css`
      @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
        transition: border-bottom-color ${t.transitionDuration} ${t.transitionTimingFunction};
        border-bottom-style: ${t.linkLineBorderBottomStyle};
        border-bottom-width: ${t.linkLineBorderBottomWidth};
        border-bottom-color: transparent;
      }
    `;
  },
  linkLineTextWrapperFocused(t: Theme) {
    return css`
      @supports (border-bottom-color: ${t.linkLineBorderBottomColor}) {
        border-bottom-color: currentColor;
      }
    `;
  },
  linkLineText(t: Theme) {
    return css`
      border-bottom-style: ${t.linkLineBorderBottomStyle};
      border-bottom-width: ${t.linkLineBorderBottomWidth};
      border-bottom-color: ${t.linkLineBorderBottomColor};
    `;
  },
});
