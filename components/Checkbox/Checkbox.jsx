var events = require('add-event-listener');
var React = require('react');

var Icon = require('../Icon');

var PropTypes = React.PropTypes;

require('./Checkbox.less');
require('./Checkbox.css');
var cx = require('../cx')('RTCheckbox');

var Checkbox = React.createClass({
  propTypes: {
    checked: PropTypes.bool,

    disabled: PropTypes.bool,
  },

  render() {
    var rootClass = cx({
      '': true,
      'isChecked': this.state.checked,
      'isActive': this.state.active,
      'isFocused': this.state.focused,
      'isDisabled': this.props.disabled,
    });

    return (
      <label className={rootClass} onMouseDown={this.handleActivate}>
        <input type="checkbox" className={cx('input')}
            disabled={this.props.disabled}
            onChange={this.handleChange} onFocus={this.handleFocus}
            onBlur={this.handleBlur} />
        <span className={cx('box')}>
          <div className={cx('ok')}><Icon name="ok" /></div>
        </span>
        <span className={cx('caption')}>{this.props.children}</span>
      </label>
    );
  },

  getInitialState() {
    return {
      checked: this.props.checked !== undefined ? this.props.checked : false,
      active: false,
      focused: false
    };
  },

  componentWillReceiveProps(props) {
    if (props.checked !== undefined) {
      this.setState({checked: props.checked});
    }
  },

  handleActivate(event) {
    if (event.button != 0) {
      return;
    }

    this.setState({active: true});

    events.addEventListener(document, 'mouseup', this.deactivate);
  },

  deactivate() {
    this.setState({active: false});

    events.removeEventListener(document, 'mouseup', this.deactivate);
  },

  handleChange(event) {
    if (this.props.checked === undefined) {
      this.setState({checked: event.target.checked});
    }

    this.props.onChange && this.props.onChange(event);
  },

  handleFocus() {
    this.setState({focused: true});
  },

  handleBlur() {
    this.setState({focused: false});
  }
});

module.exports = Checkbox;
