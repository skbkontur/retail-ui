import * as React from 'react';
import MenuItem from '../MenuItem';
import RenderLayer from '../internal/RenderLayer';
import InternalMenu from '../internal/InternalMenu/InternalMenu';
import { ComboboxWrapper, ComboboxInput, ComboboxPopup } from './ComboboxView';

export interface ComboboxProps<T> {
  items: T[] | Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  width?: React.CSSProperties['width'];
}

export interface ComboboxState<T> {
  items: T[];
  opened: boolean;
}

export default class Combobox<T> extends React.Component<ComboboxProps<T>, ComboboxState<T>> {
  public static defaultProps = {
    renderItem: (item: any): React.ReactNode => item,
    items: []
  };

  public state: ComboboxState<T> = {
    items: [],
    opened: false
  };

  private menu: InternalMenu | null = null;
  private input: HTMLInputElement | null = null;

  public render() {
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
              <InternalMenu ref={this.refMenu} initialSelectedItemIndex={0}>
                {this.renderItems()}
              </InternalMenu>
            </ComboboxPopup>
          )}
        </ComboboxWrapper>
      </RenderLayer>
    );
  }

  public componentDidMount() {
    this.getItems(this.props);
  }

  public componentWillReceiveProps(nextProps: ComboboxProps<T>) {
    this.getItems(nextProps);
  }

  public openMenu = () => {
    this.setState({
      opened: true
    });
  };

  public closeMenu = () => {
    this.setState({
      opened: false
    });
  };

  private refMenu = (element: InternalMenu) => {
    this.menu = element;
  };

  private handleInputFocus = () => {
    this.openMenu();
  };

  private getPopupWidth = () => {
    if (this.input) {
      return `${this.input.getBoundingClientRect().width}px`;
    }
  };

  private handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      return this.state.items.map((item, index) => (
        <MenuItem key={index}>{this.props.renderItem(item)}</MenuItem>
      ));
    }

    return <MenuItem>"Nope"</MenuItem>;
  };

  private getItems = (props: ComboboxProps<T>) => {
    if (Array.isArray(props.items)) {
      this.setState({ items: props.items });
    } else {
      props.items.then(result => {
        this.setState({
          items: result
        });
      });
    }
  };

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
  };
}
