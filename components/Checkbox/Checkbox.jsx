var React = require('react');

require('./Checkbox.less');
var cx = require('../cx')('RTCheckbox');

var Checkbox = React.createClass({
  render() {
    var rootClass = cx({
      '': true,
      'isChecked': this.props.checked,
      'active': this.state.active
    });

    return (
      <label className={rootClass} onMouseDown={this.handleActivate}>
        <input type="checkbox" onChange={this.handleChange} />
        <span>{this.props.children}</span>
      </label>
    );
  },

  getInitialState() {
    return {
      active: false
    };
  },

  handleActivate() {
    this.setState({active: true});

    window.addEventListener('mouseup', this.deactivate);
  },

  deactivate() {
    this.setState({active: false});

    window.removeEventListener('mouseup', this.deactivate);
  },

  handleChange(event) {
    this.props.onChange && this.props.onChange(event);
  }
});

module.exports = Checkbox;
