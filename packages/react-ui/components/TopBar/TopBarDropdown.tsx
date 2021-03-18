import React from 'react';

import { isKeyArrowVertical, isKeyEnter, isKeySpace, someKeys } from '../../lib/events/keyboard/identifiers';
import { Nullable } from '../../typings/utility-types';
import { IconProps } from '../../internal/icons/20px';
import { DropdownMenu, DropdownMenuProps } from '../DropdownMenu';
import { PopupMenuCaptionProps } from '../../internal/PopupMenu';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { TopBarButtonItem } from './TopBarButtonItem';

export interface TopBarDropdownProps extends CommonProps, Omit<DropdownMenuProps, 'caption' | 'disableAnimations'> {
  icon?: IconProps['name'];
  minWidth?: string | number | null;
  use: 'danger' | 'pay' | 'default';
  label: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Дропдаун в топбаре
 *
 * @visibleName TopBar.Dropdown
 */

export class TopBarDropdown extends React.Component<TopBarDropdownProps> {
  public static __KONTUR_REACT_UI__ = 'TopBarDropdown';

  public static defaultProps = {
    use: 'default',
  };

  private dropdownMenu: Nullable<DropdownMenu> = null;

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }

  private renderMain = (props: CommonWrapperRestProps<TopBarDropdownProps>) => {
    return (
      <DropdownMenu {...props} ref={this.refDropdownMenu} caption={this.renderButton}>
        {this.props.children}
      </DropdownMenu>
    );
  };

  public open = (): void => {
    if (this.dropdownMenu) {
      this.dropdownMenu.open();
    }
  };

  public close = (): void => {
    if (this.dropdownMenu) {
      this.dropdownMenu.close();
    }
  };

  private refDropdownMenu = (ref: Nullable<DropdownMenu>) => (this.dropdownMenu = ref);

  private renderButton = (captionProps: PopupMenuCaptionProps) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      this.handleKeyDown(event, captionProps.openMenu);
    };

    return (
      <TopBarButtonItem
        active={captionProps.opened}
        icon={this.props.icon}
        minWidth={this.props.minWidth ? this.props.minWidth : undefined}
        tabIndex={0}
        use={this.props.use}
        onClick={captionProps.toggleMenu}
        onKeyDown={handleKeyDown}
      >
        {this.props.label}
      </TopBarButtonItem>
    );
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, openMenu: PopupMenuCaptionProps['openMenu']) => {
    if (someKeys(isKeyEnter, isKeySpace, isKeyArrowVertical)(e)) {
      e.preventDefault();
      openMenu(true);
    }
  };
}
