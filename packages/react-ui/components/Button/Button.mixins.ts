import { shift } from '../../lib/styles/DimensionFunctions';
import { isIE11, isEdge } from '../../lib/utils';

export const getBtnPaddingTop = (fontSize: string, paddingY: string): string => {
  return shift(paddingY, `${fontSize === '16px' ? (isIE11 || isEdge ? -2 : -1) : 0}`);
};

export const getBtnPaddingBottom = (fontSize: string, paddingY: string): string => {
  return shift(paddingY, `${fontSize === '16px' ? (isIE11 || isEdge ? 2 : 1) : 0}`);
};

export const getBtnUseBg = (background: string, gradientStart: string, gradientEnd: string) =>
  gradientStart === gradientEnd && background ? background : `linear-gradient(${gradientStart}, ${gradientEnd})`;

export const getBtnArrowUseBg = (isArrowLeft: boolean, gradientStart: string, gradientEnd: string) =>
  gradientStart === gradientEnd
    ? gradientStart
    : `linear-gradient(${isArrowLeft ? 'to top left' : 'to bottom right'}, ${gradientStart}, ${gradientEnd})`;
