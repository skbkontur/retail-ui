// @flow
import * as React from 'react';
import InternalMenu from '../InternalMenu/InternalMenu';
import Popup from '../Popup';
import RenderLayer from '../RenderLayer';
import type MenuItem from '../MenuItem/MenuItem';

type Props = {
  children?: React.ChildrenArray<React.Element<Class<MenuItem>>>,
  /** Максимальная высота меню */
  menuMaxHeight?: number | string,
  /** Ширина меню */
  menuWidth?: number | string,
  /** Элемент (обязательный), раскрывающий меню */
  caption: React.Element<*>
};

type State = {
  menuVisible: boolean
};

/**
 * Меню, раскрывающееся по клику на переданный в ```caption``` элемент
 */
export default class DropdownMenu extends React.Component<Props, State> {
  state = {
    menuVisible: false
  };

  _captionWrapper: ?HTMLSpanElement;

  componentWillMount() {
    if (!this.props.caption) {
      throw new Error('Prop caption is required!');
    }
  }

  _showMenu = (): void => {
    this.setState({ menuVisible: true });
  };

  _hideMenu = (): void => {
    this.setState({ menuVisible: false });
  };

  _toggleMenu = (): void => {
    this.setState(prevState => ({ menuVisible: !prevState.menuVisible }));
  };

  _handleCaptionClick = (): void => {
    this._toggleMenu();
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'Escape':
        this._hideMenu();
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <RenderLayer
        onClickOutside={this._hideMenu}
        onFocusOutside={this._hideMenu}
      >
        <div style={{ display: 'inline-block' }}>
          <span
            onClick={this._handleCaptionClick}
            ref={element => {
              this._captionWrapper = element;
            }}
            style={{ display: 'inline-block' }}
          >
            {this.props.caption}
          </span>
          {this._captionWrapper &&
            this.props.children && (
              <Popup
                anchorElement={this._captionWrapper}
                positions={[
                  'bottom left',
                  'bottom right',
                  'top left',
                  'top right'
                ]}
                opened={this.state.menuVisible}
                margin={0}
                hasShadow
              >
                <InternalMenu
                  hasShadow={false}
                  maxHeight={this.props.menuMaxHeight || 'none'}
                  onKeyDown={this._handleKeyDown}
                  width={this.props.menuWidth || 'auto'}
                  onItemClick={this._hideMenu}
                >
                  {this.props.children}
                </InternalMenu>
              </Popup>
            )}
        </div>
      </RenderLayer>
    );
  }
}
