import { ColorFactory } from '../../lib/styles/ColorFactory';

export class SpinnerFallbackAnimationRunner {
  private interval: ReturnType<typeof rafInterval> | null = null;

  constructor(private animations: Animation[], private FPS: number) {
    this.start();
  }

  public start = () => {
    this.animations.forEach((animation) => animation.start());
    this.interval = rafInterval(() => {
      this.animations.forEach((animation) => animation.step());
    }, this.FPS);
  };

  public stop = () => {
    if (this.interval) {
      this.interval.clear();
      this.animations.forEach((animation) => animation.finish());
    }
  };
}

const rafInterval = (fn: () => void, delay: number) => {
  let lastcall = 0;
  let cleared = false;
  let rafId = 0;

  const interval = () => {
    if (cleared) return;
    const timestamp = new Date().getTime();
    if (!lastcall) lastcall = timestamp;
    if (timestamp - lastcall > delay) {
      fn();
      lastcall = timestamp;
    }
    rafId = requestAnimationFrame(interval);
  };
  interval();

  return {
    clear: () => {
      cleared = true;
      cancelAnimationFrame(rafId);
    },
  };
};

class Animation {
  private startTime = 0;
  private isFinished = false;

  constructor(
    private duration: number,
    private onProgress: (progress: number) => void,
    private onFinish?: (animation: Animation) => void,
  ) {}

  public step = () => {
    if (this.isFinished) return;
    const timestamp = new Date().getTime();
    if (!this.startTime) this.startTime = timestamp;
    const progress = (timestamp - this.startTime) / this.duration;

    this.onProgress(progress);

    if (progress >= 1) {
      this.finish();
    }
  };

  public reset = () => {
    this.startTime = 0;
    this.isFinished = false;
  };

  public finish = () => {
    this.isFinished = true;
    this.onFinish && this.onFinish(this);
  };

  public start = () => {
    if (!this.isFinished) {
      this.step();
    }
  };
}

export const createOffsetAnimation = (
  from: number,
  to: number,
  duration: number,
  setStyleProperty: CSSStyleDeclaration['setProperty'],
  units = '',
) => {
  return new Animation(
    duration,
    (progress) => {
      const current = from + (to - from) * progress;
      setStyleProperty('stroke-dashoffset', `${current}${units}`);
    },
    (animation) => {
      animation.reset();
    },
  );
};

export const createLengthAnimation = (
  from: number[],
  to: number[],
  duration: number,
  setStyleProperty: CSSStyleDeclaration['setProperty'],
  units = '',
) => {
  let reverse = false;
  return new Animation(
    duration,
    (progress) => {
      const p = reverse ? 1 - progress : progress;
      const current = [from[0] + (to[0] - from[0]) * p, from[1] + (to[1] - from[1]) * p];
      setStyleProperty('stroke-dasharray', `${current[0]}${units} ${current[1]}${units}`);
    },
    (animation) => {
      reverse = !reverse;
      animation.reset();
    },
  );
};

export const createColorAnimation = (
  colors: string[],
  duration: number,
  setStyleProperty: CSSStyleDeclaration['setProperty'],
) => {
  const rgbColors = colors.map((color) => ColorFactory.create(color).rgb);
  let currentIndex = 0;
  let nextIndex = 1;

  return new Animation(
    duration,
    (progress) => {
      const from = rgbColors[currentIndex];
      const to = rgbColors[nextIndex];
      if (from && to) {
        const current = [
          Math.round(from[0] + (to[0] - from[0]) * progress),
          Math.round(from[1] + (to[1] - from[1]) * progress),
          Math.round(from[2] + (to[2] - from[2]) * progress),
        ];
        setStyleProperty('stroke', `rgb(${current})`);
      }
    },
    (animation) => {
      animation.reset();
      currentIndex = nextIndex;
      nextIndex = (nextIndex + 1) % colors.length;
    },
  );
};

export const createRotationAnimation = (
  from: number,
  to: number,
  duration: number,
  setStyleProperty: CSSStyleDeclaration['setProperty'],
  units = 'deg',
) => {
  return new Animation(
    duration,
    (progress) => {
      const current = Math.round(from + (to - from) * progress);
      setStyleProperty('transform', `rotate(${current}${units})`);
    },
    (animation) => {
      animation.reset();
    },
  );
};
