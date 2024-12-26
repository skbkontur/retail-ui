import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  calendarRoot() {
    return css`
      width: auto;
    `;
  },
  inputWrap() {
    return css`
      display: flex;
      align-items: center;

      & > * {
        flex: 1 1 50%;
      }
    `;
  },
});
