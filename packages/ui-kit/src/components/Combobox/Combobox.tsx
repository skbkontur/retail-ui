import * as React from 'react';
import MenuItem, { MenuItemProps } from '../MenuItem';
import RenderLayer from '../internal/RenderLayer';
import InternalMenu from '../internal/InternalMenu/InternalMenu';
import { ComboboxWrapper, ComboboxInput, ComboboxPopup } from './ComboboxView';

export interface ComboboxProps<T> {
  getItems: (query: string) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  renderValue: (value: T | null) => React.ReactText;
  renderNotFound: () => React.ReactNode;
  width?: React.CSSProperties['width'];
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: T | null;
  onChangeValue?: (item: T | null) => void;
}

export interface ComboboxState<T> {
  items: T[];
  value: T | null;
  selectedValueIndex: number | null;
  opened: boolean;
  search: string;
  loading: boolean;
}

export default class Combobox<T> extends React.Component<ComboboxProps<T>, ComboboxState<T>> {
  public static defaultProps = {
    renderItem: (item: any): React.ReactNode => item.label,
    renderValue: (value: any): React.ReactText => value.label,
    renderNotFound: () => 'Не найдено',
    items: []
  };

  public state: ComboboxState<T> = {
    items: [],
    value: this.props.value || null,
    opened: false,
    search: '',
    loading: false,
    selectedValueIndex: null
  };

  private menu: InternalMenu | null = null;
  private input: HTMLInputElement | null = null;
  private stopFetching: ((reason?: any) => void) | null = null;

  public render() {
    const selectedValueIndex =
      typeof this.state.selectedValueIndex === 'number' ? this.state.selectedValueIndex : undefined;
    return (
      <RenderLayer
        onClickOutside={this.closeMenu}
        onFocusOutside={this.closeMenu}
        active={this.state.opened}
      >
        <ComboboxWrapper width={this.props.width}>
          <ComboboxInput
            inputRef={this.inputRef}
            onFocus={this.handleInputFocus}
            onKeyDown={this.handleInputKeyDown}
            onChange={this.handleInputChange}
            value={this.renderValue()}
          />
          {this.input && (
            <ComboboxPopup
              opened={this.state.opened}
              anchorElement={this.input}
              positions={['bottom left', 'bottom right', 'top left', 'top right']}
              hasShadow
              margin={2}
              width={this.props.width || this.getPopupWidth()}
            >
              <InternalMenu
                ref={this.refMenu}
                selectedItemIndex={selectedValueIndex}
                initialSelectedItemIndex={selectedValueIndex}
              >
                {this.renderItems()}
              </InternalMenu>
            </ComboboxPopup>
          )}
        </ComboboxWrapper>
      </RenderLayer>
    );
  }

  public componentDidMount() {
    this.getItems();
  }

  public componentDidUpdate(prevProps: ComboboxProps<T>, prevState: ComboboxState<T>) {
    if (prevState.search !== this.state.search) {
      this.getItems();

      if (!this.state.search) {
        this.setState({ value: null });
      }
    }

    if (
      prevState.value !== this.state.value ||
      prevState.items.length !== this.state.items.length
    ) {
      this.setState({
        selectedValueIndex: this.getSelectedIndex(this.state.items, this.state.value)
      });
    }
  }

  public openMenu = () => {
    this.setState({
      opened: true
    });
  };

  public closeMenu = () => {
    this.setState(
      {
        opened: false
      },
      () => {
        if (this.input) {
          this.input.blur();
        }
      }
    );
  };

  private refMenu = (element: InternalMenu) => {
    this.menu = element;
  };

  private handleInputFocus = () => {
    this.openMenu();
  };

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onInputChange) {
      event.persist();
    }

    const value = event.target.value;

    this.setState(
      {
        search: value,
        value: null
      },
      () => {
        if (this.props.onInputChange) {
          this.props.onInputChange(event);
        }
      }
    );
  };

  private getPopupWidth = () => {
    if (this.input) {
      return `${this.input.getBoundingClientRect().width}px`;
    }
  };

  private handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.openMenu();

    if (this.menu) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.menu.moveUp();
          break;

        case 'ArrowDown':
          event.preventDefault();
          this.menu.moveDown();
          break;

        case 'Enter':
          event.preventDefault();
          this.menu.selectActiveItem(event);
          break;

        default:
          break;
      }
    }
  };

  private renderItems = () => {
    if (this.state.items.length) {
      return this.state.items.map((item, index) => {
        const selectHandler = () => this.handleSelectMenuItem(item);

        if (React.isValidElement(item)) {
          if (item.type === MenuItem) {
            const getClickHandler = (element: React.ReactElement<MenuItemProps>) => (
              event: React.SyntheticEvent<HTMLElement>
            ) => {
              if (element.props.onClick) {
                element.props.onClick(event);
              }
              selectHandler();
            };

            return React.cloneElement(
              item as React.ReactElement<MenuItemProps>,
              {
                onClick: getClickHandler(item)
              },
              ['cloned', (item as React.ReactElement<MenuItemProps>).props.children]
            );
          }

          if (
            item.type === MenuItem.Static ||
            item.type === MenuItem.Header ||
            item.type === MenuItem.Separator
          ) {
            return React.cloneElement(item, { key: index });
          }
        }

        return (
          <MenuItem onClick={selectHandler} key={index}>
            {this.props.renderItem(item)}
          </MenuItem>
        );
      });
    }

    return <MenuItem.Header>{this.props.renderNotFound()}</MenuItem.Header>;
  };

  private renderValue = (): React.ReactText => {
    return this.state.search || this.state.value ? this.props.renderValue(this.state.value) : '';
  };

  private getItems = () => {
    this.setState(
      {
        loading: true
      },
      () => {
        this.fetchItems().then(result => {
          if (Array.isArray(result)) {
            this.setState(state => ({
              items: result,
              loading: false,
              selectedValueIndex: this.getSelectedIndex(result, state.value)
            }));
          }
        });
      }
    );
  };

  private handleSelectMenuItem = (value: T) => {
    this.setState(
      {
        value,
        search: ''
      },
      () => {
        this.closeMenu();

        if (this.props.onChangeValue) {
          this.props.onChangeValue(this.state.value);
        }
      }
    );
  };

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
  };

  private getSelectedIndex = (items: T[], value: T | null) => {
    if (!value) {
      return null;
    }

    return items.findIndex(item => item === value);
  };

  private fetchItems = () => {
    if (this.stopFetching) {
      this.stopFetching();
    }

    return Promise.race([
      new Promise((_resolve, reject) => {
        this.stopFetching = reject;
      }),
      this.props.getItems(this.state.search)
    ]);
  };
}
