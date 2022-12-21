import { getDOMRect } from '../../lib/dom/getDOMRect';

import { DropdownContainerProps } from './DropdownContainer';

interface ManualPositionFuncArgs
  extends Required<Pick<DropdownContainerProps, 'offsetY'>>,
    Pick<DropdownContainerProps, 'pos'> {
  target: Element;
}

export const getTopAligment = ({
  clientHeight,
  offsetY,
  scrollY,
  target,
}: Required<Pick<DropdownContainerProps, 'offsetY'>> & {
  clientHeight: number;
  scrollY: number;
  target: Element;
}) => {
  return clientHeight + offsetY - scrollY - getDOMRect(target).top;
};

export const getManualPositionWithPortal = ({
  pos,
  target,
  offsetY,
  clientHeight,
}: ManualPositionFuncArgs & { clientHeight: number; scrollY: number }) => {
  if (!pos) {
    return undefined;
  }

  if (pos === 'top') {
    return {
      top: null,
      bottom: getTopAligment({ clientHeight, offsetY, scrollY, target }),
    };
  }

  if (pos === 'bottom') {
    return { top: scrollY + getDOMRect(target).top + target.clientHeight + offsetY };
  }
};

export const getManualPositionWithoutPortal = ({ pos, target, offsetY }: ManualPositionFuncArgs) => {
  if (!pos) {
    return undefined;
  }

  const position = getDOMRect(target).height + offsetY;

  if (pos === 'top') {
    return { top: null, bottom: position };
  }

  if (pos === 'bottom') {
    return { top: position };
  }
};
