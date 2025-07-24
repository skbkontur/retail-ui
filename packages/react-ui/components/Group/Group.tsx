import React from 'react';

import { isIE11, isEdge } from '../../lib/client';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import {
  isButton,
  isAutocomplete,
  isCurrencyInput,
  isDropdown,
  isDropdownMenu,
  isFxInput,
  isInput,
  isPasswordInput,
  isSelect,
  isTooltip,
  isHint,
} from '../../lib/utils';
import type { ReactUIFeatureFlags } from '../../lib/featureFlagsContext';
import { getFullReactUIFlagsContext, ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext';

import { styles } from './Group.styles';

export interface GroupProps extends CommonProps {
  /** Задает длину компонента Group. */
  width?: React.CSSProperties['width'];
}

interface GroupChildProps extends CommonProps {
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

const tryPassCorners = (child: React.ReactNode, isFirstChild: boolean, isLastChild: boolean) => {
  const corners = getButtonCorners(isFirstChild, isLastChild);

  if (
    isButton(child) ||
    isInput(child) ||
    isFxInput(child) ||
    isAutocomplete(child) ||
    isPasswordInput(child) ||
    isCurrencyInput(child) ||
    isSelect(child) ||
    isDropdown(child) ||
    isDropdownMenu(child)
  ) {
    return React.cloneElement<(typeof child)['props']>(child, { corners: { ...corners, ...child.props.corners } });
  }

  return child;
};

const hasWidthInPercent = (child: React.ReactElement<GroupChildProps>) => String(child.props.width).includes('%');

export const GroupDataTids = {
  root: 'Group__root',
} as const;

/**
 *  Компонент `Group` используется для создания логически сгруппированных элементов, выровненных по горизонтали.
 *
 *  Длина контейнера настраивается с помощью пропа `width`.
 */
@rootNode
export class Group extends React.Component<GroupProps> {
  public static __KONTUR_REACT_UI__ = 'Group';
  public static displayName = 'Group';

  private setRootNode!: TSetRootNode;
  private featureFlags!: ReactUIFeatureFlags;

  public render() {
    const style: React.CSSProperties = {
      width: this.props.width,
    };

    const childrenArray = React.Children.toArray(this.props.children);
    const firstChild = getFirstChild(childrenArray);
    const lastChild = getLastChild(childrenArray);

    return (
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullReactUIFlagsContext(flags);
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              <span data-tid={GroupDataTids.root} className={styles.root()} style={style}>
                {React.Children.map(childrenArray, (child) => {
                  if (!child || !React.isValidElement<GroupChildProps>(child)) {
                    return null;
                  }

                  const isFirstChild = child === firstChild;
                  const isLastChild = child === lastChild;

                  if (this.featureFlags.groupAddHintAndTooltipSupport && (isHint(child) || isTooltip(child))) {
                    return this.renderWrappedChildren(child, isFirstChild, isLastChild);
                  }

                  return this.renderChild(child, isFirstChild, isLastChild, hasWidthInPercent(child));
                })}
              </span>
            </CommonWrapper>
          );
        }}
      </ReactUIFeatureFlagsContext.Consumer>
    );
  }

  private renderChild = (
    child: React.ReactNode,
    isFirstChild: boolean,
    isLastChild: boolean,
    isWidthInPercent: boolean,
  ) => (
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
        {tryPassCorners(child, isFirstChild, isLastChild)}
      </div>
    </div>
  );

  private renderWrappedChildren(
    parent: React.ReactElement<GroupChildProps>,
    isParentFirst: boolean,
    isParentLast: boolean,
  ): React.ReactNode {
    let shouldStretchParent = false;
    const nestedChildren = React.Children.toArray(parent.props.children);

    const modifiedChildren = nestedChildren.map((nestedChild, index) => {
      if (!nestedChild || !React.isValidElement<GroupChildProps>(nestedChild)) {
        return null;
      }

      const isFirstChild = isParentFirst && index === 0;
      const isLastChild = isParentLast && index === nestedChildren.length - 1;
      if (hasWidthInPercent(nestedChild)) {
        shouldStretchParent = true;
      }

      return this.renderChild(nestedChild, isFirstChild, isLastChild, hasWidthInPercent(nestedChild));
    });

    const wrappedChildren = (
      <div className={cx(styles.wrappedChildren(), { [styles.stretch()]: shouldStretchParent })}>
        {modifiedChildren}
      </div>
    );

    return React.cloneElement<GroupChildProps>(parent, {
      children: wrappedChildren,
    });
  }
}
