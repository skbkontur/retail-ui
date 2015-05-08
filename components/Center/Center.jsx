var React = require('react');

var PropTypes = React.PropTypes;

require('./Center.less');
var cx = require('../cx')('RTCenter');

/**
 * Контейнер для вертикального центрирования. В компонент можно передавать
 * свойства как в любой div.
 */
var Center = React.createClass({
  propTypes: {
    /**
     * Горизонтальное выравнивание контента.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),
  },

  getDefaultProps() {
    return {
      align: 'center',
    };
  },

  render() {
    var style = Object.assign({
      textAlign: this.props.align,
    }, this.props.style);

    return (
      <div className={cx('')} {...this.props} style={style}>
        <span className={cx('spring')} />
        <span className={cx('container')}>{this.props.children}</span>
      </div>
    );
  },
});

module.exports = Center;
