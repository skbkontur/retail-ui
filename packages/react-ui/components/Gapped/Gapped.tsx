import React from 'react';
import PropTypes from 'prop-types';

import { isNonNullable } from '../../lib/utils';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

export interface GappedProps extends CommonProps {
  /**
   * Расстояние между элементами в пикселях
   * @default 8
   */
  gap?: number;
  /**
   * Вертикальное выравнивание
   * @default "baseline"
   */
  verticalAlign?: 'top' | 'middle' | 'baseline' | 'bottom';
  /**
   * Расположение элементов по вертикали
   * @default false
   */
  vertical?: boolean;
  /**
   * Перенос элементов на новую строку при горизонтальном расположении
   * @default false
   */
  wrap?: boolean;
  children: React.ReactNode;
}

export const GappedDataTids = {
  vertical: 'Gapped__vertical',
  horizontal: 'Gapped__horizontal',
} as const;

/**
 * Контейнер, расстояние между элементами в котором равно `gap`.
 */
@rootNode
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

  private setRootNode!: TSetRootNode;

  public static defaultProps: Partial<GappedProps> = {
    wrap: false,
    vertical: false,
    verticalAlign: 'baseline',
  };

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {this.props.vertical ? this.renderVertical() : this.renderHorizontal()}
      </CommonWrapper>
    );
  }

  private getGapValue() {
    // DEPRECATED remove in 4.0
    const { gap: propsGap } = this.props;
    if (isNonNullable(propsGap)) {
      return propsGap;
    }

    return 8;
  }

  private renderVertical() {
    const subsequentItemStyle: React.CSSProperties = {
      paddingTop: this.getGapValue(),
    };
    const children = React.Children.toArray(this.props.children)
      .filter(this.filterChildren)
      .map((child, index) => {
        const style = index === 0 ? undefined : subsequentItemStyle;
        return (
          <div style={style} key={index}>
            {child}
          </div>
        );
      });

    return <div data-tid={GappedDataTids.vertical}>{children}</div>;
  }

  private renderHorizontal() {
    const { children, verticalAlign, wrap } = this.props;
    const gap = this.getGapValue();
    const itemStyle: React.CSSProperties = {
      display: 'inline-block',
      verticalAlign,
      ...(wrap ? { marginLeft: gap, marginTop: gap } : {}),
    };
    const rootStyle: React.CSSProperties = wrap ? { paddingTop: 1 } : {};
    const contStyle: React.CSSProperties = wrap ? { marginTop: -gap - 1, marginLeft: -gap } : { whiteSpace: 'nowrap' };

    return (
      <div data-tid={GappedDataTids.horizontal} style={rootStyle}>
        <div style={contStyle}>
          {React.Children.toArray(children)
            .filter(this.filterChildren)
            .map((child, index) => {
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

  private filterChildren(child: React.ReactNode): boolean {
    return Boolean(child) || typeof child === 'number';
  }
}
