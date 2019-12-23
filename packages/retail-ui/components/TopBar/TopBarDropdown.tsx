import * as React from 'react';
import { isKeyArrowVertical, isKeyEnter, isKeySpace, someKeys } from '../../lib/events/keyboard/identifiers';
import { Nullable } from '../../typings/utility-types';
import { IconProps } from '../internal/icons/20px';
import ButtonItem from './TopBarButtonItem';
import DropdownMenu from '../DropdownMenu';
import { PopupMenuCaptionProps } from '../internal/PopupMenu/PopupMenu';

export interface ButtonParams {
  disabled?: boolean;
  label: React.ReactNode;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  opened: boolean;
}

export interface TopBarDropdownProps {
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

class TopBarDropdown extends React.Component<TopBarDropdownProps> {
  public static defaultProps = {
    use: 'default',
  };

  private dropdownMenu: Nullable<DropdownMenu> = null;

  public render() {
    return (
      <DropdownMenu {...this.props} ref={this.refDropdownMenu} caption={this.renderButton}>
        {this.props.children}
      </DropdownMenu>
    );
  }

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
      <ButtonItem
        active={captionProps.opened}
        icon={this.props.icon}
        minWidth={this.props.minWidth ? this.props.minWidth : undefined}
        tabIndex={0}
        use={this.props.use}
        onClick={captionProps.toggleMenu}
        onKeyDown={handleKeyDown}
      >
        {this.props.label}
      </ButtonItem>
    );
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, openMenu: PopupMenuCaptionProps['openMenu']) => {
    if (someKeys(isKeyEnter, isKeySpace, isKeyArrowVertical)(e)) {
      e.preventDefault();
      openMenu(true);
    }
  };
}

export default TopBarDropdown;
