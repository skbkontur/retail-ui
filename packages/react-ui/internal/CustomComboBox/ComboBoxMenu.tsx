import React from 'react';

import { isFunction, isNullable } from '../../lib/utils';
import { locale } from '../../lib/locale/decorators';
import { Menu } from '../Menu';
import type { MenuItemState } from '../../components/MenuItem';
import { isMenuItem, MenuItem } from '../../components/MenuItem';
import { Spinner } from '../../components/Spinner';
import type { Nullable } from '../../typings/utility-types';
import { MenuSeparator } from '../../components/MenuSeparator';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { MenuMessage } from '../MenuMessage';
import type { ComboBoxExtendedItem } from '../../components/ComboBox';
import type { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { MenuFooter } from '../../components/MenuFooter';
import type { SizeProp } from '../../lib/types/props';

import { ComboBoxRequestStatus } from './CustomComboBoxTypes';
import type { ComboBoxLocale } from './locale';
import { CustomComboBoxLocaleHelper } from './locale';

export interface ComboBoxMenuProps<T> {
  opened?: boolean;
  items?: Nullable<Array<ComboBoxExtendedItem<T>>>;
  totalCount?: number;
  loading?: boolean;
  hasMargin?: boolean;
  maxMenuHeight?: number | string;
  refMenu?: (menu: Nullable<Menu>) => void;
  renderNotFound?: () => React.ReactNode;
  renderTotalCount?: (found: number, total: number) => React.ReactNode;
  renderItem: (item: T, state: MenuItemState) => React.ReactNode;
  itemWrapper?: (item: T) => React.ComponentType;
  onValueChange: (value: T) => any;
  renderAddButton?: () => React.ReactNode;
  caption?: React.ReactNode;
  repeatRequest?: () => void;
  requestStatus?: ComboBoxRequestStatus;
  isMobile?: boolean;
  menuId?: string;
  size?: SizeProp;
}

export const ComboBoxMenuDataTids = {
  loading: 'ComboBoxMenu__loading',
  failed: 'ComboBoxMenu__failed',
  notFound: 'ComboBoxMenu__notFound',
  items: 'ComboBoxMenu__items',
  item: 'ComboBoxMenu__item',
} as const;

type DefaultProps<T> = Required<Pick<ComboBoxMenuProps<T>, 'repeatRequest' | 'requestStatus'>>;

@locale('ComboBox', CustomComboBoxLocaleHelper)
export class ComboBoxMenu<T> extends React.Component<ComboBoxMenuProps<T>> {
  public static __KONTUR_REACT_UI__ = 'ComboBoxMenu';
  public static displayName = 'ComboBoxMenu';

  public static defaultProps: DefaultProps<unknown> = {
    repeatRequest: () => undefined,
    requestStatus: ComboBoxRequestStatus.Unknown,
  };

  private getProps = createPropsGetter(ComboBoxMenu.defaultProps);

  private readonly locale!: ComboBoxLocale;

  private theme!: Theme;
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain() {
    const {
      opened,
      items,
      totalCount,
      loading,
      refMenu,
      renderNotFound = () => notFound,
      renderTotalCount,
      maxMenuHeight,
      isMobile,
    } = this.props;

    const requestStatus = this.getProps().requestStatus;

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
        <Menu
          maxHeight={maxHeight}
          ref={refMenu}
          hasMargin={this.props.hasMargin}
          disableScrollContainer={isMobile}
          id={this.props.menuId}
          data-tid={ComboBoxMenuDataTids.loading}
        >
          <MenuMessage size={this.props.size} as="div">
            <Spinner type="mini" dimmed />
          </MenuMessage>
        </Menu>
      );
    }

    if (items === null && requestStatus === ComboBoxRequestStatus.Failed) {
      return (
        <Menu
          ref={refMenu}
          maxHeight={maxHeight}
          hasMargin={this.props.hasMargin}
          disableScrollContainer={isMobile}
          id={this.props.menuId}
          data-tid={ComboBoxMenuDataTids.failed}
        >
          <MenuMessage size={this.props.size} key="message">
            <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>{errorNetworkMessage}</div>
          </MenuMessage>
          <MenuItem link onClick={this.getProps().repeatRequest} size={this.props.size} key="retry" isMobile={isMobile}>
            {errorNetworkButton}
          </MenuItem>
        </Menu>
      );
    }

    if ((isNullable(items) || items.length === 0) && renderNotFound) {
      const notFoundValue = renderNotFound();
      if (renderAddButton) {
        return (
          <Menu
            id={this.props.menuId}
            hasMargin={this.props.hasMargin}
            maxHeight={maxHeight}
            ref={refMenu}
            disableScrollContainer={isMobile}
          >
            {renderAddButton}
          </Menu>
        );
      }

      if (notFoundValue) {
        return (
          <Menu
            id={this.props.menuId}
            hasMargin={this.props.hasMargin}
            maxHeight={maxHeight}
            ref={refMenu}
            disableScrollContainer={isMobile}
          >
            <MenuMessage size={this.props.size} data-tid={ComboBoxMenuDataTids.notFound}>
              {notFoundValue}
            </MenuMessage>
          </Menu>
        );
      }

      return null;
    }

    let total = null;
    const renderedItems = items && items.map(this.renderItem);
    const menuItems = renderedItems?.filter((item) => {
      return isMenuItem(item);
    });
    const countItems = menuItems?.length;
    if (countItems && renderTotalCount && totalCount && countItems < totalCount) {
      total = (
        <MenuFooter size={this.props.size} key="total">
          <div>{renderTotalCount(countItems, totalCount)}</div>
        </MenuFooter>
      );
    }

    return (
      <Menu
        id={this.props.menuId}
        data-tid={ComboBoxMenuDataTids.items}
        ref={refMenu}
        maxHeight={maxHeight}
        hasMargin={this.props.hasMargin}
        disableScrollContainer={isMobile}
      >
        {renderedItems}
        {total}
        {renderAddButton && [<MenuSeparator key="separator" />, renderAddButton]}
      </Menu>
    );
  }

  private renderItem = (item: ComboBoxExtendedItem<T>, index: number): React.ReactNode => {
    // NOTE this is undesireable feature, better
    // to remove it from further versions
    const { renderItem, onValueChange, itemWrapper } = this.props;

    if (!isSimpleItem<T>(item)) {
      const element = isFunction(item) ? item() : item;
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
        component={itemWrapper?.(item)}
        data-tid={ComboBoxMenuDataTids.item}
        onClick={() => onValueChange(item)}
        key={index}
        size={this.props.size}
        isMobile={this.props.isMobile}
      >
        {(state) => renderItem(item, state)}
      </MenuItem>
    );
  };
}

function isSimpleItem<T>(item: ComboBoxExtendedItem<T>): item is T {
  return !isFunction(item) && !React.isValidElement(item);
}
