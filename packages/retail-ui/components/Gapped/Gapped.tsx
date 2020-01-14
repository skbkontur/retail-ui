import React from 'react';
import PropTypes from 'prop-types';

export interface GappedProps {
  /**
   * Расстояние между элементами в пикселях
   * @default 10
   */
  gap: number;
  /**
   * Вертикальное выравнивание
   * @default "baseline"
   */
  verticalAlign: 'top' | 'middle' | 'baseline' | 'bottom';
  /**
   * Расположение элементов по вертикали
   * @default false
   */
  vertical: boolean;
  /**
   * Перенос элементов на новую строку при горизонтальном расположении
   * @default false
   */
  wrap: boolean;
  children: React.ReactNode;
}

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
class Gapped extends React.Component<GappedProps> {
  public static __KONTUR_REACT_UI__ = 'Gapped';

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
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom']),
  };

  public static defaultProps = {
    gap: 10,
    wrap: false,
    vertical: false,
    verticalAlign: 'baseline',
  };

  public render() {
    if (this.props.vertical) {
      return this.renderVertical();
    }
    return this.renderHorizontal();
  }

  private renderVertical() {
    const subsequentItemStyle: React.CSSProperties = {
      paddingTop: this.props.gap,
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

  private renderHorizontal() {
    const { gap, children, verticalAlign, wrap } = this.props;
    const itemStyle: React.CSSProperties = {
      display: 'inline-block',
      verticalAlign,
      ...(wrap ? { marginLeft: gap, marginTop: gap } : {}),
    };
    const rootStyle: React.CSSProperties = wrap ? { paddingTop: 1 } : {};
    const contStyle: React.CSSProperties = wrap ? { marginTop: -gap - 1, marginLeft: -gap } : { whiteSpace: 'nowrap' };

    return (
      <div style={rootStyle}>
        <div style={contStyle}>
          {React.Children.map(children, (child, index) => {
            if (!child) {
              return child;
            }
            const marginLeft = index === 0 ? undefined : gap;
            return <span style={{ marginLeft, ...itemStyle }}>{child}</span>;
          })}
        </div>
      </div>
    );
  }
}

export default Gapped;
