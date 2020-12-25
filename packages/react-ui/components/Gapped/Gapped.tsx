import React from 'react';
import PropTypes from 'prop-types';

import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

export interface GappedProps extends CommonProps {
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
export class Gapped extends React.Component<GappedProps> {
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
    const [commonProps] = extractCommonProps(this.props);
    if (this.props.vertical) {
      return this.renderVertical(commonProps);
    }
    return this.renderHorizontal(commonProps);
  }

  private renderVertical(commonProps: CommonProps) {
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

    return <div {...commonProps}>{children}</div>;
  }

  private renderHorizontal(commonProps: CommonProps) {
    const { gap, children, verticalAlign, wrap } = this.props;
    const itemStyle: React.CSSProperties = {
      display: 'inline-block',
      verticalAlign,
      ...(wrap ? { marginLeft: gap, marginTop: gap } : {}),
    };
    commonProps.style = {
      ...(wrap ? { paddingTop: 1 } : {}),
      ...commonProps.style,
    };
    const contStyle: React.CSSProperties = wrap ? { marginTop: -gap - 1, marginLeft: -gap } : { whiteSpace: 'nowrap' };

    return (
      <div {...commonProps}>
        <div style={contStyle}>
          {React.Children.toArray(children).map((child, index) => {
            const marginLeft = index === 0 ? undefined : gap;
            return (
              <span key={index} style={{ marginLeft, ...itemStyle }}>
                {child}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}
