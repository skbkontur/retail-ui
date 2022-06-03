import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  root() {
    return css`
      position: relative;
      display: inline-block;
      line-height: normal;

      input::-ms-clear,
      input::-ms-reveal {
        display: none;
      }
    `;
  },
  toggleVisibility(t: Theme) {
    return css`
      color: ${t.passwordInputVisibilityIconColor};
      cursor: pointer;
      opacity: ${t.passwordInputVisibilityIconOpacity};
      user-select: none;

      &:hover {
        color: ${t.passwordInputVisibilityIconHoverColor};
        opacity: ${t.passwordInputVisibilityIconHoverOpacity};
      }
    `;
  },
  capsLockDetector() {
    return css`
      display: inline-block;
      font-size: 9px;
      margin-right: 8px;
      color: #fff;
      cursor: default;
      background: #999;
      padding: 2px 5px;
      border-radius: 3px;
      z-index: 9;
      box-sizing: border-box;
      line-height: normal;

      &::before {
        content: 'CapsLock';
      }
    `;
  },
  // Allows to register repeat click on the eye icon
  repeatIconClickFix() {
    return css`
      pointer-events: none;
    `;
  },
  iconWrapper() {
    return css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `;
  },

  eyeWrapperSmall(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeSmall};
    `;
  },

  eyeWrapperMedium(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeMedium};
    `;
  },

  eyeWrapperLarge(t: Theme) {
    return css`
      min-width: ${t.inputIconSizeLarge};
    `;
  },
});
