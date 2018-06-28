import * as React from 'react';

import PropTypes from 'prop-types';

export interface GappedProps {
  gap?: number;
  verticalAlign?: 'top' | 'middle' | 'baseline' | 'bottom';
  vertical?: boolean;
  children: React.ReactNode;
}

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
class Gapped extends React.Component<GappedProps> {
  public static propTypes = {
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

  public static defaultProps = {
    gap: 10,
    verticalAlign: 'middle'
  };

  public render() {
    if (this.props.vertical) {
      return this._renderVertical();
    }
    return this._renderHorizontal();
  }

  private _renderVertical() {
    const subsequentItemStyle: React.CSSProperties = {
      paddingTop: this.props.gap
    };
    let isFirst = true;
    const children = React.Children.map(this.props.children, child => {
      if (!child) {
        return child;
      }
      const style = isFirst ? undefined : subsequentItemStyle;

      isFirst = false;

      return <div style={style}>{child}</div>;
    });

    return <div>{children}</div>;
  }

  private _renderHorizontal() {
    const itemStyle = {
      display: 'inline-block',
      marginLeft: this.props.gap,
      marginTop: this.props.gap,
      verticalAlign: this.props.verticalAlign
    };
    const children = React.Children.map(this.props.children, (child, index) => {
      if (!child) {
        return child;
      }
      return <span style={itemStyle}>{child}</span>;
    });
    const rootStyle = {
      paddingTop: 1
    };
    const contStyle = {
      marginTop: -this.props.gap! - 1,
      marginLeft: -this.props.gap!
    };
    return (
      <div style={rootStyle}>
        <div style={contStyle}>{children}</div>
      </div>
    );
  }
}

export default Gapped;
