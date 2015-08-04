const React = require('react');

const Button = require('../Button');
const Group = require('../Group');
const Icon = require('../Icon');
const Input = require('../Input');
const Picker = require('./Picker');

const styles = require('./DatePicker.less');

var DatePicker = React.createClass({
  getInitialState() {
    return {
      value: null,
      opened: false,
    };
  },

  render() {
    let picker = null;
    if (this.state.opened) {
      picker = (
        <div className={styles.picker} onKeyDown={this.handlePickerKey}>
          <div className={styles.overlay}
              onMouseDown={this.handleOverlayClick} />
          <Picker value={this.state.value} onPick={this.handlePick} />
        </div>
      );
    }
    return (
      <span className={styles.root}>
        <Group width={150}>
          <Input ref="input" mainInGroup value={formatDate(this.state.value)} />
          <Button narrow active={this.state.opened} onClick={this.open}>
            <Icon name="calendar" />
          </Button>
        </Group>
        {picker}
      </span>
    );
  },

  handlePickerKey(event) {
    if (event.key === 'Escape') {
      this.close(true);
    }
  },

  handlePick(date) {
    this.setState({value: date});
    this.close(true);
  },

  handleOverlayClick() {
    this.close(false);
  },

  open() {
    this.setState({opened: true});
  },

  close(focus) {
    this.setState({opened: false});
    if (focus) {
      setTimeout(() => this.refs.input.focus(), 0);
    }
  },
});

function formatDate(date) {
  if (!date) return '';

  let day = formatNumber(date.getDate());
  let month = formatNumber(date.getMonth());
  return `${day}.${month}.${date.getFullYear()}`;
}

function formatNumber(value) {
  let ret = value.toString();
  while (ret.length < 2) {
    ret = '0' + ret;
  }
  return ret;
}

module.exports = DatePicker;
