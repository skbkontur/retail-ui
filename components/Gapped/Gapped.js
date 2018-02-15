// @flow
import * as React from 'react';

import PropTypes from 'prop-types';

type Props = {
  gap: number,
  verticalAlign: 'top' | 'middle' | 'baseline' | 'bottom',
  vertical?: boolean,
  children: React.Node
};

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
class Gapped extends React.Component<Props> {
  static propTypes = {
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
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom'])
  };

  static defaultProps = {
    gap: 10,
    verticalAlign: 'middle'
  };

  render() {
    if (this.props.vertical) {
      return this._renderVertical();
    }
    return this._renderHorizontal();
  }

  _renderVertical() {
    var subsequentItemStyle = {
      paddingTop: this.props.gap
    };
    let isFirst = true;
    var children = React.Children.map(this.props.children, child => {
      if (!child) {
        return child;
      }
      const style = isFirst ? null : subsequentItemStyle;

      isFirst = false;

      return <div style={style}>{child}</div>;
    });

    return <div>{children}</div>;
  }

  _renderHorizontal() {
    var children = React.Children.map(this.props.children, (child, index) => {
      if (!child) {
        return child;
      }
      var itemStyle = {
        display: 'inline-block',
        marginLeft: this.props.gap,
        marginTop: this.props.gap,
        verticalAlign: index > 0 ? this.props.verticalAlign : 'middle'
      };
      return <span style={itemStyle}>{child}</span>;
    });
    const rootStyle = {
      paddingTop: 1
    };
    const contStyle = {
      marginTop: -this.props.gap - 1,
      marginLeft: -this.props.gap
    };
    return (
      <div style={rootStyle}>
        <div style={contStyle}>{children}</div>
      </div>
    );
  }
}

export default Gapped;
