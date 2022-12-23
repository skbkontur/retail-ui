import { getDOMRect } from '../../lib/dom/getDOMRect';

import { DropdownContainerProps } from './DropdownContainer';

export const getTopAlignment = ({
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

interface ManualPositionFuncArgs
  extends Required<Pick<DropdownContainerProps, 'offsetY'>>,
    Pick<DropdownContainerProps, 'pos'> {
  target: Element;
  clientHeight: number;
  scrollY: number;
}

export const getManualPosition = ({ pos, target, offsetY, clientHeight }: ManualPositionFuncArgs) => {
  if (!pos) {
    return undefined;
  }

  if (pos === 'top') {
    return {
      top: null,
      bottom: getTopAlignment({ clientHeight, offsetY, scrollY, target }),
    };
  }

  if (pos === 'bottom') {
    return { top: scrollY + getDOMRect(target).top + target.clientHeight + offsetY };
  }
};
