/* @flow */
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import Popup from '../Popup';
import ReactDOM from 'react-dom';
import RenderLayer from '../RenderLayer';
import CROSS from '../internal/cross';

import boxStyles from './Box.less';

const supportsPortal = 'createPortal' in ReactDOM;

type Pos =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom'
  | 'right top'
  | 'right middle'
  | 'right bottom';

const Positions = [
  'top left',
  'top center',
  'top right',
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left middle',
  'left bottom',
  'right top',
  'right middle',
  'right bottom'
];

type Props = {
  children?: React.Element<any> | string,

  className?: string,

  closeButton?: boolean,

  render: () => ?React.Node,

  pos: Pos,

  trigger: 'hover' | 'click' | 'focus' | 'opened' | 'closed',

  onCloseClick?: (SyntheticMouseEvent<HTMLElement>) => void,

  onCloseRequest?: () => void,

  allowedPositions: Pos[]
};

type State = {
  opened: boolean
};

class Tooltip extends React.Component<Props, State> {
  _hoverTimeout: ?TimeoutID = null;

  _wrapperElement: ?HTMLElement = null;

  static defaultProps = {
    pos: 'top left',
    trigger: 'hover',
    allowedPositions: Positions
  };

  state = {
    opened: false
  };

  componentDidMount() {
    /**
     * _wrapperElement is absent on initial mount
     * Rendering again to show popup
     */
    if (this.props.trigger === 'opened') {
      this.forceUpdate();
    }
  }

  render() {
    const { wrapperProps, popupProps, layerProps } = this._getProps();

    return (
      <RenderLayer {...layerProps}>
        <span ref={this._refWrapper} {...wrapperProps}>
          {this.props.children}
          {this._wrapperElement && (
            <Popup
              anchorElement={this._wrapperElement}
              backgroundColor={'white'}
              hasPin
              hasShadow
              margin={18}
              opened={this.state.opened}
              pinOffset={9}
              pinSize={9}
              popupOffset={0}
              positions={this._getPositions()}
              {...popupProps}
            >
              {this._renderContent}
            </Popup>
          )}
        </span>
      </RenderLayer>
    );
  }

  _renderContent = () => {
    return (
      <div style={{ padding: '15px 20px', position: 'relative' }}>
        {this.props.render()}
        {this._renderCross()}
      </div>
    );
  };

  _renderCross() {
    const hasCross =
      this.props.closeButton === undefined
        ? this.props.trigger !== 'hover' && this.props.trigger !== 'focus'
        : this.props.closeButton;

    if (!hasCross) {
      return null;
    }

    return (
      <span className={boxStyles.cross} onClick={this._handleCrossClick}>
        {CROSS}
      </span>
    );
  }

  _refWrapper = node => {
    this._wrapperElement = node;
  };

  _getPositions() {
    const { allowedPositions } = this.props;
    const index = allowedPositions.indexOf(this.props.pos);
    if (index === -1) {
      throw new Error(
        'Unexpected position passed to Tooltip. Expected one of: ' +
          allowedPositions.join(', ')
      );
    }
    return [
      ...allowedPositions.slice(index),
      ...allowedPositions.slice(0, index)
    ];
  }

  _getProps() {
    switch (this.props.trigger) {
      case 'opened':
        return {
          layerProps: {
            active: true,
            onClickOutside: this._handleClickOutside
          },
          wrapperProps: {},
          popupProps: {
            opened: true
          }
        };

      case 'closed':
        return {
          layerProps: {},
          wrapperProps: {},
          popupProps: {
            opened: false
          }
        };

      case 'hover':
        return {
          layerProps: {},
          wrapperProps: {
            onMouseEnter: this._handleMouseEnter,
            onMouseLeave: this._handleMouseLeave
          },
          popupProps: supportsPortal
            ? {}
            : {
                onMouseEnter: this._handleMouseEnter,
                onMouseLeave: this._handleMouseLeave
              }
        };

      case 'click':
        return {
          layerProps: {
            active: this.state.opened,
            onClickOutside: this._handleClickOutside
          },
          wrapperProps: {
            onClick: this._handleClick
          },
          popupProps: {}
        };

      case 'focus':
        return {
          layerProps: {},
          wrapperProps: {
            onFocus: this._handleFocus,
            onBlur: this._handleBlur
          },
          popupProps: {}
        };

      default:
        throw new Error('Unknown trigger specified');
    }
  }

  _open() {
    this.setState({ opened: true });
  }

  _close() {
    this.setState({ opened: false });
  }

  _handleMouseEnter = () => {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }
    this._open();
  };

  _handleMouseLeave = () => {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
    this._hoverTimeout = setTimeout(() => {
      this._close();
    }, 300);
  };

  _handleClick = () => {
    this._open();
  };

  _handleClickOutside = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
    this._close();
  };

  _handleFocus = () => {
    this._open();
  };

  _handleBlur = () => {
    this._close();
  };

  _handleCrossClick = event => {
    event.stopPropagation();

    if (this.props.onCloseClick) {
      this.props.onCloseClick(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }

    this._close();
  };
}

export default Tooltip;
