// @flow

import normalizeWheel from 'normalize-wheel';

type SmoothScrollState = {
  currentTarget: number,
  lastPosition: number,
  speed: number,
  isAnimating: boolean,
  startTime: ?number
};

const getInitialState = (): SmoothScrollState => ({
  currentTarget: 0,
  lastPosition: 0,
  speed: 0,
  isAnimating: false,
  startTime: null
});

export function SmoothScrollFactory(
  frequency: number,
  scrollHandler: number => void,
  /**
   * easing recieves number from 0 to 1, and returns eased value
   */
  easing: number => number = x => x
) {
  let state = getInitialState();

  function handleWheel(event: SyntheticWheelEvent<HTMLElement>) {
    event.preventDefault();
    if (!state.startTime) {
      state.startTime = Date.now();
    }
    // $FlowIgnore startTime is defined here
    const elapsed = Date.now() - state.startTime;

    const { pixelY } = normalizeWheel(event);

    state.currentTarget += pixelY;

    state.speed = (state.currentTarget - state.lastPosition) / frequency;

    if (!state.isAnimating) {
      state.isAnimating = true;
      animate();
    }
  }

  function animate() {
    state.lastPosition += state.speed;
    scrollHandler(state.speed);
    onFrameEnd();
  }

  function onAnimationEnd() {
    state = getInitialState();
  }

  function onFrameEnd() {
    if (Math.abs(state.lastPosition - state.currentTarget) > 1e-3) {
      requestAnimationFrame(animate);
    } else {
      onAnimationEnd();
    }
  }

  return {
    handleWheel
  };
}
