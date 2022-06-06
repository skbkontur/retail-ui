import React from 'react';

import { isFunction, isRefableElement } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import { Nullable } from '../../typings/utility-types';
import { getRootNode, rootNode, TSetRootNode, TRootNodeSubscription, isInstanceWithRootNode } from '../../lib/rootNode';
import { callChildRef } from '../../lib/callChildRef/callChildRef';

export interface CommonProps {
  /**
   * HTML-атрибут `class`.
   */
  className?: React.HTMLAttributes<HTMLElement>['className'];
  /**
   * HTML-атрибут `style`.
   */
  style?: React.HTMLAttributes<HTMLElement>['style'];
  /**
   * На равне с data-tid транслируются любые data-атрибуты. Они попадают на корневой элемент.
   */
  'data-tid'?: string;
}

interface CommonPropsRootNodeRef {
  rootNodeRef?: (instance: Nullable<HTMLElement>) => void;
}

export type NotCommonProps<P> = Omit<P, keyof CommonProps>;

export type CommonWrapperProps<P> = P & {
  children: React.ReactNode | ((rest: CommonWrapperRestProps<P>) => React.ReactNode);
};
export type CommonWrapperRestProps<P> = Omit<NotCommonProps<P>, 'children'>;

@rootNode
export class CommonWrapper<P extends CommonProps & CommonPropsRootNodeRef> extends React.Component<
  CommonWrapperProps<P> & CommonPropsRootNodeRef
> {
  private child: React.ReactNode;
  private setRootNode!: TSetRootNode;
  private rootNodeSubscription: Nullable<TRootNodeSubscription> = null;

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ className, style, rootNodeRef, ...dataProps }, { children, ...rest }] = extractCommonProps(this.props);
    this.child = isFunction(children) ? children(rest) : children;
    return React.isValidElement<CommonProps & React.RefAttributes<any>>(this.child)
      ? React.cloneElement(this.child, {
          ref: isRefableElement(this.child) ? this.ref : null,
          className: cx(this.child.props.className, className),
          style: {
            ...this.child.props.style,
            ...style,
          },
          ...dataProps,
        })
      : this.child;
  }

  private ref = (instance: Nullable<React.ReactInstance>) => {
    this.setRootNode(instance);
    this.props.rootNodeRef?.(getRootNode(instance));

    // refs are called when instances change
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
    originalRef && callChildRef(originalRef, instance);
  };
}

const extractCommonProps = <P extends CommonProps & CommonPropsRootNodeRef>(
  props: P,
): [CommonProps & CommonPropsRootNodeRef, NotCommonProps<P>] => {
  const common = {} as CommonProps & CommonPropsRootNodeRef;
  const rest = {} as NotCommonProps<P>;

  for (const key in props) {
    if (isCommonProp(key)) {
      // @ts-expect-error: See: https://github.com/skbkontur/retail-ui/pull/2257#discussion_r565275843 and https://github.com/skbkontur/retail-ui/pull/2257#discussion_r569542736.
      common[key] = props[key];
    } else {
      // @ts-expect-error: Read the comment above.
      rest[key] = props[key];
    }
  }

  return [common, rest];
};

const isCommonProp = (name: string) => {
  switch (true) {
    case name === 'className':
    case name === 'style':
    case name === 'rootNodeRef':
    case name.indexOf('data-') === 0: // все data-атрибуты
      return true;
    default:
      return false;
  }
};
