import { isFunction } from '../../../lib/utils';
import { MenuItemProps } from '../MenuItem';

export const getContent = (children: MenuItemProps['children'], state: MenuItemProps['state']) => {
  if (isFunction(children)) {
    return children(state);
  }

  return children;
};
