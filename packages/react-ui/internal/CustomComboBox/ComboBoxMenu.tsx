import React, { Component } from 'react';

import { locale } from '../../lib/locale/decorators';
import { isReactUINode } from '../../lib/utils';
import { Menu } from '../Menu';
import { MenuItem, MenuItemState } from '../../components/MenuItem';
import { Spinner } from '../../components/Spinner';
import { Nullable } from '../../typings/utility-types';
import { MenuSeparator } from '../../components/MenuSeparator';

import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import { ComboBoxLocale, CustomComboBoxLocaleHelper } from './locale';

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
  onValueChange: (value: T) => any;
  renderAddButton?: () => React.ReactNode;
  caption?: React.ReactNode;
  repeatRequest?: () => void;
  requestStatus?: ComboBoxRequestStatus;
}

@locale('ComboBox', CustomComboBoxLocaleHelper)
export class ComboBoxMenu<T> extends Component<ComboBoxMenuProps<T>> {
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
        <Menu ref={refMenu} data-tid="ComboBoxMenu__loading">
          <MenuItem disabled>
            <Spinner type="mini" dimmed />
          </MenuItem>
        </Menu>
      );
    }

    if (items === null && requestStatus === ComboBoxRequestStatus.Failed) {
      return (
        <Menu ref={refMenu} maxHeight={maxMenuHeight} data-tid="ComboBoxMenu__failed">
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
      const notFoundValue = renderNotFound();
      if (renderAddButton) return <Menu ref={refMenu}>{renderAddButton}</Menu>;
      if (notFoundValue)
        return (
          <Menu ref={refMenu}>
            <MenuItem data-tid="ComboBoxMenu__notFound" disabled>
              {notFoundValue}
            </MenuItem>
          </Menu>
        );
      return null;
    }

    let total = null;
    const renderedItems = items && items.map(this.renderItem);
    const countItems = renderedItems?.filter((item) => isReactUINode('MenuItem', item)).length;

    if (countItems && renderTotalCount && totalCount && countItems < totalCount) {
      total = (
        <MenuItem disabled key="total">
          <div style={{ fontSize: 12 }}>{renderTotalCount(countItems, totalCount)}</div>
        </MenuItem>
      );
    }

    return (
      <Menu data-tid="ComboBoxMenu__items" ref={refMenu} maxHeight={maxMenuHeight}>
        {renderedItems}
        {total}
        {renderAddButton && [<MenuSeparator key="separator" />, renderAddButton]}
      </Menu>
    );
  }

  private renderItem = (item: T, index: number): React.ReactNode => {
    // NOTE this is undesireable feature, better
    // to remove it from further versions
    const { renderItem, onValueChange } = this.props;
    if (typeof item === 'function' || React.isValidElement(item)) {
      // @ts-ignore
      const element = typeof item === 'function' ? item() : item;
      const props = Object.assign(
        {
          key: index,
          onClick: () => onValueChange(element.props),
        },
        element.props,
      );
      return React.cloneElement(element, props);
    }

    return (
      <MenuItem data-tid="ComboBoxMenu__item" onClick={() => onValueChange(item)} key={index}>
        {(state) => renderItem(item, state)}
      </MenuItem>
    );
  };
}
