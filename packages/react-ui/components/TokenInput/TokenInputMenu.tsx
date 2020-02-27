import React from 'react';

import { locale } from '../../lib/locale/decorators';
import { Popup } from '../Popup';
import { ComboBoxMenu, ComboBoxMenuProps } from '../CustomComboBox/ComboBoxMenu';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

import { TokenInputLocale, TokenInputLocaleHelper } from './locale';

export interface TokenInputMenuProps<T> extends ComboBoxMenuProps<T> {
  anchorElement: HTMLElement;
  inputValue: string;
  showAddItemHint?: boolean;
  onAddItem: (item: string) => void;
}

@locale('TokenInput', TokenInputLocaleHelper)
export class TokenInputMenu<T = string> extends React.Component<TokenInputMenuProps<T>> {
  public static __KONTUR_REACT_UI__ = 'TokenInputMenu';

  private readonly locale!: TokenInputLocale;

  private menu: Menu | null = null;

  public render() {
    const {
      loading,
      maxMenuHeight,
      renderTotalCount,
      totalCount,
      opened,
      items,
      renderNotFound,
      renderItem,
      onValueChange,
    } = this.props;

    return (
      <Popup
        opened={opened!}
        positions={['bottom left']}
        anchorElement={this.props.anchorElement}
        margin={6}
        popupOffset={5}
      >
        <ComboBoxMenu
          items={items}
          loading={loading}
          maxMenuHeight={maxMenuHeight}
          onValueChange={onValueChange}
          opened={opened}
          refMenu={this.menuRef}
          renderTotalCount={renderTotalCount}
          renderItem={renderItem}
          renderNotFound={renderNotFound}
          totalCount={totalCount}
          renderAddButton={this.renderAddButton}
        />
      </Popup>
    );
  }

  public getMenuRef = (): any | null => this.menu;
  private menuRef = (node: any) => (this.menu = node);

  private renderAddButton = (value = this.props.inputValue): React.ReactNode | undefined => {
    if (!this.props.showAddItemHint) {
      return;
    }

    const { addButtonComment, addButtonTitle } = this.locale;

    const handleAddItemNoteClick = () => this.props.onAddItem(value);

    return (
      <MenuItem onClick={handleAddItemNoteClick} comment={addButtonComment} key="renderAddButton">
        {addButtonTitle} {value}
      </MenuItem>
    );
  };
}
