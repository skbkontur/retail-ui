import React from 'react';
import PropTypes from 'prop-types';
import type { Emotion } from '@emotion/css/create-instance';

import { isEdge, isIE11 } from '../../lib/client';
import { isButton } from '../Button';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { isInputLike } from '../../lib/utils';

import { getStyles } from './Group.styles';

export interface GroupProps extends CommonProps {
  width?: React.CSSProperties['width'];
}

interface GroupChildProps {
  width?: React.CSSProperties['width'];
  corners?: number;
}

const getFirstChild = (children: React.ReactNode) => {
  if (!Array.isArray(children)) {
    return children;
  }

  return children?.[0] as React.ReactNode;
};

const getLastChild = (children: React.ReactNode) => {
  if (!Array.isArray(children)) {
    return children;
  }

  const numberOfChildren = React.Children.count(children);

  return children?.[numberOfChildren - 1] as React.ReactNode;
};

export const getButtonCorners = (isFirstChild: boolean, isLastChild: boolean): React.CSSProperties => {
  if (isFirstChild && isLastChild) {
    return {};
  }

  if (isFirstChild) {
    return {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  }

  if (isLastChild) {
    return {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    };
  }

  return {
    borderRadius: 0,
  };
};

const passCornersIfButton = (child: React.ReactNode, firstChild: React.ReactNode, lastChild: React.ReactNode) => {
  const corners = getButtonCorners(child === firstChild, child === lastChild);
  if (isButton(child)) {
    return React.cloneElement(child, { corners: { ...corners, ...child.props.corners } });
  }
  if (isInputLike(child)) {
    return React.cloneElement(child, { corners: { ...corners, ...child.props.corners } });
  }

  return child;
};

export const GroupDataTids = {
  root: 'Group__root',
} as const;

@rootNode
export class Group extends React.Component<GroupProps> {
  public static __KONTUR_REACT_UI__ = 'Group';
  public static displayName = 'Group';

  private setRootNode!: TSetRootNode;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;

  public static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return this.renderMain();
        }}
      </EmotionConsumer>
    );
  }

  public renderMain() {
    const style: React.CSSProperties = {
      width: this.props.width,
    };

    const childrenArray = React.Children.toArray(this.props.children);
    const firstChild = getFirstChild(childrenArray);
    const lastChild = getLastChild(childrenArray);
    const styles = this.styles;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <span data-tid={GroupDataTids.root} className={styles.root()} style={style}>
          {React.Children.map(childrenArray, (child) => {
            if (!child || !React.isValidElement<GroupChildProps>(child)) {
              return null;
            }

            const isWidthInPercent = Boolean(child.props.width && child.props.width.toString().includes('%'));

            const modifiedChild = passCornersIfButton(child, firstChild, lastChild);

            const isFirstChild = child === firstChild;

            return (
              <div
                className={this.emotion.cx({
                  [styles.fixed()]: !isWidthInPercent,
                  [styles.stretch()]: isWidthInPercent,
                  [styles.stretchFallback()]: Boolean(isWidthInPercent && this.props.width && (isIE11 || isEdge)),
                })}
              >
                <div
                  className={this.emotion.cx({
                    [styles.item()]: true,
                    [styles.itemFirst()]: isFirstChild,
                  })}
                >
                  {modifiedChild}
                </div>
              </div>
            );
          })}
        </span>
      </CommonWrapper>
    );
  }
}
