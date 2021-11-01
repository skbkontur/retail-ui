import React from 'react';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './Center.styles';

export type HorizontalAlign = 'left' | 'center' | 'right';

export interface CenterProps
  extends Pick<CommonProps, 'data-tid'>,
    Override<
      React.HTMLAttributes<HTMLDivElement>,
      {
        /**
         * Определяет, как контент будет выровнен по горизонтали.
         *
         * **Допустимые значения**: `"left"`, `"center"`, `"right"`.
         */
        align?: HorizontalAlign;

        /**
         * **Используйте с осторожностью!**
         *
         * HTML-атрибут `style`.
         */
        style?: React.CSSProperties;
      }
    > {}

/**
 * Контейнер, который центрирует элементы внутри себя.
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
        className={cx({
          [styles.root()]: true,
          [styles.rootAlignLeft()]: align === 'left',
          [styles.rootAlignRight()]: align === 'right',
        })}
      >
        <span className={styles.spring()} />
        <span className={styles.container()}>{this.props.children}</span>
      </div>
    );
  };
}
