import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  popup(t: Theme) {
    return css`
      position: absolute;
      min-width: 18px;
      border-radius: ${t.popupBorderRadius};
      border: ${t.popupBorder} ${t.popupBorderColor};
      display: flex;
    `;
  },

  popupIgnoreHover() {
    return css`
      pointer-events: none;
    `;
  },

  content(t: Theme) {
    return css`
      overflow: hidden;
      border-radius: ${t.popupBorderRadius};
      flex-shrink: 0;
    `;
  },

  contentInner(t: Theme) {
    return css`
      color: ${t.popupTextColor};
      background: ${t.popupBackground};
    `;
  },

  shadow(t: Theme) {
    return css`
      filter: ${t.popupDropShadow};
      -webkit-filter: ${t.popupDropShadow};
    `;
  },

  shadowFallback(t: Theme) {
    return css`
      box-shadow: ${t.popupBoxShadow};
    `;
  },

  transitionEnter() {
    return css`
      opacity: 0.01;
    `;
  },
  'transition-enter-top'() {
    return css`
      transform: translateY(10px);
    `;
  },
  'transition-enter-bottom'() {
    return css`
      transform: translateY(-10px);
    `;
  },
  'transition-enter-left'() {
    return css`
      transform: translateX(10px);
    `;
  },
  'transition-enter-right'() {
    return css`
      transform: translateX(-10px);
    `;
  },
  transitionEnterActive() {
    return css`
      transition: transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.18s cubic-bezier(0.22, 0.61, 0.36, 1);
      opacity: 1;
      transform: translate(0, 0) !important;
    `;
  },
  transitionExit() {
    return css`
      opacity: 0.01;
      transition: opacity 0.15s ease-out;
      transform: translate(0, 0) !important;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
