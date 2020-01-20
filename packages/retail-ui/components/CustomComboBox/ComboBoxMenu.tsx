import React, { Component } from 'react';
import { locale } from '../LocaleProvider/decorators';
import Menu from '../Menu/Menu';
import MenuItem, { MenuItemState } from '../MenuItem/MenuItem';
import Spinner from '../Spinner/Spinner';
import { Nullable } from '../../typings/utility-types';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import { CustomComboBoxLocaleHelper, ComboBoxLocale } from './locale';

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
  onChange: (value: T, event: React.SyntheticEvent) => any;
  renderAddButton?: () => React.ReactNode;
  caption?: React.ReactNode;
  repeatRequest?: () => void;
  requestStatus?: ComboBoxRequestStatus;
}

@locale('ComboBox', CustomComboBoxLocaleHelper)
class ComboBoxMenu<T> extends Component<ComboBoxMenuProps<T>> {
  public static __KONTUR_REACT_UI__ = 'ComboBoxMenu';

  public static defaultProps = {
    repeatRequest: () => undefined,
    requestStatus: ComboBoxRequestStatus.Unknown,
  };

  private readonly locale!: ComboBoxLocale;

  public render() {
    const {
      opened,
      items,
      totalCount,
      loading,
      refMenu,
      renderNotFound = () => notFound,
      renderTotalCount,
      maxMenuHeight,
      requestStatus,
    } = this.props;

    const { notFound, errorNetworkButton, errorNetworkMessage } = this.locale;

    if (!opened) {
      return null;
    }

    let renderAddButton = null;
    if (this.props.renderAddButton) {
      renderAddButton = this.props.renderAddButton();
    }

    if (loading && (!items || !items.length)) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>
            <Spinner type="mini" dimmed />
          </MenuItem>
        </Menu>
      );
    }

    if (items === null && requestStatus === ComboBoxRequestStatus.Failed) {
      return (
        <Menu ref={refMenu} maxHeight={maxMenuHeight}>
          <MenuItem disabled key="message">
            <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>{errorNetworkMessage}</div>
          </MenuItem>
          <MenuItem link onClick={this.props.repeatRequest} key="retry">
            {errorNetworkButton}
          </MenuItem>
        </Menu>
      );
    }

    if ((items == null || items.length === 0) && renderNotFound) {
      return (
        <Menu ref={refMenu}>
          {renderAddButton ? renderAddButton : <MenuItem disabled>{renderNotFound()}</MenuItem>}
        </Menu>
      );
    }

    let total = null;
    if (items && renderTotalCount && totalCount && items.length < totalCount) {
      total = (
        <MenuItem disabled key="total">
          <div style={{ fontSize: 12 }}>{renderTotalCount(items.length, totalCount)}</div>
        </MenuItem>
      );
    }

    return (
      <Menu ref={refMenu} maxHeight={maxMenuHeight}>
        {items && items.map(this.renderItem)}
        {total}
        {renderAddButton && [<MenuSeparator key="separator" />, renderAddButton]}
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
          onClick: (event: React.SyntheticEvent) => onChange(element.props, event),
        },
        element.props,
      );
      return React.cloneElement(element, props);
    }

    return (
      // tslint:disable-next-line:jsx-no-lambda
      <MenuItem onClick={event => onChange(item, event)} key={index}>
        {state => renderItem(item, state)}
      </MenuItem>
    );
  };
}

export default ComboBoxMenu;
