import { Element, globalThat, isBrowser } from '../../lib/globalThat';
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
    Pick<DropdownContainerProps, 'menuPos'> {
  target: Element;
  clientHeight: number;
  scrollY: number;
}

export const getManualPosition = ({ menuPos, target, offsetY, clientHeight }: ManualPositionFuncArgs) => {
  if (!menuPos || !isBrowser(globalThat)) {
    return undefined;
  }

  if (menuPos === 'top') {
    return {
      top: null,
      bottom: getTopAlignment({ clientHeight, offsetY, scrollY: globalThat.scrollY, target }),
    };
  }

  if (menuPos === 'bottom') {
    return { top: globalThat.scrollY + getDOMRect(target).top + target.clientHeight + offsetY };
  }
};
