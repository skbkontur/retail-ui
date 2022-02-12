import { MenuItemProps } from '../MenuItem';

export const getWrapper = (
  disabled: MenuItemProps['disabled'],
  component: MenuItemProps['component'],
  href: MenuItemProps['href'],
) => {
  if (disabled) {
    return 'button';
  }

  if (component) {
    return component;
  }

  if (href) {
    return 'a';
  }

  return 'button';
};
