var React = require('react');

require('./Radio.less');
var cx = require('../cx')('RTRadio');

var Radio = React.createClass({
  propTypes: {
    value: React.PropTypes.bool,

    /**
     * Вызывается, только если `checked` равно `true`.
     */
    onChange: React.PropTypes.func,
  },

  render() {
    var rootClass = cx({
      '': true,
      'isChecked': this.props.checked,
      'isFocused': this.state.focused,
    });

    return (
      <label className={rootClass}>
        <input type="checkbox" className={cx('input')}
            onChange={this.handleChange} onFocus={this.handleFocus}
            onBlur={this.handleBlur} />
        <span className={cx('box')}><div className={cx('inbox')}/></span>
        <span className={cx('label')}>{this.props.children}</span>
      </label>
    );
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      focused: false,
    };
  },

  handleChange(event) {
    if (this.props.onChange && !this.props.checked) {
      this.props.onChange({target: {checked: true}});
    }
  },

  handleFocus() {
    this.setState({focused: true});
  },

  handleBlur() {
    this.setState({focused: false});
  },
});

module.exports = Radio;
