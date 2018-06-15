import classNames from 'classnames';
import * as React from 'react';

import RenderLayer from '../RenderLayer';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import LayoutEvents from '../../lib/LayoutEvents';

import PropTypes from 'prop-types';

import styles = require('./DateSelect.less');

import Icon from '../Icon/Icon';
import { createPropsGetter } from '../internal/createPropsGetter';

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

const HEIGHT = 24;

interface Props {
  disabled?: boolean;
  maxYear?: number;
  minYear?: number;
  onChange: (value: number) => void;
  type?: 'month' | 'year';
  value: number;
  width?: number | string;
}

interface State {
  botCapped: boolean;
  current: Nullable<number>;
  height: number;
  opened: boolean;
  pos: number;
  top: number;
  topCapped: boolean;
  nodeTop: number;
}

const isIE8 = Boolean(~window.navigator.userAgent.indexOf('MSIE 8.0'));

export default class DateSelect extends React.Component<Props, State> {
  public static propTypes = {
    disabled: PropTypes.bool,

    maxYear: PropTypes.number,

    minYear: PropTypes.number,

    type: PropTypes.string,

    value: PropTypes.number.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func
  };

  public static defaultProps = {
    type: 'year',
    minYear: 1900,
    maxYear: 2100,
    width: 'auto'
  };

  public state = {
    botCapped: false,
    current: 0,
    height: 0,
    opened: false,
    pos: 0,
    top: 0,
    topCapped: false,
    nodeTop: Infinity
  };

  private _node: HTMLElement | null = null;

  private _listener: Nullable<ReturnType<typeof LayoutEvents.addListener>>;
  private _timeout: number | undefined;

  private getProps = createPropsGetter(DateSelect.defaultProps);

  public componentWillReceiveProps() {
    this._setNodeTop();
  }

  public componentDidMount() {
    this._listener = LayoutEvents.addListener(this._setNodeTop);
    this._setNodeTop();
  }

  public componentWillUnmount() {
    if (this._listener) {
      this._listener.remove();
    }
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  public open = () => {
    if (this.props.disabled) {
      return;
    }

    if (this.state.opened) {
      return;
    }

    this.resetSize(0);
    this.setState({
      opened: true,
      current: 0
    });
  };

  public close = () => {
    if (!this.state.opened) {
      return;
    }

    this.setState({ opened: false });
  };

  public render() {
    const { width, disabled } = this.props;
    const rootProps = {
      className: classNames({
        [styles.root]: true,
        [styles.disabled]: disabled
      }),
      style: { width },
      ref: this._ref
    };
    return (
      <span {...rootProps}>
        <div className={styles.caption} onClick={this.open}>
          {this.getItem(0)}
          <div
            className={classNames({
              [styles.arrow]: true,
              [styles.arrowDisabled]: disabled
            })}
          >
            <Icon name="ArrowTriangleUpDown" size={12} />
          </div>
        </div>
        {this.state.opened && this.renderMenu()}
      </span>
    );
  }

  private _ref = (node: HTMLElement | null) => {
    this._node = node;
  };

  private _setNodeTop = () => {
    const node = this._node;
    if (!node) {
      return;
    }
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() =>
      this.setState({
        nodeTop: node.getBoundingClientRect().top
      })
    );
  };

