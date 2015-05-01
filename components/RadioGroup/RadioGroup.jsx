var React = require('react');

var PropTypes = React.PropTypes;

require('./RadioGroup.less');
var cx = require('ui/cx')('RTRadioGroup');

var RadioGroup = React.createClass({
  getInitialState() {
    return {
      selected: -1,
    };
  },

  render() {
    var inputProps = {
      className: cx('input'),
      onKeyDown: this.handleKey,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };
    return (
      <label className={cx('')}>
        <input {...inputProps} />
        {this.renderItems()}
      </label>
    );
  },

  renderItems() {
    var items = [];
    this.props.items.forEach((item, i) => {
      if (i) {
        items.push(<br key={'br:' + i} />);
      }

      var checked = this.state.selected === i;
      var itemClass = cx({
        'item': true,
        'checked': checked,
        'focused': this.state.focused &&
            (checked || this.state.selected === -1 && i === 0),
      });
      items.push(
        <span key={item} className={itemClass} onClick={e => this.select_(i)}>
          <span className={cx('box')}>
            <div className={cx('inbox')} />
          </span>
          <span className={cx('label')}>{item}</span>
        </span>
      );
    });

    return items;
  },

  handleKey(event) {
    var move = 0;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();

      move = -1;
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();

      move = 1;
    }

    if (move) {
      var selected = this.state.selected + move;
      if (selected < 0) {
        selected = this.props.items.length - 1;
      } else if (selected >= this.props.items.length) {
        selected = 0;
      }
      this.select_(selected);
    }
  },

  handleFocus(event) {
    this.setState({focused: true});
  },

  handleBlur(event) {
    this.setState({focused: false});
  },

  select_(i) {
    this.setState({selected: i});

    if (this.props.onChange) {
      this.props.onChange({target: {value: this.props.items[i]}});
    }
  },
});

module.exports = RadioGroup;
