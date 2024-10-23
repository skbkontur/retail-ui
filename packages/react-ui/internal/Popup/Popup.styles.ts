import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    popup(t: Theme) {
      return emotion.css`
        position: absolute;
        border-radius: ${t.popupBorderRadius};
        border: ${t.popupBorder} ${t.popupBorderColor};
        display: flex;
      width: max-content;
      `;
    },

    popupIgnoreHover() {
      return emotion.css`
        pointer-events: none;
      `;
    },

    content(t: Theme) {
      return emotion.css`
        overflow: hidden;
        border-radius: ${t.popupBorderRadius};
        flex-shrink: 0;
        max-width: 100%;
        line-height: normal;
      `;
    },

    contentInner(t: Theme) {
      return emotion.css`
        color: ${t.popupTextColor};
        background: ${t.popupBackground};
      `;
    },

    shadow(t: Theme) {
      return emotion.css`
        box-shadow: ${t.popupBoxShadow};
      `;
    },

    transitionEnter() {
      return emotion.css`
        opacity: 0.01;
      `;
    },
    'transition-enter-top'() {
      return emotion.css`
        transform: translateY(10px);
      `;
    },
    'transition-enter-middle'() {
      return emotion.css``;
    },
    'transition-enter-bottom'() {
      return emotion.css`
        transform: translateY(-10px);
      `;
    },
    'transition-enter-left'() {
      return emotion.css`
        transform: translateX(10px);
      `;
    },
    'transition-enter-right'() {
      return emotion.css`
        transform: translateX(-10px);
      `;
    },
    transitionEnterActive() {
      return emotion.css`
        transition:
          transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1),
          opacity 0.18s cubic-bezier(0.22, 0.61, 0.36, 1);
        opacity: 1;
        transform: translate(0, 0);
      `;
    },
    transitionExit() {
      return emotion.css`
        opacity: 0.01;
        transition: opacity 0.15s ease-out;
        transform: translate(0, 0);
    `;
    },
    absoluteParent() {
      return emotion.css`
        position: absolute;
        text-align: initial;
      `;
    },
  });
