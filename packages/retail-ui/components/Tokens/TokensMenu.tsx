import * as React from 'react';
import { RefObject } from 'react';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import Spinner from '../Spinner';
import Popup from '../Popup/Popup';
import cn from 'classnames';
import styles from './Tokens.less';

export interface TokensMenuProps<T> {
  anchorElement: HTMLElement;
  onAddItem: (item: T) => void;
  inputValue: string;
  autocompleteItems?: T[];
  renderNotFound?: () => React.ReactNode;
  renderItem?: (item: T) => React.ReactNode;
  showAddItemHint?: boolean;
}

export class TokensMenu<T> extends React.Component<TokensMenuProps<T>> {
  private menuRef = React.createRef<Menu>();

  render() {
    return (
      <Popup
        opened={true}
        positions={['bottom left']}
        anchorElement={this.props.anchorElement}
        popupOffset={8}
      >
        {this.renderMenu()}
      </Popup>
    );
  }

  public getMenuRef = (): RefObject<Menu> => {
    return this.menuRef;
  };

  renderMenu() {
    const {
      autocompleteItems,
      renderNotFound,
      renderItem,
      showAddItemHint
    } = this.props;

    const handleAddItemNoteClick = () =>
      this.props.onAddItem(this.props.inputValue as any);

    const addItemNote = (
      <MenuItem onClick={handleAddItemNoteClick}>
        {(state: 'hover') => (
          <>
            <div>Добавить {this.props.inputValue}</div>
            <div
              className={cn(styles.subheader, {
                [styles.subheaderHovered]: state === 'hover'
              })}
            >
              Нажмите Enter или запятую
            </div>
          </>
        )}
      </MenuItem>
    );
    const addItemNoteWithSeparator = showAddItemHint
      ? [<MenuSeparator key="separator" />, addItemNote]
      : undefined;

    if (autocompleteItems === undefined) {
      return (
        <Menu ref={this.menuRef}>
          <MenuItem disabled>
            <span style={{ margin: '-2px 0 -1px' }}>
              <Spinner type="mini" dimmed />
            </span>
          </MenuItem>
          {addItemNoteWithSeparator}
        </Menu>
      );
    }

    if (autocompleteItems.length === 0) {
      return (
        <Menu ref={this.menuRef}>
          {showAddItemHint ? (
            addItemNote
          ) : (
            <MenuItem disabled>
              {renderNotFound ? renderNotFound() : 'Не найдено'}
            </MenuItem>
          )}
        </Menu>
      );
    }
    return (
      <Menu ref={this.menuRef}>
        {autocompleteItems.map(item => {
          const handleClick = () => this.props.onAddItem(item);
          return (
            <MenuItem key={undefined} onClick={handleClick}>
              {renderItem ? renderItem(item) : item}
            </MenuItem>
          );
        })}
        {addItemNoteWithSeparator}
      </Menu>
    );
  }
}
