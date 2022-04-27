import React from 'react';
import PropTypes from 'prop-types';

import { isIE11, isEdge } from '../../lib/client';
import { isButton } from '../Button';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Group.styles';

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

const getButtonCorners = (
  child: React.ReactNode,
  firstChild: React.ReactNode,
  lastChild: React.ReactNode,
): React.CSSProperties => {
  if (firstChild === lastChild) {
    return {};
  }

  if (child === firstChild) {
    return {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  }

  if (child === lastChild) {
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
  if (isButton(child)) {
    const corners = getButtonCorners(child, firstChild, lastChild);

    return React.cloneElement(child, { corners });
  }

  return child;
};

@rootNode
export class Group extends React.Component<GroupProps> {
  public static __KONTUR_REACT_UI__ = 'Group';
  private setRootNode!: TSetRootNode;

  public static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  public render() {
    const style: React.CSSProperties = {
      width: this.props.width,
    };

    const firstChild = getFirstChild(this.props.children);
    const lastChild = getLastChild(this.props.children);

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <span className={styles.root()} style={style}>
          {React.Children.map(this.props.children, (child) => {
            if (!child || !React.isValidElement<GroupChildProps>(child)) {
              return null;
            }

            const isWidthInPercent = Boolean(child.props.width && child.props.width.toString().includes('%'));

            const modifiedChild = passCornersIfButton(child, firstChild, lastChild);

            const isFirstChild = child === firstChild;

            return (
              <div
                className={cx({
                  [styles.fixed()]: !isWidthInPercent,
                  [styles.stretch()]: isWidthInPercent,
                  [styles.stretchFallback()]: Boolean(isWidthInPercent && this.props.width && (isIE11 || isEdge)),
                })}
              >
                <div
                  className={cx({
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
