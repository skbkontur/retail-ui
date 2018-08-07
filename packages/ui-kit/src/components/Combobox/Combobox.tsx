import * as React from 'react';
import PopupMenu from '../internal/PopupMenu';
import Input from '../Input';
import MenuItem from '../MenuItem';

export interface ComboboxProps<T> {
  items: T[] | Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
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

  // private menu: PopupMenu | null = null;
  // private input: Input | null = null;

  public render() {
    return (
      <PopupMenu
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
        renderCaption={this.renderInput}
        popupHasPin={false}
        popupMargin={0}
      >
        {this.renderItems()}
      </PopupMenu>
    );
  }

  public componentDidMount() {
    this.getItems(this.props);
  }

  public componentWillReceiveProps(nextProps: ComboboxProps<T>) {
    this.getItems(nextProps);
  }

  private renderInput = (showMenu: () => void) => {
    return <Input onFocus={showMenu} />;
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

  // private handleChangeMenuState = (visibleMenu: boolean) => {
  //   if (visibleMenu && this.input) {
  //     setTimeout(this.input.focus, 1500);
  //   }
  // };

  // private menuRef = (element: PopupMenu) => {
  //   this.menu = element;
  // };

  // private inputRef = (element: Input) => {
  //   this.input = element;
  // };
}
