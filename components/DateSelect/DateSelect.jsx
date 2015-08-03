const classNames = require('classnames');
const React = require('react');

const PropTypes = React.PropTypes;

const styles = require('./DateSelect.less');

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const HEIGHT = 30;

const DateSelect = React.createClass({
  propTypes: {
    type: PropTypes.string,

    value: PropTypes.number.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      type: 'year',
      width: 'auto',
    };
  },

  getInitialState() {
    return {
      opened: false,
      pos: 0,
      current: 0,
    };
  },

  render() {
    const { width } = this.props;
    const rootProps = {
      className: styles.root,
      style: {width},
      tabIndex: '0',
      onBlur: this.close,
      onKeyDown: this.handleKey,
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
  },

  renderMenu() {
    let { top, height } = this.state;

    let shift = this.state.pos % HEIGHT;
    if (shift < 0) {
      shift += HEIGHT;
    }
    let from = (this.state.pos - shift + top) / HEIGHT;
    let to = from + Math.ceil((height + shift) / HEIGHT);
    let items = [];
    for (let i = from; i < to; ++i) {
      let className = classNames({
        [styles.menuItem]: true,
        [styles.menuItemActive]: i === this.state.current,
      });
      items.push(
        <div key={i} className={className}>
          {this.getItem(i)}
        </div>
      );
    }
    let style = {
      top: top - 2,
      height,
    };

    let shiftStyle = {
      position: 'relative',
      top: -shift,
    };

    return (
      <div className={styles.menuHolder} style={style}
          onKeyDown={this.handleKey} onWheel={this.handleWheel}>
        <div style={shiftStyle}>{items}</div>
        <div className={styles.menuOverlay}
            onMouseDown={this.handleItemClick}
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave} />
      </div>
    );
  },

  handleWheel(event) {
    if (this.props.type === 'month') {
      return;
    }

    event.preventDefault();

    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= HEIGHT;
    } else if (event.deltaMode === 2) {
      deltaY *= HEIGHT * 4;
    }
    let pos = this.state.pos += deltaY;
    this.resetSize();
    this.setState({pos});
  },

  handleMouseMove(event) {
    let rect = event.currentTarget.getBoundingClientRect();
    let y = event.clientY - rect.top + this.state.top + this.state.pos;
    let current = Math.floor(y / HEIGHT);
    this.setState({current});
  },

  handleMouseLeave() {
    this.setState({current: null});
  },

  handleItemClick(event) {
    let rect = event.currentTarget.getBoundingClientRect();
    let y = event.clientY - rect.top + this.state.top + this.state.pos;
    let value = this.props.value + Math.floor(y / HEIGHT);

    this.close();

    if (this.props.onChange) {
      this.props.onChange({target: {value}});
    }
  },

  handleKey(event) {
    if (this.state.opened) {
      switch (event.key) {
        case 'Enter':
          if (this.state.current !== null && this.props.onChange) {
            let value = this.props.value + this.state.current;
            this.props.onChange({target: {value}});
          }
          this.close();
          event.stopPropagation();
          break;

        case 'Escape':
          this.close();
          event.stopPropagation(); // Specifically for DatePicker.
          break;

        case 'ArrowUp':
          this.setState({current: this.state.current - 1});
          event.preventDefault();
          break;

        case 'ArrowDown':
          this.setState({current: this.state.current + 1});
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
  },

  getItem(index) {
    let value = this.props.value + index;
    if (this.props.type === 'month') {
      return MONTHS[value];
    }
    return value;
  },

  open() {
    if (this.state.opened) return;

    this.resetSize();
    this.setState({
      opened: true,
      pos: 0,
      current: 0,
    });
  },

  close() {
    if (!this.state.opened) return;

    this.setState({opened: false});
  },

  resetSize() {
    let top = -5 * HEIGHT;
    let height = 11 * HEIGHT;
    if (this.props.type === 'month') {
      top = -this.props.value * HEIGHT;
      height = 12 * HEIGHT;
    }
    this.setState({top, height});
  },
});

module.exports = DateSelect;
