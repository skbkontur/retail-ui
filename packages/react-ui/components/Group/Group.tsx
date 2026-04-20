import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import {
  isAutocomplete,
  isButton,
  isCurrencyInput,
  isDropdown,
  isDropdownMenu,
  isFxInput,
  isHint,
  isInput,
  isPasswordInput,
  isSelect,
  isTooltip,
} from '../../lib/utils.js';
import { getStyles } from './Group.styles.js';

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
@withRenderEnvironment
@rootNode
export class Group extends React.Component<GroupProps> {
  public static __KONTUR_REACT_UI__ = 'Group';
  public static displayName = 'Group';

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;

  public render(): React.JSX.Element {
    const style: React.CSSProperties = {
      width: this.props.width,
    };

    const childrenArray = React.Children.toArray(this.props.children);
    const firstChild = getFirstChild(childrenArray);
    const lastChild = getLastChild(childrenArray);
    this.styles = getStyles(this.emotion);

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <span data-tid={GroupDataTids.root} className={this.styles.root()} style={style}>
          {React.Children.map(childrenArray, (child) => {
            if (!child || !React.isValidElement<GroupChildProps>(child)) {
              return null;
            }

            const isFirstChild = child === firstChild;
            const isLastChild = child === lastChild;

            if (isHint(child) || isTooltip(child)) {
              return this.renderWrappedChildren(child, isFirstChild, isLastChild);
            }

            return this.renderChild(child, isFirstChild, isLastChild, hasWidthInPercent(child));
          })}
        </span>
      </CommonWrapper>
    );
  }

  private renderChild = (
    child: React.ReactNode,
    isFirstChild: boolean,
    isLastChild: boolean,
    isWidthInPercent: boolean,
  ) => (
    <div
      className={this.cx({
        [this.styles.fixed()]: !isWidthInPercent,
        [this.styles.stretch()]: isWidthInPercent,
      })}
    >
      <div
        className={this.cx({
          [this.styles.item()]: true,
          [this.styles.itemFirst()]: isFirstChild,
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
      <div className={this.cx(this.styles.wrappedChildren(), { [this.styles.stretch()]: shouldStretchParent })}>
        {modifiedChildren}
      </div>
    );

    return React.cloneElement<GroupChildProps>(parent, {
      children: wrappedChildren,
    });
  }
}
