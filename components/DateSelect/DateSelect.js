// @flow

import classNames from 'classnames';
import React, { PropTypes } from 'react';

import styles from './DateSelect.less';

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
  'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const HEIGHT = 30;

type Props = {
  maxYear: number,
  minYear: number,
  type: 'month' | 'year',
  value: number,
  width: number | string,
  onChange: (value: number) => void,
};

type State = {
  botCapped: bool,
  current: ?number,
  height: number,
  opened: bool,
  pos: number,
  top: number,
  topCapped: bool,
};

export default class DateSelect extends React.Component {
  static propTypes = {
    maxYear: PropTypes.number,

    minYear: PropTypes.number,

    type: PropTypes.string,

    value: PropTypes.number.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func
  };

  static defaultProps = {
    type: 'year',
    minYear: 1900,
    maxYear: 2100,
    width: 'auto'
  };

  props: Props;
  state: State;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      botCapped: false,
      current: 0,
      height: 0,
      opened: false,
      pos: 0,
      top: 0,
      topCapped: false
    };
  }

  render() {
    const { width } = this.props;
    const rootProps = {
      className: styles.root,
      style: { width },
      tabIndex: '0',
      onBlur: this.close,
      onKeyDown: this.handleKey
    };
    return (
      <span {...rootProps}>
        <div className={styles.caption} onClick={this.open}>
          {this.getItem(0)}
          <div className={styles.arrow} />
        </div>
        {this.state.opened && this.renderMenu()}
      </span>
    );
  }

  renderMenu() {
    const { top, height } = this.state;

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
      items.push(
        <div key={i} className={className}>
          {this.getItem(i)}
        </div>
      );
    }
    const style = {
      top: top - 2
    };

    const shiftStyle = {
      position: 'relative',
      top: -shift
    };

    const holderClass = classNames({
      [styles.menuHolder]: true,
      [styles.isTopCapped]: this.state.topCapped
    });

    return (
      <div className={holderClass} style={style} onKeyDown={this.handleKey}>
        {!this.state.topCapped && (
          <div className={styles.menuUp} onMouseDown={this.handleUp} />
        )}
        <div className={styles.itemsHolder} style={{ height }}>
          <div style={shiftStyle}>{items}</div>
          <div className={styles.menuOverlay}
            onMouseDown={this.handleItemClick}
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
            onWheel={this.handleWheel}
          />
        </div>
        {!this.state.botCapped && (
          <div className={styles.menuDown} onMouseDown={this.handleDown} />
        )}
      </div>
    );
  }

  handleWheel = (event: SyntheticWheelEvent) => {
    event.preventDefault();

    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= HEIGHT;
    } else if (event.deltaMode === 2) {
      deltaY *= HEIGHT * 4;
    }
    const pos = this.state.pos += deltaY;
    this.resetSize(pos);
  };

  handleMouseMove = (event: SyntheticMouseEvent) => {
    const currentTarget: HTMLElement = (event.currentTarget: any);
    const rect = currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top + this.state.top + this.state.pos;
    const current = Math.floor(y / HEIGHT);
    this.setState({ current });
  };

  handleMouseLeave = () => {
    this.setState({ current: null });
  };

  handleItemClick = (event: SyntheticMouseEvent) => {
    if (event.button !== 0) {
      return;
    }

    const currentTarget: HTMLElement = (event.currentTarget: any);
    const rect = currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top + this.state.top + this.state.pos;
    const value = this.props.value + Math.floor(y / HEIGHT);

    this.close();

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  handleKey = (event: SyntheticKeyboardEvent) => {
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

  handleUp = (event: Event) => {
    event.preventDefault();
    this.resetSize(this.state.pos - HEIGHT);
  };

  handleDown = (event: Event) => {
    event.preventDefault();
    this.resetSize(this.state.pos + HEIGHT);
  };

  getItem(index: number) {
    const value = this.props.value + index;
    if (this.props.type === 'month') {
      return MONTHS[value];
    }
    return value;
  }

  open = () => {
    if (this.state.opened) {
      return;
    }

    this.resetSize(0);
    this.setState({
      opened: true,
      current: 0
    });
  };

  close = () => {
    if (!this.state.opened) {
      return;
    }

    this.setState({ opened: false });
  };

  resetSize(pos: number) {
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

  getMinPos() {
    if (this.props.type === 'month') {
      return -this.props.value * HEIGHT;
    } else if (this.props.type === 'year') {
      return (this.props.minYear - this.props.value) * HEIGHT;
    }
    return -Infinity; // Be defensive.
  }

  getMaxPos() {
    if (this.props.type === 'month') {
      return (11 - this.props.value) * HEIGHT;
    } else if (this.props.type === 'year') {
      return (this.props.maxYear - this.props.value) * HEIGHT;
    }
    return Infinity; // Be defensive.
  }
}
