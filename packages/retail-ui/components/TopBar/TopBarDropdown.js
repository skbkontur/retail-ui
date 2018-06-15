

import * as React from 'react';
import Dropdown from '../Dropdown';
import ButtonItem from './ButtonItem';

type Props = {
  children?: React.Node,
  icon?: string,
  minWidth?: string | number | null,
  use?: 'danger' | 'pay'
};

class TopBarDropdown extends React.Component<Props> {
  _dropdown: Dropdown;

  render() {
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

  _renderButton = params => {
    return (
      <ButtonItem
        active={params.opened}
        icon={this.props.icon}
        minWidth={this.props.minWidth ? this.props.minWidth : undefined}
        tabIndex="0"
        use={this.props.use}
        onClick={params.onClick}
        onKeyDown={params.onKeyDown}
      >
        {params.label}
      </ButtonItem>
    );
  };

  _ref = dropdown => {
    this._dropdown = dropdown;
  };

  open() {
    this._dropdown.open();
  }
}

export default TopBarDropdown;
