import * as React from 'react';
import MenuItem, { MenuItemProps } from '../MenuItem';
import RenderLayer from '../internal/RenderLayer';
import InternalMenu from '../internal/InternalMenu/InternalMenu';
import {
  ComboboxWrapper,
  ComboboxInput,
  ComboboxPopup,
  ComboboxArrow,
  ComboboxErrorMessage
} from './ComboboxView';
import Spinner from '../Spinner';
import { InputProps } from '../Input';

export interface ComboboxProps<T> {
  getItems: (query: string) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  renderValue: (value: T | null) => React.ReactText;
  renderNotFound: (quiery: string) => React.ReactNode;
  onChangeValue?: (item: T | null) => void;
  onUnexpectedInput?: (query: string) => void;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  width?: React.CSSProperties['width'];
  value?: T | null;
  fetchingOnMount?: boolean;
  warning?: boolean;
  error?: boolean;
  disabled?: boolean;
  size?: InputProps['size'];
}

export interface ComboboxState<T> {
  items: T[];
  value: T | null;
  selectedValueIndex: number | null;
  opened: boolean;
  query: string;
  loading: boolean;
  fetchingError: string | null;
}

const DEFAULT_ERROR_MESSAGE =
  'Что-то пошло не так. Проверьте соединение с интернетом и попробуйте еще раз';

export default class Combobox<T> extends React.Component<ComboboxProps<T>, ComboboxState<T>> {
  public static defaultProps = {
    renderItem: (item: any): React.ReactNode => (item ? item.label : null),
    renderValue: (value: any): React.ReactText => (value ? value.label : ''),
    renderNotFound: () => 'Не найдено',
    items: [],
    fetchingOnMount: false
  };

  public state: ComboboxState<T> = {
    items: [],
    value: this.props.value || null,
    opened: false,
    query: this.props.renderValue(this.props.value || null).toString() || '',
    loading: false,
    selectedValueIndex: null,
    fetchingError: null
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
            rightIcon={this.renderArrow()}
            warning={this.props.warning}
            error={this.props.error}
            disabled={this.props.disabled}
            size={this.props.size}
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
                highlightedIndex={this.state.items.length === 1 ? 0 : selectedValueIndex}
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
    if (this.props.fetchingOnMount) {
      this.getItems();
    }
  }

  public componentWillReceiveProps(nextProps: ComboboxProps<T>, nextState: ComboboxState<T>) {
    const nextValue = nextProps.value;

    if (this.props.value !== nextValue && nextValue !== undefined) {
      this.setValue(nextValue);
    }

    if (
      nextState.value !== this.state.value ||
      nextState.items.length !== this.state.items.length
    ) {
      this.setState({
        selectedValueIndex: this.getSelectedIndex(nextState.items, nextState.value)
      });
    }
  }

  public componentWillUnmount() {
    if (this.stopFetching) {
      this.stopFetching();
    }
  }

