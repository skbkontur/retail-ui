import React, { Component } from 'react';

import { isNullable } from '../../lib/utils';
import { locale } from '../../lib/locale/decorators';
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
  isMobile?: boolean;
}

@locale('ComboBox', CustomComboBoxLocaleHelper)
export class ComboBoxMenu<T> extends Component<ComboBoxMenuProps<T>> {
  public static __KONTUR_REACT_UI__ = 'ComboBoxMenu';

  public static defaultProps: Partial<ComboBoxMenuProps<any>> = {
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
      isMobile,
    } = this.props;

    const { notFound, errorNetworkButton, errorNetworkMessage } = this.locale;

    if (!opened) {
      return null;
    }

    let renderAddButton = null;
    if (this.props.renderAddButton) {
      renderAddButton = this.props.renderAddButton();
    }

    const maxHeight = isMobile ? 'auto' : maxMenuHeight;

    if (loading && (!items || !items.length)) {
      return (
        <Menu maxHeight={maxHeight} ref={refMenu} disableScrollContainer={isMobile} data-tid="ComboBoxMenu__loading">
          <MenuItem disabled isMobile={isMobile}>
            <Spinner type="mini" dimmed />
          </MenuItem>
        </Menu>
      );
    }

    if (items === null && requestStatus === ComboBoxRequestStatus.Failed) {
      return (
        <Menu ref={refMenu} maxHeight={maxHeight} disableScrollContainer={isMobile} data-tid="ComboBoxMenu__failed">
          <MenuItem disabled key="message" isMobile={isMobile}>
            <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>{errorNetworkMessage}</div>
          </MenuItem>
          <MenuItem link onClick={this.props.repeatRequest} key="retry" isMobile={isMobile}>
            {errorNetworkButton}
          </MenuItem>
        </Menu>
      );
    }

    if ((isNullable(items) || items.length === 0) && renderNotFound) {
      const notFoundValue = renderNotFound();
      if (renderAddButton) {
        return (
          <Menu maxHeight={maxHeight} ref={refMenu} disableScrollContainer={isMobile}>
            {renderAddButton}
          </Menu>
        );
      }

      if (notFoundValue) {
        return (
          <Menu maxHeight={maxHeight} ref={refMenu} disableScrollContainer={isMobile}>
            <MenuItem data-tid="ComboBoxMenu__notFound" disabled isMobile={isMobile}>
              {notFoundValue}
            </MenuItem>
          </Menu>
        );
      }

      return null;
    }

    let total = null;
    const renderedItems = items && items.map(this.renderItem);
    // @ts-ignore // todo fix checking
    const countItems = renderedItems?.filter((item) => item?.type?.__KONTUR_REACT_UI__ === 'MenuItem').length;

    if (countItems && renderTotalCount && totalCount && countItems < totalCount) {
      total = (
        <MenuItem disabled key="total" isMobile={isMobile}>
          <div style={{ fontSize: 12 }}>{renderTotalCount(countItems, totalCount)}</div>
        </MenuItem>
      );
    }

    return (
      <Menu data-tid="ComboBoxMenu__items" ref={refMenu} maxHeight={maxHeight} disableScrollContainer={isMobile}>
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
      <MenuItem
        data-tid="ComboBoxMenu__item"
        onClick={() => onValueChange(item)}
        key={index}
        isMobile={this.props.isMobile}
      >
        {(state) => renderItem(item, state)}
      </MenuItem>
    );
  };
}
