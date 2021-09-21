import React from 'react';
import PropTypes from 'prop-types';

import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Nullable } from '../../typings/utility-types';

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

  private theme!: Theme;
  private rootDomNode: Nullable<HTMLElement>;

  public static defaultProps = {
    wrap: false,
    vertical: false,
    verticalAlign: 'baseline',
  };

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper {...this.props}>
              {this.props.vertical ? this.renderVertical() : this.renderHorizontal()}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private getGapValue() {
    // DEPRECATED remove in 4.0
    const { gap: propsGap } = this.props;
    if (propsGap !== undefined && propsGap !== null) {
      return propsGap;
    } else {
      const gap = is8pxTheme(this.theme) ? 8 : 10;
      return gap;
    }
  }

  private renderVertical() {
    const subsequentItemStyle: React.CSSProperties = {
      paddingTop: this.getGapValue(),
    };
    let isFirst = true;
    const children = React.Children.map(this.props.children, (child) => {
      if (!child) {
        return child;
      }
      const style = isFirst ? undefined : subsequentItemStyle;

      isFirst = false;

      return (
        <div style={style} ref={this.refRootDomNode}>
          {child}
        </div>
      );
    });

    return <div ref={this.refRootDomNode}>{children}</div>;
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
      <div style={rootStyle} ref={this.refRootDomNode}>
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

  private refRootDomNode = (rootDomNode: Nullable<HTMLElement>) => {
    this.rootDomNode = rootDomNode;
  };

  public getRootDomNode = () => {
    return this.rootDomNode;
  };
}
