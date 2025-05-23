import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  popup(t: Theme) {
    return css`
      position: absolute;
      border-radius: ${t.popupBorderRadius};
      border: ${t.popupBorder} ${t.popupBorderColor};
      display: flex;
      width: max-content;
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
      max-width: 100%;
      line-height: normal;
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
  'transition-enter-middle'() {
    return css``;
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
      transition:
        transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 0.18s cubic-bezier(0.22, 0.61, 0.36, 1);
      opacity: 1;
      transform: translate(0, 0);
    `;
  },
  transitionExit() {
    return css`
      opacity: 0.01;
      transition: opacity 0.15s ease-out;
      transform: translate(0, 0);
    `;
  },
  absoluteParent() {
    return css`
      position: absolute;
      text-align: initial;
    `;
  },
});
