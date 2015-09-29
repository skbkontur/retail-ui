var React = require('react');

var CodeRunner = require('./CodeRunner');
var PropsDoc = require('./PropsDoc');

require('./Component.less');
var cx = require('ui/cx')('rt-sc-Component');

var Component = React.createClass({
  render() {
    return (
      <div className={cx('')}>
        <h2 className={cx('name')}>{this.props.component.name}</h2>
        <div className={cx('demo')}>
          <CodeRunner src={this.state.src} />
        </div>
        <div className={cx('docs')}>
          <div ref="code"></div>
          <PropsDoc component={this.props.component} />
        </div>
      </div>
    );
  },

  getInitialState() {
    return {
      src: this.props.component.src || '',
    };
  },

  componentDidMount() {
    var editor = global.CodeMirror(this.refs.code.getDOMNode(), {
      value: this.state.src.replace(/\n$/, ''),
      theme: 'solarized light',
      smartIndent: false, // Doesn't work for jsx.
      lineWrapping: true,
      viewportMargin: Infinity,
    });
    editor.on('change', (doc) => {
      this.setState({src: doc.getValue()});
    });
  },
});

module.exports = Component;
