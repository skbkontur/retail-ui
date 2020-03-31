import * as React from 'react';
import Popup from '../Popup/Popup';
import ComboBoxMenu, { ComboBoxMenuProps } from '../CustomComboBox/ComboBoxMenu';
import Menu from '../Menu/Menu';

export interface TokenInputMenuProps<T> extends ComboBoxMenuProps<T> {
  anchorElement: HTMLElement;
}

export default class TokenInputMenu<T = string> extends React.Component<TokenInputMenuProps<T>> {
  public static __KONTUR_REACT_UI__ = 'TokenInputMenu';

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
      renderAddButton,
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
          onChange={onChange}
          opened={opened}
          refMenu={this.menuRef}
          renderTotalCount={renderTotalCount}
          renderItem={renderItem}
          renderNotFound={renderNotFound}
          totalCount={totalCount}
          renderAddButton={renderAddButton}
        />
      </Popup>
    );
  }

  public getMenuRef = (): any | null => this.menu;

  private menuRef = (node: any) => (this.menu = node);
}
