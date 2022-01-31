import { useState } from 'react';

import { MenuItemProps } from './MenuItem';

export const useMouseEvents = (
  onMouseEnter: MenuItemProps['onMouseEnter'],
  onMouseLeave: MenuItemProps['onMouseLeave'],
) => {
  const [hasMouseEntered, setHasMouseEntered] = useState(false);

  /**
   * https://github.com/facebook/react/issues/10109
   *
   * `mouseenter` event is not triggered
   * when cursor moves away from disabled button.
   */
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasMouseEntered && onMouseEnter) {
      setHasMouseEntered(true);
      onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setHasMouseEntered(false);
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  return { handleMouseEnter, handleMouseLeave };
};
