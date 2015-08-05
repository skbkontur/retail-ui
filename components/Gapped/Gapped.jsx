const React = require('react');

const PropTypes = React.PropTypes;

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
const Gapped = React.createClass({
  propTypes: {
    /**
     * Расстояние между элементами.
     */
    gap: PropTypes.number,

    /**
     * Располагать элементы вертикально.
     */
    vertical: PropTypes.bool,

    /**
     * Вертикальное выравнивание элементов.
     */
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  },

  getDefaultProps() {
    return {
      gap: 10,
      verticalAlign: 'middle',
    };
  },

  render() {
    var itemStyle = {
      display: this.props.vertical ? 'block' : 'inline-block',
      marginLeft: this.props.gap,
      marginTop: this.props.gap,
      verticalAlign: this.props.verticalAlign,
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
