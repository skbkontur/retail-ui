import { globalObject, isBrowser } from '@skbkontur/global-object';
import { Element } from '@skbkontur/global-object/lib';

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
  if (!menuPos || !isBrowser(globalObject)) {
    return undefined;
  }

  if (menuPos === 'top') {
    return {
      top: null,
      bottom: getTopAlignment({ clientHeight, offsetY, scrollY: globalObject.scrollY, target }),
    };
  }

  if (menuPos === 'bottom') {
    return { top: globalObject.scrollY + getDOMRect(target).top + target.clientHeight + offsetY };
  }
};
