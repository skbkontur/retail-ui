import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import ArrowTriangleUpDownIcon from '@skbkontur/react-icons/ArrowTriangleUpDown';
import ArrowTriangleUpIcon from '@skbkontur/react-icons/ArrowTriangleUp';
import ArrowTriangleDownIcon from '@skbkontur/react-icons/ArrowTriangleDown';
import { DatePickerLocale, DatePickerLocaleHelper } from '../DatePicker/locale';
import { locale } from '../LocaleProvider/decorators';

import RenderLayer from '../RenderLayer';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import LayoutEvents from '../../lib/LayoutEvents';

import { Nullable } from '../../typings/utility-types';

import styles from './DateSelect.less';

const itemHeight = 24;
const visibleYearsCount = 11;
const itemsToMoveCount = -5;
const monthsCount = 12;
const defaultMinYear = 1900;
const defaultMaxYear = 2100;

export interface DateSelectProps {
  disabled?: boolean | null;
  onChange: (value: number) => void;
  type?: 'month' | 'year';
  value: number;
  width?: number | string;
  minValue?: number;
  maxValue?: number;
}

export interface DateSelectState {
  botCapped: boolean;
  current: Nullable<number>;
  height: number;
  opened: boolean;
  pos: number;
  top: number;
  topCapped: boolean;
  nodeTop: number;
}

@locale('DatePicker', DatePickerLocaleHelper)
export default class DateSelect extends React.Component<DateSelectProps, DateSelectState> {
  public static propTypes = {
    disabled: PropTypes.bool,

    type: PropTypes.string,

    value: PropTypes.number.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,

    minValue: PropTypes.number,

    maxValue: PropTypes.number,
  };

  public static defaultProps = {
    type: 'year',
    minMonth: 0,
    maxMonth: 11,
    width: 'auto',
  };

  public state = {
    botCapped: false,
    current: 0,
    height: 0,
    opened: false,
    pos: 0,
    top: 0,
    topCapped: false,
    nodeTop: Infinity,
  };

  private readonly locale!: DatePickerLocale;
  private root: HTMLElement | null = null;
  private itemsContainer: HTMLElement | null = null;

  private listener: Nullable<ReturnType<typeof LayoutEvents.addListener>>;
  private timeout: number | undefined;

  private longClickTimer: number = 0;
  private setPositionRepeatTimer: number = 0;
  private yearStep: number = 3;

  public componentWillReceiveProps() {
    this.setNodeTop();
  }

  public componentDidMount() {
    this.listener = LayoutEvents.addListener(this.setNodeTop);
    this.setNodeTop();
    window.addEventListener('keydown', this.handleKey);
  }

  public componentWillUnmount() {
    if (this.listener) {
      this.listener.remove();
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.longClickTimer) {
      clearTimeout(this.longClickTimer);
    }
    if (this.setPositionRepeatTimer) {
      clearTimeout(this.setPositionRepeatTimer);
    }
    window.removeEventListener('keydown', this.handleKey);
  }

  /**
   * @public
   */
  public open = () => {
    if (this.props.disabled) {
      return;
    }

    if (this.state.opened) {
      return;
    }

    this.setPosition(0);
    this.setState({
      opened: true,
      current: 0,
    });
  };

