// @flow

type AnimateParams = {
  ease?: number => number,
  onFinish?: () => Promise<void>,
  duration?: number
};

export const Animation = () => {
  let animating = false;
  let startTime = 0;
  let endTime = 0;
  let lastEaseValue = 0;
  let promise: Promise<void> = Promise.resolve();
  let target = 0;

  const reset = () => {
    animating = false;
    startTime = 0;
    endTime = 0;
    lastEaseValue = 0;
    target = 0;
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
        onFinish = () => Promise.resolve(),
        duration = 600
      }: AnimateParams
    ) {
      animating = true;
      startTime = Date.now();
      endTime = Date.now() + duration;
      target += value;
      console.log('Animation started');

      const animateInternal = async () => {
        const now = Date.now();

        if (now >= endTime || !animating) {
          console.log('Animation ended');
          reset();
          return onFinish();
        }

        const elapsed = now - startTime;
        const relativeTarget = endTime - startTime;
        const easeFactor = ease(elapsed / relativeTarget);
        const easedValue = easeFactor * target;
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
