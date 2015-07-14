var React = require('react');

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
var Gapped = React.createClass({
  propTypes: {
    /**
     * Расстояние между элементами.
     */
    gap: React.PropTypes.number,

    /**
     * Располагать элементы вертикально.
     */
    vertical: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      gap: 10,
    };
  },

  render() {
    var itemStyle = {
      display: this.props.vertical ? 'block' : 'inline-block',
      marginLeft: this.props.gap,
      marginTop: this.props.gap,
      verticalAlign: 'top',
    };
    var children = React.Children.map(this.props.children, child => {
      if (!child) {
        return child;
      }
      return <span style={itemStyle}>{child}</span>;
    });
    const rootStyle = {
      paddingTop: 1,
    }
    const contStyle = {
      marginTop: -this.props.gap - 1,
      marginLeft: -this.props.gap,
    };
    return (
      <div style={rootStyle}>
        <div style={contStyle}>{children}</div>
      </div>
    );
  },
});

module.exports = Gapped;
