import { useEffect, useState } from 'react';

import { MouseEventType } from '../../typings/event-types';

import { DISPLAY_DELAY, HintProps } from './Hint';

const clearTimer = (timer: number | undefined) => {
  clearTimeout(timer);
  timer = undefined;
};

export const useDelayDisplaying = (
  manual: HintProps['manual'],
  opened: HintProps['opened'],
  onMouseLeave: HintProps['onMouseLeave'],
  onMouseEnter: HintProps['onMouseEnter'],
) => {
  const [isOpen, setIsOpen] = useState(manual ? opened : false);
  let timer: number | undefined = undefined;

  useEffect(() => {
    if (!manual) {
      return;
    }

    setIsOpen(!!opened);
  }, [manual, opened]);

  useEffect(() => {
    return clearTimer(timer);
  }, [timer]);

  const handleMouseEnter = (e: MouseEventType) => {
    if (!manual && !timer) {
      timer = window.setTimeout(() => {
        setIsOpen(true);
      }, DISPLAY_DELAY);
    }

    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: MouseEventType) => {
    if (!manual) {
      clearTimer(timer);

      setIsOpen(false);
    }

    onMouseLeave?.(e);
  };

  return { isOpen, handleMouseEnter, handleMouseLeave };
};