  public openMenu = () => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ opened: true }, this.handleOpen);
  };

  public closeMenu = () => {
    this.setState({ opened: false }, this.handleClose);
  };

  public focus = () => {
    if (this.input && !this.props.disabled) {
      this.input.focus();
    }
  };

  public blur = () => {
    if (this.input) {
      this.input.blur();
    }
  };

  private setValue = (value: T | null) => {
    this.setState(
      {
        value
      },
      () => {
        if (this.props.onChangeValue) {
          this.props.onChangeValue(this.state.value);
        }
      }
    );

    this.setQuery(this.props.renderValue(value).toString() || '');
  };

  private setQuery = (value: string) => {
    this.setState({
      query: value
    });
  };

  private handleInputFocus = () => {
    this.openMenu();
  };

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onInputChange) {
      event.persist();
    }

    const value = event.target.value;

    this.setQuery(value);
    this.getItems();

    if (this.props.onInputChange) {
      this.props.onInputChange(event);
    }
  };

  private handleInputKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!this.state.opened) {
      this.openMenu();
    }

    if (this.menu) {
      this.menu.passKeyDown(event);
    }
  };

  private handleOpen = () => {
    this.setSelection();
    this.getItems(true);
  };

  private handleClose = () => {
    if (this.input) {
      this.input.blur();
    }

    if (this.props.onUnexpectedInput && !this.state.value) {
      this.props.onUnexpectedInput(this.state.query);
    }

    if (!this.state.query) {
      this.setValue(null);
    }
  };

  private getPopupWidth = () => {
    if (this.input) {
      return `${this.input.getBoundingClientRect().width}px`;
    }
  };

  private renderItems = () => {
    if (this.state.items.length) {
      return this.state.items.map((item, index) => {
        const selectHandler = () => this.handleSelectMenuItem(item);

        if (!item) {
          return null;
        }

        if (React.isValidElement(item)) {
          if (item.type === MenuItem) {
            const getClickHandler = (element: React.ReactElement<MenuItemProps>) => (
              event: React.SyntheticEvent<HTMLElement>
            ) => {
              if (element.props.onClick) {
                element.props.onClick(event);
              }

              if (!event.defaultPrevented) {
                selectHandler();
              }
            };

            return React.cloneElement(
              item as React.ReactElement<MenuItemProps>,
              {
                onClick: getClickHandler(item)
              },
              [(item as React.ReactElement<MenuItemProps>).props.children]
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

    if (this.state.fetchingError) {
      const refresh = (event: React.SyntheticEvent<HTMLElement>) => {
        event.preventDefault();

        this.getItems();
      };

      return [
        <MenuItem.Static key="message">
          <ComboboxErrorMessage>{this.state.fetchingError}</ComboboxErrorMessage>
        </MenuItem.Static>,
        <MenuItem key="reload" onClick={refresh}>
          Обновить
        </MenuItem>
      ];
    }

    if (this.state.loading) {
      return (
        <MenuItem.Header>
          <Spinner /> Загрузка...
        </MenuItem.Header>
      );
    }

    return <MenuItem.Header>{this.props.renderNotFound(this.state.query || '')}</MenuItem.Header>;
  };

  private renderValue = (): React.ReactText => {
    return this.state.query === null ? this.props.renderValue(this.state.value) : this.state.query;
  };

  private renderArrow = () => {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <ComboboxArrow />;
  };

  private getItems = (firstLoading?: boolean) => {
    if (this.props.disabled) {
      return;
    }

    this.setState(
      {
        loading: true
      },
      () => {
        this.fetchItems(firstLoading ? '' : this.state.query || '')
          .then(result => {
            if (Array.isArray(result)) {
              this.setState(state => ({
                items: result,
                loading: false,
                selectedValueIndex: this.getSelectedIndex(result, state.value),
                fetchingError: null
              }));
            }
          })
          .catch(reason => {
            if (reason === 'ABORT_FETCHING') {
              return;
            }

            this.setState({
              items: [],
              loading: false,
              fetchingError: reason || DEFAULT_ERROR_MESSAGE,
              selectedValueIndex: 1
            });
          });
      }
    );
  };

  private handleSelectMenuItem = (value: T) => {
    this.setValue(value);
    this.closeMenu();
  };

  private getSelectedIndex = (items: T[], value: T | null) => {
    if (!value) {
      return null;
    }

    return items.findIndex(item => item === value);
  };

  private fetchItems = (query = '') => {
    if (this.stopFetching) {
      this.stopFetching('ABORT_FETCHING');
    }

    return Promise.race([
      new Promise((_resolve, reject) => {
        this.stopFetching = reject;
      }),
      this.props.getItems(query).then(result => {
        this.stopFetching = null;
        return result;
      })
    ]);
  };

  private setSelection = () => {
    if (this.input) {
      this.input.setSelectionRange(0, this.input.value.length);
    }
  };

  private refMenu = (element: InternalMenu) => {
    this.menu = element;
  };

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
  };
}
