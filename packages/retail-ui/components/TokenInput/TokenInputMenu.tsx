import * as React from 'react';
import { locale } from '../LocaleProvider/decorators';
import Popup from '../Popup/Popup';
import ComboBoxMenu, { ComboBoxMenuProps } from '../CustomComboBox/ComboBoxMenu';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import { TokenInputLocaleHelper, TokenInputLocale } from './locale';

export interface TokenInputMenuProps<T> extends ComboBoxMenuProps<T> {
  anchorElement: HTMLElement;
  inputValue: string;
  showAddItemHint?: boolean;
  onAddItem: (item: string) => void;
}

@locale('TokenInput', TokenInputLocaleHelper)
export default class TokenInputMenu<T = string> extends React.Component<TokenInputMenuProps<T>> {
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
      onChange,
    } = this.props;

    return (
      <Popup
        opened={opened!}
        positions={['bottom left']}
        anchorElement={this.props.anchorElement}
        margin={8}
        popupOffset={8}
      >
        <ComboBoxMenu
          items={items}
          loading={loading}
          maxMenuHeight={maxMenuHeight}
          onChange={onChange}
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

    if (this.props.renderAddButton !== undefined) {
      return this.props.renderAddButton();
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
