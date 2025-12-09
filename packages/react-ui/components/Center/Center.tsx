import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import type { Override } from '../../typings/utility-types';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import type { DefaultizedProps } from '../../lib/createPropsGetter';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

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
@withRenderEnvironment
@rootNode
export class Center extends React.Component<CenterProps> {
  public static __KONTUR_REACT_UI__ = 'Center';
  public static displayName = 'Center';

  public static defaultProps: DefaultProps = {
    align: 'center',
  };
  private getProps = createPropsGetter(Center.defaultProps);

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;

  public render() {
    this.styles = getStyles(this.emotion);

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
        className={this.cx({
          [this.styles.root()]: true,
          [this.styles.rootAlignLeft()]: align === 'left',
          [this.styles.rootAlignRight()]: align === 'right',
        })}
      >
        <span className={this.styles.spring()} />
        <span className={this.styles.container()}>{this.props.children}</span>
      </div>
    );
  };
}
