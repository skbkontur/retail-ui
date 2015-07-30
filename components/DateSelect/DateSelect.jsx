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
      mouseY: -HEIGHT,
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
        <div className={styles.caption}
            onClick={this.open}>
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
      let className = styles.menuItem;
      let y = this.state.mouseY + top + this.state.pos;
      if (Math.floor(y / HEIGHT) === i) {
        className += ' ' + styles.menuItemActive;
      }
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
          onWheel={this.handleWheel}>
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
    this.setState({
      mouseY: event.clientY - rect.top,
    });
  },

  handleMouseLeave() {
    this.setState({mouseY: -HEIGHT});
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
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
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
      mouseY: -HEIGHT,
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
