import React from 'react';
import cn from 'classnames';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Center.styles';

export type HorizontalAlign = 'left' | 'center' | 'right';

export interface CenterProps
  extends CommonProps,
    Override<
      React.HTMLAttributes<HTMLDivElement>,
      {
        /**
         * Горизонтальное выравнивание контента.
         */
        align?: HorizontalAlign;

        /**
         * **Используй с осторожностью!**
         * Дополнительные стили
         */
        style?: React.CSSProperties;
      }
    > {}

/**
 * Контейнер для вертикального центрирования. В компонент можно передавать
 * свойства как в любой *div* (кроме `className`)
 */
export class Center extends React.Component<CenterProps> {
  public static __KONTUR_REACT_UI__ = 'Center';

  public static defaultProps = {
    align: 'center',
  };

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }
  private renderMain = (props: CommonWrapperRestProps<CenterProps>) => {
    const { align, ...rest } = props;

    return (
      <div
        {...rest}
        className={cn({
          [jsStyles.root()]: true,
          [jsStyles.rootAlignLeft()]: align === 'left',
          [jsStyles.rootAlignRight()]: align === 'right',
        })}
      >
        <span className={jsStyles.spring()} />
        <span className={jsStyles.container()}>{this.props.children}</span>
      </div>
    );
  };
}
