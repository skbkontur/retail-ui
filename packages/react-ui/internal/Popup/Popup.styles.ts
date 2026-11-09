import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { PopupPositions } from './Popup.js';
import { PopupHelper } from './PopupHelper.js';

const ENTER_TIMING = '0.18s cubic-bezier(0.22, 0.61, 0.36, 1)';
const ENTER_TRANSFORM: Record<string, string> = {
  top: 'translateY(10px)',
  bottom: 'translateY(-10px)',
  left: 'translateX(10px)',
  right: 'translateX(-10px)',
  middle: 'translate(0, 0)',
};

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  popup(t: Theme) {
    return css`
      position: absolute;
      border-radius: ${t.popupBorderRadius};
      border: ${t.popupBorder} ${t.popupBorderColor};
      display: flex;
      width: max-content;
      overflow: visible;
    `;
  },

  popupIgnoreHover() {
    return css`
      pointer-events: none;
    `;
  },

  hoverBridge() {
    return css`
      position: absolute;
      pointer-events: auto;
    `;
  },

  hoverBridgeTop() {
    return css`
      left: 0;
      right: 0;
      bottom: 100%;
      height: var(--popup-hover-bridge-size);
    `;
  },

  hoverBridgeBottom() {
    return css`
      left: 0;
      right: 0;
      top: 100%;
      height: var(--popup-hover-bridge-size);
    `;
  },

  hoverBridgeLeft() {
    return css`
      top: 0;
      bottom: 0;
      right: 100%;
      width: var(--popup-hover-bridge-size);
    `;
  },

  hoverBridgeRight() {
    return css`
      top: 0;
      bottom: 0;
      left: 100%;
      width: var(--popup-hover-bridge-size);
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
      transform: ${ENTER_TRANSFORM.top};
    `;
  },
  'transition-enter-middle'() {
    return css``;
  },
  'transition-enter-bottom'() {
    return css`
      transform: ${ENTER_TRANSFORM.bottom};
    `;
  },
  'transition-enter-left'() {
    return css`
      transform: ${ENTER_TRANSFORM.left};
    `;
  },
  'transition-enter-right'() {
    return css`
      transform: ${ENTER_TRANSFORM.right};
    `;
  },
  transitionEnterActive() {
    return css`
      transition:
        transform ${ENTER_TIMING},
        opacity ${ENTER_TIMING};
      opacity: 1;
      transform: translate(0, 0);
    `;
  },
  positionChangeAnimation() {
    return css`
      ${PopupPositions.map((position) => {
        const { direction } = PopupHelper.getPositionObject(position);
        const transform = ENTER_TRANSFORM[direction];
        const suffix = position.replace(' ', '-');
        // Different alignments also need distinct names to restart the animation.
        const name = `popup-enter-${suffix}`;

        return `
          &.popup-position-${suffix} {
            animation: ${name} ${ENTER_TIMING};
          }
          @keyframes ${name} {
            from { opacity: 0.01; transform: ${transform}; }
            to { opacity: 1; transform: translate(0, 0); }
          }
        `;
      })}
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
}));
