import React from 'react';

import { ResponsiveLayout } from './ResponsiveLayout';
import { ResponsiveLayoutFlags } from './types';

export function responsiveLayout<T extends new (...args: any[]) => React.Component>(WrappedComp: T) {
  const ComponentWithLayout = class extends WrappedComp {
    public layout!: ResponsiveLayoutFlags;

    public get currentLayout(): ResponsiveLayoutFlags {
      return this.layout;
    }

    public set currentLayout(value: ResponsiveLayoutFlags) {
      //
    }

    public get isMobileLayout(): boolean {
      return this.layout.isMobile;
    }

    public set isMobileLayout(value: boolean) {
      //
    }

    public renderWithLayout = (currentLayout: ResponsiveLayoutFlags) => {
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
