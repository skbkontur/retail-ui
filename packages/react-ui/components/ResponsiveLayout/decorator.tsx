import React from 'react';

import { ResponsiveLayout } from './ResponsiveLayout';
import { ResponsiveLayoutFlags } from './types';

export function responsiveLayout<
  T extends new (...args: any[]) => React.Component,
  O extends Record<string, string> = {},
>(WrappedComp: T) {
  const ComponentWithLayout = class extends WrappedComp {
    public layout!: ResponsiveLayoutFlags<O>;

    public get currentLayout(): ResponsiveLayoutFlags<O> {
      return this.layout;
    }

    public set currentLayout(value: ResponsiveLayoutFlags<O>) {
      //
    }

    public get isMobileLayout(): boolean {
      return this.layout.isMobile;
    }

    public set isMobileLayout(value: boolean) {
      //
    }

    public renderWithLayout = (currentLayout: ResponsiveLayoutFlags<O>) => {
      this.layout = currentLayout;

      return super.render();
    };

    public render() {
      return <ResponsiveLayout>{this.renderWithLayout}</ResponsiveLayout>;
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(ComponentWithLayout, 'name');

  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(ComponentWithLayout, 'name', { value: WrappedComp.name });
  }

  return ComponentWithLayout;
}
