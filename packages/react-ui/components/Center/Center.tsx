import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { styles } from './Center.styles';

export type HorizontalAlign = 'left' | 'center' | 'right';

interface CenterInterface {
  /**
   * Определяет, как контент будет выровнен по горизонтали.
   *
   * **Допустимые значения**: `"left"`, `"center"`, `"right"`.
   */
  align?: HorizontalAlign;
}

export interface CenterProps
  extends CommonProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof CenterInterface>,
    CenterInterface {}

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
