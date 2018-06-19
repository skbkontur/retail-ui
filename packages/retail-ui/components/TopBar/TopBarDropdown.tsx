import * as React from 'react';
import Dropdown from '../Dropdown';
import ButtonItem from './ButtonItem';
import { IconProps } from '../Icon/20px';

export interface ButtonParams {
  disabled?: boolean;
  label: React.ReactNode;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  opened: boolean;
};

export interface TopBarDropdownProps {
  children?: React.ReactNode;
  icon?: IconProps['name'];
  minWidth?: string | number | null;
  use?: 'danger' | 'pay';
  caption: React.ReactNode;
};

class TopBarDropdown extends React.Component<TopBarDropdownProps> {
  private _dropdown: Dropdown | null = null;

  public render() {
    return (
      <Dropdown
        ref={this._ref}
        _renderButton={this._renderButton}
        {...this.props}
      >
        {this.props.children}
      </Dropdown>
    );
  }

  public open() {
    if (this._dropdown) {
      this._dropdown.open();
    }
  }

  private _renderButton = (params: ButtonParams) => {
    return (
      <ButtonItem
        active={params.opened}
        icon={this.props.icon}
        minWidth={this.props.minWidth ? this.props.minWidth : undefined}
        tabIndex={0}
        use={this.props.use}
        onClick={params.onClick}
        onKeyDown={params.onKeyDown}
      >
        {params.label}
      </ButtonItem>
    );
  };
  
  private _ref = (dropdown: Dropdown) => {
    this._dropdown = dropdown;
  };
}

export default TopBarDropdown;
