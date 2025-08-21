import React from 'react';

import { isFunction, isRefableElement } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import type { Nullable } from '../../typings/utility-types';
import type { TGetRootNode, TRootNodeSubscription, TSetRootNode } from '../../lib/rootNode';
import { getRootNode, isInstanceWithRootNode, rootNode } from '../../lib/rootNode';
import { callChildRef } from '../../lib/callChildRef/callChildRef';

import type { CommonProps, CommonPropsRootNodeRef, CommonWrapperProps } from './types';
import { extractCommonProps } from './utils/extractCommonProps';
import { getCommonVisualStateDataAttributes } from './utils/getCommonVisualStateDataAttributes';

export type CommonPropsWithRootNodeRef = CommonProps & CommonPropsRootNodeRef;

@rootNode
export class CommonWrapper<P extends CommonPropsWithRootNodeRef> extends React.Component<
  CommonWrapperProps<P> & CommonPropsRootNodeRef
> {
  public static __KONTUR_REACT_UI__ = 'CommonWrapper';
  public static displayName = 'CommonWrapper';

  private child: React.ReactNode;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private rootNodeSubscription: Nullable<TRootNodeSubscription> = null;

  render() {
    const [{ className, style, children, rootNodeRef, ...dataProps }, { ...rest }] = extractCommonProps(this.props);
    this.child = isFunction(children) ? children(rest) : children;

    const getChildProps = (child: React.ReactElement<CommonProps & React.RefAttributes<any>>) => {
      const childProps: Record<string, unknown> = {
        ...getCommonVisualStateDataAttributes(rest),
        ...dataProps,
      };

      isRefableElement(child) && (childProps.ref = this.ref);

      const classNames: string = cx(child.props.className, className);
      classNames && (childProps.className = classNames);

      const styles: React.CSSProperties = { ...child.props.style, ...style };
      Object.keys(styles).length && (childProps.style = styles);

      return childProps;
    };

    return React.isValidElement<CommonProps & React.RefAttributes<any>>(this.child)
      ? React.cloneElement(this.child, getChildProps(this.child))
      : this.child;
  }

  private ref = (instance: Nullable<React.ReactInstance>) => {
    this.setRootNode(instance);
    this.props.rootNodeRef?.(getRootNode(instance));

    // refs are called when instances change,
    // so we have to renew or remove old subscription
    this.rootNodeSubscription?.remove();
    this.rootNodeSubscription = null;

    if (instance && isInstanceWithRootNode(instance)) {
      this.rootNodeSubscription = instance.addRootNodeChangeListener?.((node) => {
        this.setRootNode(node);
        this.props.rootNodeRef?.(node);
      });
    }

    const originalRef = (this.child as React.RefAttributes<any>)?.ref;
    if (typeof originalRef === 'function' || (originalRef && typeof originalRef === 'object')) {
      originalRef && callChildRef(originalRef, instance);
    }
  };
}
