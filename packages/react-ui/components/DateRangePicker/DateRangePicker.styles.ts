import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css``;
  },
  inputWrapper() {
    return css`
      display: inline-flex;
      align-items: center;

      & > * {
        flex: 1 1 50%;
      }
    `;
  },
  inputVisuallyFocus(t: Theme) {
    return css`
      box-shadow: none;
      outline: ${t.inputOutlineWidth} solid ${t.inputFocusOutline};
    `;
  },
  inputWrapperWidth(t: Theme) {
    return css`
      min-width: ${parseInt(t.calendarCellWidth) * 7 + parseInt(t.calendarPaddingX) * 2}px;
    `;
  },

  calendarMobile() {
    return css`
      width: auto;
    `;
  },
  calendarWrapper(t: Theme) {
    return css`
      box-shadow: ${t.pickerShadow};
      display: inline-block;
      font-size: 0;
      z-index: 1000;
      touch-action: none;
    `;
  },
});
