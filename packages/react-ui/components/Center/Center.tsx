import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter, DefaultizedProps } from '../../lib/createPropsGetter';
import { EmotionConsumer } from '../../lib/theming/Emotion';

import { getStyles } from './Center.styles';

export type HorizontalAlign = 'left' | 'center' | 'right';

export interface CenterProps
  extends CommonProps,
    Override<
      React.HTMLAttributes<HTMLDivElement>,
      {
        /** Задает выравнивание контента по горизонтали */
        align?: HorizontalAlign;
      }
    > {}

export const CenterDataTids = {
  root: 'Center__root',
} as const;

type DefaultProps = Required<Pick<CenterProps, 'align'>>;
type DefaultizedCenterProps = DefaultizedProps<CenterProps, DefaultProps>;

/**
 * `Center` — контейнер, который центрирует элементы внутри себя.
 *
 * Выравнивание задается пропом `align`.
 */
@rootNode
export class Center extends React.Component<CenterProps> {
  public static __KONTUR_REACT_UI__ = 'Center';
  public static displayName = 'Center';

  public static defaultProps: DefaultProps = {
    align: 'center',
  };
  private getProps = createPropsGetter(Center.defaultProps);

  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </EmotionConsumer>
    );
  }
  private renderMain = (props: CommonWrapperRestProps<DefaultizedCenterProps>) => {
    const { align, ...rest } = props;
    const styles = this.styles;
    return (
      <div
        data-tid={CenterDataTids.root}
        {...rest}
        className={this.emotion.cx({
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
