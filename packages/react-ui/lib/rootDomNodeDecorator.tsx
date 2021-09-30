import React from 'react';

import { Nullable } from '../typings/utility-types';

import { getRootDomNode } from './getRootDomNode';

export function rootDomNode<T extends new (...args: any[]) => React.Component>(Component: T) {
  const rootDomNode = class extends Component {
    public rootDomNode: Nullable<HTMLElement>;
    public constructor(...args: any[]) {
      super(args[0]);
    }

    public render(): JSX.Element {
      // @ts-ignore
      return <Component {...this.props} rootRef={this.refRootDomNode} />;
    }

    public refRootDomNode = (e: Nullable<React.ReactNode>) => {
      this.rootDomNode = getRootDomNode(e);
    };

    public getRootDomNode = () => {
      return this.rootDomNode;
    };
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(rootDomNode, 'name');
  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(rootDomNode, 'name', { value: Component.name });
    return rootDomNode;
  }
}
