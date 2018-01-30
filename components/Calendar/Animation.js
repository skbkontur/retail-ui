// @flow

type AnimateParams = {
  ease?: number => number,
  onFinish?: () => void,
  duration?: number
};

export const Animation = () => {
  let animating = false;
  let startTime = 0;
  let endTime = 0;
  let lastEaseValue = 0;
  let promise: Promise<void> = Promise.resolve();

  const reset = () => {
    animating = false;
    startTime = 0;
    endTime = 0;
    lastEaseValue = 0;
  };

  return {
    cancel() {
      animating = false;
      return promise;
    },
    isAnimating() {
      return animating;
    },
    animationPromise() {
      return promise;
    },
    async animate(
      value: number,
      onDelta: number => Promise<void>,
      {
        ease = t => --t * t * t + 1,
        onFinish = () => {},
        duration = 600
      }: AnimateParams
    ) {
      animating = true;
      startTime = startTime || Date.now();
      endTime = (endTime || Date.now()) + duration;

      const animateInternal = async () => {
        const now = Date.now();

        if (now >= endTime || !animating) {
          onFinish();
          reset();
          return Promise.resolve();
        }

        const elapsed = now - startTime;
        const relativeTarget = endTime - startTime;
        const easeFactor = ease(elapsed / relativeTarget);
        const easedValue = easeFactor * value;
        const delta = easedValue - lastEaseValue;
        await onDelta(delta);

        lastEaseValue = easedValue;
        return new Promise(resolve =>
          requestAnimationFrame(() => {
            animateInternal().then(resolve);
          })
        );
      };
      promise = animateInternal();
      return promise;
    }
  };
};
