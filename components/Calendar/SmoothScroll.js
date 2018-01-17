// @flow

import normalizeWheel from 'normalize-wheel';

export function SmoothScrollFactory(
  frequency: number,
  scrollHandler: (delta: number) => void
) {
  let currentTarget = 0;
  let lastPosition = 0;
  let speed = 0;
  let isAnimating = false;

  function handleWheel(event: SyntheticWheelEvent<HTMLElement>) {
    event.preventDefault();
    const { pixelY } = normalizeWheel(event);

    currentTarget += pixelY;

    speed = (currentTarget - lastPosition) / frequency;

    if (!isAnimating) {
      animate();
    }
  }

  function animate() {
    isAnimating = true;
    lastPosition += speed;
    scrollHandler(speed);
    onFrameEnd();
  }

  function onAnimationEnd() {
    currentTarget = 0;
    lastPosition = 0;
    isAnimating = false;
  }

  function onFrameEnd() {
    if (Math.abs(lastPosition - currentTarget) > 1e-3) {
      requestAnimationFrame(animate);
    } else {
      onAnimationEnd();
    }
  }

  return {
    handleWheel
  };
}
