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
      value: '',
      opened: false,
    };
  },

  render() {
    let picker = null;
    if (this.state.opened) {
      picker = (
        <div className={styles.picker}>
          <Picker onPick={this.handlePick} />
        </div>
      );
    }
    return (
      <span className={styles.root}>
        <Group width={150}>
          <Input mainInGroup value={this.state.value} />
          <Button narrow active={this.state.opened} onClick={this.open}>
            <Icon name="calendar" />
          </Button>
        </Group>
        {picker}
      </span>
    );
  },

  handlePick(date) {
    let day = formatNumber(date.getDate());
    let month = formatNumber(date.getMonth());
    this.setState({value: `${day}.${month}.${date.getFullYear()}`});
    this.close();
  },

  open() {
    this.setState({opened: true});
  },

  close() {
    this.setState({opened: false});
  },
});

function formatNumber(value) {
  let ret = value.toString();
  while (ret.length < 2) {
    ret = '0' + ret;
  }
  return ret;
}

module.exports = DatePicker;
