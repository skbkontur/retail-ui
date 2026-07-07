import type { TooltipExtendedPosition, TooltipPosition } from '../ValidationTooltip.js';

const STANDARD_TOOLTIP_POSITIONS: readonly TooltipPosition[] = [
  'top left',
  'top center',
  'top right',
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left middle',
  'left bottom',
  'right top',
  'right middle',
  'right bottom',
];

export const isStandardTooltipPosition = (position: TooltipExtendedPosition): position is TooltipPosition => {
  return (STANDARD_TOOLTIP_POSITIONS as readonly string[]).includes(position);
};
