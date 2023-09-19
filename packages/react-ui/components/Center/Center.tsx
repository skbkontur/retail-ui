import React from 'react';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter, DefaultizedProps } from '../../lib/createPropsGetter';

import { styles } from './Center.styles';

export type HorizontalAlign = 'left' | 'center' | 'right';

export interface CenterProps
  extends CommonProps,
    Override<
      React.HTMLAttributes<HTMLDivElement>,
      {
        /**
         * Определяет, как контент будет выровнен по горизонтали.
         *
         * **Допустимые значения**: `"left"`, `"center"`, `"right"`.
         */
        align?: HorizontalAlign;
      }
    > {}

export const CenterDataTids = {
  root: 'Center__root',
} as const;

type DefaultProps = Required<Pick<CenterProps, 'align'>>;
type DefaultizedCenterProps = DefaultizedProps<CenterProps, DefaultProps>;

/**
 * Контейнер, который центрирует элементы внутри себя.
 */
@rootNode
export class Center extends React.Component<CenterProps> {
  public static __KONTUR_REACT_UI__ = 'Center';

  public static defaultProps: DefaultProps = {
    align: 'center',
  };
  private getProps = createPropsGetter(Center.defaultProps);

  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
        {this.renderMain}
      </CommonWrapper>
    );
  }
  private renderMain = (props: CommonWrapperRestProps<DefaultizedCenterProps>) => {
    const { align, ...rest } = props;

    return (
      <div
        data-tid={CenterDataTids.root}
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
