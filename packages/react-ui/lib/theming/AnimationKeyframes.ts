import React from 'react';

import { keyframes } from './Emotion';
import { Theme } from './Theme';

export const AnimationKeyframes = {
  spinnerCloudOffset(t: Theme) {
    return keyframes`
        0% { stroke-dashoffset: 10; }
        100% { stroke-dashoffset: 116; }
      `;
  },

  spinnerCloudLength(t: Theme) {
    return keyframes`
        0% { stroke-dasharray: 10, 96; }
        50% { stroke-dasharray: 50, 56; }
        100% { stroke-dasharray: 10, 96;}
      `;
  },
  spinnerCircleOffset(t: Theme) {
    return keyframes`
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -231.25%; }
      `;
  },
  spinnerCircleLength(t: Theme) {
    return keyframes`
        0% { stroke-dasharray: 62.5%, 168.75%; }
        50% {  stroke-dasharray: 187.5%, 43.75%; }
        100% { stroke-dasharray: 62.5%, 168.75%; }
      `;
  },
  spinnerCircleRotate(t: Theme) {
    return keyframes`
        100% { transform: rotate(360deg); }
      `;
  },
  spinnerColor(t: Theme) {
    return keyframes`
        100%, 0% { stroke: ${t.red}; }
        40% { stroke: ${t.yellow}; }
        66% { stroke: ${t.green}; }
        80%, 90% { stroke: ${t.brand}; }
      `;
  },
  globalLoaderProgress() {
    return keyframes`
        0% { width: 0; }
        10% { width: 8% }
        20% { width: 16% }
        30% { width: 24% }
        40% { width: 32% }
        50% { width: 40% }
        60% { width: 48% }
        70% { width: 56% }
        80% { width: 64% }
        90% { width: 72% }
        100% { width: 80% }
      `;
  },
  globalLoaderSlowProgress() {
    return keyframes`
        0% { width: 80% }
        25% { width: 84% }
        50% { width: 88% }
        75% { width: 92% }
        100% { width: 95% }
      `;
  },
  globalLoaderWaiting(color: React.CSSProperties['color']) {
    return keyframes`

      from  {
        width: 95%;
        background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent);
        background-position: 40px 0;
        background-size: 40px 40px;
      }
      to    {
        width: 95%;
        background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent);
        background-position: 0 0;
        background-size: 40px 40px;
      }
      `;
  },
  globalLoaderSpinner() {
    return keyframes`
      0% {
        left: 0;
        width: 100%;
        transform: translateX(50%) scaleX(0.005);
        animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
      }
      50% {
        left: 0;
        width: 100%;
        transform: translateX(0%) scaleX(0.35);
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      100% {
        left: 0;
        width: 100%;
        transform: translateX(-50%) scaleX(0.005);
      }

    `;
  },
  globalSpinnerMoveToRight(width: number) {
    return keyframes`
      0% {
        left: 0;
        width: ${width}px;
      }
      50% {
        left: 50%;
        width: ${width}px;
      }
      100% {
        left: 99%;
        width: 1%
      }
    `;
  },
};
