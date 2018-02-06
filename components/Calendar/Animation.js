// @flow
import requestAnimationFrame, { cancel as cancelAnimationFrame } from 'raf';
import { stepper } from './stepper';

export const Animation = () => {
  let target = 0;
  let currentPosition = 0;
  let currentVelocity = 0;
  let rafId = 0;
  let animating = false;
  let deltaHandler = x => {};

  const reset = () => {
    currentVelocity = 0;
    currentPosition = 0;
    target = 0;
    animating = false;
    deltaHandler = x => {};
  };

  const inProgress = () => animating;

  const cancel = () => {
    cancelAnimationFrame(rafId);
    reset();
  };

  function animate(amount: number, onDelta: number => void, onEnd: () => void) {
    target += amount;
    deltaHandler = onDelta;
    const animateInternal = () => {
      animating = true;
      const [nextPosition, nextVelocity] = stepper(
        currentPosition,
        currentVelocity,
        target
      );
      const delta = nextPosition - currentPosition;

      deltaHandler(delta);

      if (nextPosition === target && nextVelocity === 0) {
        reset();
        onEnd();
        return;
      }

      currentPosition = nextPosition;
      currentVelocity = nextVelocity;

      rafId = requestAnimationFrame(animateInternal);
    };

    if (!inProgress()) {
      animateInternal();
    }
  }

  return {
    animate,
    inProgress,
    cancel
  };
};
