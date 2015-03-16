var React = require('react');

var CodeRunner = require('./CodeRunner');

require('./Component.less');
var cx = require('ui/cx')('rt-sc-Component');

var Component = React.createClass({
  render() {
    return (
      <div className={cx('')}>
        <h2 className={cx('name')}>{this.props.item.name}</h2>
        <div className={cx('docs')}>
          <div ref="code"></div>
        </div>
        <div className={cx('demo')}>
          <CodeRunner src={this.state.src} />
        </div>
      </div>
    );
  },

  getInitialState() {
    return {
      src: this.props.item.src || ''
    };
  },

  componentDidMount() {
    var editor = CodeMirror(this.refs.code.getDOMNode(), {
      value: this.state.src,
      theme: 'solarized light',
      lineWrapping: true,
      viewportMargin: Infinity,
    });
    editor.on('change', (doc) => {
      this.setState({src: doc.getValue()});
    });
  },
});

module.exports = Component;
