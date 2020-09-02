import { shift } from '../../lib/styles/DimensionFunctions';
import { isIE11, isEdge } from '../../lib/utils';

const shiftPadding = (fontSize: string, padding: string, direction: -1 | 1) => {
  if (fontSize === '16px') {
    padding = shift(padding, `${direction}`);
  }
  if (isIE11 || isEdge) {
    padding = shift(padding, `${direction}`);
  }
  return padding;
};

export const getBtnPaddingTop = (fontSize: string, paddingY: string): string => {
  return shiftPadding(fontSize, paddingY, -1);
};

export const getBtnPaddingBottom = (fontSize: string, paddingY: string): string => {
  return shiftPadding(fontSize, paddingY, 1);
};

export const getBtnUseBg = (background: string, gradientStart: string, gradientEnd: string) =>
  gradientStart === gradientEnd && background ? background : `linear-gradient(${gradientStart}, ${gradientEnd})`;

export const getBtnArrowUseBg = (isArrowLeft: boolean, gradientStart: string, gradientEnd: string) =>
  gradientStart === gradientEnd
    ? gradientStart
    : `linear-gradient(${isArrowLeft ? 'to top left' : 'to bottom right'}, ${gradientStart}, ${gradientEnd})`;