  /**
   * @public
   */
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
        [styles.disabled]: disabled,
      }),
      style: { width },
      ref: this.refRoot,
    };
    return (
      <span {...rootProps}>
        <div className={styles.caption} onClick={this.open}>
          {this.getItem(0)}
          <div
            className={classNames({
              [styles.arrow]: true,
              [styles.arrowDisabled]: disabled,
            })}
          >
            <ArrowTriangleUpDownIcon size={12} />
          </div>
        </div>
        {this.state.opened && this.renderMenu()}
      </span>
    );
  }

  private refRoot = (element: HTMLElement | null) => {
    this.root = element;
  };

  private setNodeTop = () => {
    const root = this.root;
    if (!root) {
      return;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() =>
      this.setState({
        nodeTop: root.getBoundingClientRect().top,
      }),
    );
  };

  private disableItems(index: number) {
    const value = this.props.value + index;
    if (this.props.maxValue != null && this.props.minValue != null) {
      return value > this.props.maxValue || value < this.props.minValue;
    }
    if (this.props.minValue != null) {
      return value < this.props.minValue;
    }
    if (this.props.maxValue != null) {
      return value > this.props.maxValue;
    }
  }

  private renderMenu(): React.ReactNode {
    const { top, height, nodeTop } = this.state;

    let shift = this.state.pos % itemHeight;
    if (shift < 0) {
      shift += itemHeight;
    }

    const from = (this.state.pos - shift + top) / itemHeight;
    const to = from + Math.ceil((height + shift) / itemHeight);
    const items = [];

    for (let i = from; i < to; ++i) {
      const className = classNames({
        [styles.menuItem]: true,
        [styles.menuItemActive]: i === this.state.current,
        [styles.menuItemSelected]: i === 0,
        [styles.menuItemDisabled]: this.disableItems(i),
      });
      const clickHandler = {
        onMouseDown: preventDefault,
        onClick: this.handleItemClick(i),
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
        </div>,
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
      right: 0,
    };

    const shiftStyle: React.CSSProperties = {
      position: 'relative',
      top: -shift,
    };

    const holderClass = classNames({
      [styles.menuHolder]: true,
      [styles.isTopCapped]: this.state.topCapped,
      [styles.isBotCapped]: this.state.botCapped,
    });

    let dropdownOffset = -itemHeight;
    if (nodeTop < -top) {
      const overflowOffsetDelta = this.state.topCapped ? 6 : 17;
      dropdownOffset -= nodeTop + top - overflowOffsetDelta;
    }

    return (
      <RenderLayer onClickOutside={this.close} onFocusOutside={this.close} active>
        <div>
          <DropdownContainer getParent={this.getAnchor} offsetY={dropdownOffset} offsetX={-10}>
            <div className={holderClass} style={style}>
              {!this.state.topCapped && (
                <div
                  className={styles.menuUp}
                  onClick={this.handleUp}
                  onMouseDown={this.handleLongClickUp}
                  onMouseUp={this.handleLongClickStop}
                  onMouseLeave={this.handleLongClickStop}
                  onTouchStart={this.handleLongClickUp}
                  onTouchEnd={this.handleLongClickStop}
                >
                  <span>
                    <ArrowTriangleUpIcon />
                  </span>
                </div>
              )}
              <div className={styles.itemsHolder} style={{ height }}>
                <div ref={this.refItemsContainer} style={shiftStyle}>
                  {items}
                </div>
              </div>
              {!this.state.botCapped && (
                <div
                  className={styles.menuDown}
                  onClick={this.handleDown}
                  onMouseDown={this.handleLongClickDown}
                  onMouseUp={this.handleLongClickStop}
                  onMouseLeave={this.handleLongClickStop}
                  onTouchStart={this.handleLongClickDown}
                  onTouchEnd={this.handleLongClickStop}
                >
                  <span>
                    <ArrowTriangleDownIcon />
                  </span>
                </div>
              )}
            </div>
          </DropdownContainer>
        </div>
      </RenderLayer>
    );
  }

  private refItemsContainer = (element: HTMLElement | null) => {
    if (!this.itemsContainer && element) {
      element.addEventListener('wheel', this.handleWheel, { passive: false });
    }
    if (this.itemsContainer && !element) {
      this.itemsContainer.removeEventListener('wheel', this.handleWheel);
    }
    this.itemsContainer = element;
  };

  private handleLongClickUp = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    this.longClickTimer = window.setTimeout(() => {
      this.setPositionRepeatTimer = window.setInterval(() => this.setPosition(this.state.pos - itemHeight), 100);
    }, 200);
  };

  private handleLongClickDown = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    this.longClickTimer = window.setTimeout(() => {
      this.setPositionRepeatTimer = window.setInterval(() => this.setPosition(this.state.pos + itemHeight), 100);
    }, 200);
  };

  private handleLongClickStop = () => {
    clearTimeout(this.longClickTimer);
    clearTimeout(this.setPositionRepeatTimer);
  };

  private getAnchor = () => this.root;

  private handleWheel = (event: Event) => {
    if (!(event instanceof WheelEvent)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= itemHeight;
    } else if (event.deltaMode === 2) {
      deltaY *= itemHeight * 4;
    }
    const pos = (this.state.pos += deltaY);
    this.setPosition(pos);
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

  private handleKey = (event: KeyboardEvent) => {
    if (this.state.opened && event.key === 'Escape') {
      event.preventDefault();
      this.close();
      event.stopPropagation();
    }
  };

  private handleUp = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setPosition(this.state.pos - itemHeight * this.yearStep);
  };

  private handleDown = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setPosition(this.state.pos + itemHeight * this.yearStep);
  };

  private getItem(index: number) {
    const value = this.props.value + index;
    if (this.props.type === 'month') {
      return this.locale.months[value];
    }
    return value;
  }

  private setPosition(pos: number) {
    let top = itemsToMoveCount * itemHeight;
    let height = visibleYearsCount * itemHeight;
    if (this.props.type === 'month') {
      top = -this.props.value * itemHeight;
      height = monthsCount * itemHeight;
    }

    const minPos = this.getMinPos() - top;
    const maxPos = this.getMaxPos() - top - height + itemHeight;
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
      return -this.props.value * itemHeight;
    } else if (this.props.type === 'year') {
      return ((this.props.minValue || defaultMinYear) - this.props.value) * itemHeight;
    }
    return -Infinity; // Be defensive.
  }

  private getMaxPos() {
    if (this.props.type === 'month') {
      return (visibleYearsCount - this.props.value) * itemHeight;
    } else if (this.props.type === 'year') {
      return ((this.props.maxValue || defaultMaxYear) - this.props.value) * itemHeight;
    }
    return Infinity; // Be defensive.
  }
}

function preventDefault(e: React.SyntheticEvent) {
  e.preventDefault();
}