  private renderMenu(): React.ReactNode {
    const { top, height, nodeTop } = this.state;

    let shift = this.state.pos % HEIGHT;
    if (shift < 0) {
      shift += HEIGHT;
    }

    const from = (this.state.pos - shift + top) / HEIGHT;
    const to = from + Math.ceil((height + shift) / HEIGHT);
    const items = [];

    for (let i = from; i < to; ++i) {
      const className = classNames({
        [styles.menuItem]: true,
        [styles.menuItemActive]: i === this.state.current,
        [styles.menuItemSelected]: i === 0
      });
      const clickHandler = isIE8
        ? {
            onMouseDown: this.handleItemClick(i)
          }
        : {
            onMouseDown: preventDefault,
            onClick: this.handleItemClick(i)
          };
      items.push(
        <div
          key={i}
          className={className}
          // tslint:disable-next-line:jsx-no-lambda
          onMouseEnter={() => this.setState({ current: i })}
          // tslint:disable-next-line:jsx-no-lambda
          onMouseLeave={() => this.setState({ current: null })}
          {...clickHandler}
        >
          {this.getItem(i)}
        </div>
      );
    }
    const style: {
      left?: number | string;
      right?: number | string;
      top: number;
      width?: number | string;
    } = {
      top: top - 5,
      left: 0,
      right: 0
    };

    const shiftStyle: React.CSSProperties = {
      position: 'relative',
      top: -shift
    };

    const holderClass = classNames({
      [styles.menuHolder]: true,
      [styles.isTopCapped]: this.state.topCapped,
      [styles.isBotCapped]: this.state.botCapped
    });

    let dropdownOffset = -HEIGHT;
    if (nodeTop < -top) {
      const overflowOffsetDelta = this.state.topCapped ? 6 : 17;
      dropdownOffset -= nodeTop + top - overflowOffsetDelta;
    }

    return (
      <RenderLayer
        onClickOutside={this.close}
        onFocusOutside={this.close}
        active
      >
        <div>
          <DropdownContainer
            getParent={this.getAnchor}
            offsetY={dropdownOffset}
            offsetX={-10}
          >
            <div
              className={holderClass}
              style={style}
              onKeyDown={this.handleKey}
            >
              {!this.state.topCapped && (
                <div className={styles.menuUp} onClick={this.handleUp}>
                  <span>
                    <Icon name={'ArrowTriangleUp'} />
                  </span>
                </div>
              )}
              <div className={styles.itemsHolder} style={{ height }}>
                <div style={shiftStyle} onWheel={this.handleWheel}>
                  {items}
                </div>
              </div>
              {!this.state.botCapped && (
                <div className={styles.menuDown} onClick={this.handleDown}>
                  <span>
                    <Icon name={'ArrowTriangleDown'} />
                  </span>
                </div>
              )}
            </div>
          </DropdownContainer>
        </div>
      </RenderLayer>
    );
  }

  private getAnchor() {
    return this._node;
  }

  private handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= HEIGHT;
    } else if (event.deltaMode === 2) {
      deltaY *= HEIGHT * 4;
    }
    const pos = (this.state.pos += deltaY);
    this.resetSize(pos);
  };

  private handleItemClick = (shift: number) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      const value = this.props.value + shift;
      if (this.props.onChange) {
        this.props.onChange(value);
      }
      this.setState({ opened: false });
    };
  };

  private handleKey = (event: React.KeyboardEvent<any>) => {
    if (this.state.opened) {
      switch (event.key) {
        case 'Enter':
          if (this.state.current !== null && this.props.onChange) {
            const value = this.props.value + this.state.current;
            this.props.onChange(value);
          }
          this.close();
          event.stopPropagation();
          break;

        case 'Escape':
          this.close();
          event.stopPropagation(); // Specifically for DatePicker.
          break;

        case 'ArrowUp':
          this.setState({ current: (this.state.current || 0) - 1 });
          event.preventDefault();
          break;

        case 'ArrowDown':
          this.setState({ current: (this.state.current || 0) + 1 });
          event.preventDefault();
          break;
      }
    } else {
      switch (event.key) {
        case ' ':
        case 'ArrowUp':
        case 'ArrowDown':
          this.open();
          event.preventDefault();
          break;
      }
    }
  };

  private handleUp = (event: React.MouseEvent) => {
    event.preventDefault();
    this.resetSize(this.state.pos - HEIGHT);
  };

  private handleDown = (event: React.MouseEvent) => {
    event.preventDefault();
    this.resetSize(this.state.pos + HEIGHT);
  };

  private getItem(index: number) {
    const value = this.props.value + index;
    if (this.props.type === 'month') {
      return MONTHS[value];
    }
    return value;
  }

  private resetSize(pos: number) {
    let top = -5 * HEIGHT;
    let height = 11 * HEIGHT;
    if (this.props.type === 'month') {
      top = -this.props.value * HEIGHT;
      height = 12 * HEIGHT;
    }

    const minPos = this.getMinPos() - top;
    const maxPos = this.getMaxPos() - top - height + HEIGHT;
    if (minPos >= pos) {
      pos = minPos;
    }
    if (maxPos <= pos) {
      pos = maxPos;
    }
    const topCapped = pos <= minPos;
    const botCapped = pos >= maxPos;

    this.setState({ pos, top, height, topCapped, botCapped });
  }

  private getMinPos() {
    if (this.props.type === 'month') {
      return -this.props.value * HEIGHT;
    } else if (this.props.type === 'year') {
      return (this.getProps().minYear - this.props.value) * HEIGHT;
    }
    return -Infinity; // Be defensive.
  }

  private getMaxPos() {
    if (this.props.type === 'month') {
      return (11 - this.props.value) * HEIGHT;
    } else if (this.props.type === 'year') {
      return (this.getProps().maxYear - this.props.value) * HEIGHT;
    }
    return Infinity; // Be defensive.
  }
}

function preventDefault(e: React.SyntheticEvent) {
  e.preventDefault();
}
