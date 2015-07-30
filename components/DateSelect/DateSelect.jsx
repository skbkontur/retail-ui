const React = require('react');

const PropTypes = React.PropTypes;

const styles = require('./DateSelect.less');

const HEIGHT = 30;

const DateSelect = React.createClass({
  propTypes: {
    value: PropTypes.number.isRequired,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      width: 'auto',
    };
  },

  getInitialState() {
    return {
      opened: false,
      top: -5 * HEIGHT,
      pos: 0,
      mouseY: -HEIGHT,
    };
  },

  render() {
    const { width } = this.state;
    return (
      <span className={styles.root} style={{width}}>
        <div className={styles.caption}
            onClick={this.open}>
          {this.props.value}
          <div className={styles.arrow} />
        </div>
        {this.state.opened && this.renderMenu()}
      </span>
    );
  },

  renderMenu() {
    let { top } = this.state;
    let height = 11 * HEIGHT;

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
    event.preventDefault();

    let deltaY = event.deltaY;
    if (event.deltaMode === 1) {
      deltaY *= HEIGHT;
    } else if (event.deltaMode === 2) {
      deltaY *= HEIGHT * 4;
    }
    let pos = this.state.pos += deltaY;
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
    let value = this.getItem(Math.floor(y / HEIGHT));

    this.close();

    if (this.props.onChange) {
      this.props.onChange({target: {value}});
    }
  },

  getItem(index) {
    return this.props.value + index;
  },

  open() {
    this.setState({
      opened: true,
      pos: 0,
    });
  },

  close() {
    this.setState({opened: false});
  },
});

module.exports = DateSelect;
