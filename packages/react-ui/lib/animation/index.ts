import requestAnimationFrame, { cancel as cancelAnimationFrame } from 'raf';

import { emptyHandler } from '../utils';

import { stepper } from './stepper';

export const animation = () => {
  let animating = false;
  let currentPosition = 0;
  let currentVelocity = 0;
  let rafId = 0;
  let target = 0;

  let deltaHandler = emptyHandler;
  let animationEndHandler = emptyHandler;

  function reset() {
    currentVelocity = 0;
    currentPosition = 0;
    target = 0;
    animating = false;
    deltaHandler = emptyHandler;
    animationEndHandler = emptyHandler;
  }

  function inProgress() {
    return animating;
  }

  function cancel() {
    cancelAnimationFrame(rafId);
    reset();
  }

  function finish() {
    animationEndHandler();
    cancel();
  }

  function animate(amount: number, onDelta: (x0: number) => void, onEnd: () => void = emptyHandler) {
    target += amount;
    deltaHandler = onDelta;
    animationEndHandler = onEnd;

    const animateInternal = () => {
      animating = true;
      const [nextPosition, nextVelocity] = stepper(currentPosition, currentVelocity, target);
      const delta = nextPosition - currentPosition;

      deltaHandler(delta);

      if (nextPosition === target && nextVelocity === 0) {
        animationEndHandler();
        reset();
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
    cancel,
    finish,
  };
};
