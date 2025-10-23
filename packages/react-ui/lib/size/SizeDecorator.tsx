import React from 'react';

import type { SizeProp } from '../types/props';

import { SizeControlContext } from './SizeControlContext';
import { defaultSizeValue } from './constants';

type Constructor<T = NonNullable<unknown>> = new (...args: any[]) => T;

interface WithSizeProps {
  size?: SizeProp;
}

export function withSize<T extends Constructor<React.Component<WithSizeProps>>>(constructor: T) {
  const SizeDecorator = class extends constructor {
    public size: SizeProp = defaultSizeValue;

    public render(): React.ReactNode {
      return (
        <SizeControlContext.Consumer>
          {(context) => {
            this.size = this.props.size ?? context.size;
            const originalRender = super.render;
            if (typeof originalRender === 'function') {
              return originalRender.call(this);
            }

            return null;
          }}
        </SizeControlContext.Consumer>
      );
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(SizeDecorator, 'name');
  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(SizeDecorator, 'name', { value: constructor.name });
  }

  return SizeDecorator;
}
