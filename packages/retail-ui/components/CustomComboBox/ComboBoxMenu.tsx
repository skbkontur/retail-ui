import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import MenuItem, { MenuItemState } from '../MenuItem/MenuItem';
import Spinner from '../Spinner/Spinner';
import { Nullable } from '../../typings/utility-types';

export interface ComboBoxMenuProps<T> {
  opened?: boolean;
  items?: Nullable<T[]>;
  totalCount?: number;
  loading?: boolean;
  maxMenuHeight?: number | string;
  refMenu?: (menu: Nullable<Menu>) => void;
  renderNotFound?: () => React.ReactNode;
  renderTotalCount?: (found: number, total: number) => React.ReactNode;
  renderItem: (item: T, state: MenuItemState) => React.ReactNode;
  onChange: (value: T) => any;
  renderAddButton?: () => React.ReactNode;
}

class ComboBoxMenu<T> extends Component<ComboBoxMenuProps<T>> {
  public render() {
    const {
      opened,
      items,
      totalCount,
      loading,
      refMenu,
      renderNotFound,
      renderTotalCount,
      maxMenuHeight
    } = this.props;

    if (!opened) {
      return null;
    }

    let renderAddButton = null;
    if(this.props.renderAddButton){
      renderAddButton = this.props.renderAddButton()
    }

    if (loading && (!items || !items.length)) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>
            <div style={{ margin: '-2px 0 -1px' }}>
              <Spinner type="mini" dimmed />
            </div>
          </MenuItem>
        </Menu>
      );
    }

    if ((items == null || items.length === 0) && renderNotFound) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>{renderNotFound()}</MenuItem>
          {renderAddButton}
        </Menu>
      );
    }

    let total = null;
    if (items && renderTotalCount && totalCount && items.length < totalCount) {
      total = (
        <MenuItem disabled>
          <div style={{ fontSize: 12 }}>
            {renderTotalCount(items.length, totalCount)}
          </div>
        </MenuItem>
      );
    }

    return (
      <Menu ref={refMenu} maxHeight={maxMenuHeight}>
        {items && items.map(this.renderItem)}
        {total}
        {renderAddButton}
      </Menu>
    );
  }

  private renderItem = (item: T, index: number): React.ReactNode => {
    // NOTE this is undesireable feature, better
    // to remove it from further versions
    const { renderItem, onChange } = this.props;
    if (typeof item === 'function' || React.isValidElement(item)) {
      // @ts-ignore
      const element = typeof item === 'function' ? item() : item;
      const props = Object.assign(
        {
          key: index,
          onClick: () => onChange(element.props)
        },
        element.props
      );
      return React.cloneElement(element, props);
    }

    return (
      // tslint:disable-next-line:jsx-no-lambda
      <MenuItem onClick={() => onChange(item)} key={index}>
        {state => renderItem(item, state)}
      </MenuItem>
    );
  };
}

export default ComboBoxMenu;
