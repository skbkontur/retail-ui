import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../globalObject.js';

import { RenderEnvironmentContext } from './RenderEnvironmentContext.js';

interface ComponentWithKonturReactUI {
  __KONTUR_REACT_UI__?: string;
  displayName?: string;
}

type Constructor<T = NonNullable<unknown>> = (new (...args: any[]) => T) & ComponentWithKonturReactUI;

export function withRenderEnvironment<T extends Constructor<React.Component>>(
  constructor: T,
): ComponentWithKonturReactUI & T {
  const RenderEnvironmentDecorator = class extends constructor {
    public static __KONTUR_REACT_UI__ = constructor.__KONTUR_REACT_UI__;
    public static displayName = constructor.displayName;

    public globalObject!: GlobalObject;
    public cx!: Emotion['cx'];
    public emotion!: Emotion;

    public render(): React.ReactNode {
      return (
        <RenderEnvironmentContext.Consumer>
          {({ globalObject, emotion }) => {
            this.globalObject = globalObject;
            this.emotion = emotion;
            this.cx = emotion.cx;

            const originalRender = super.render;
            if (typeof originalRender === 'function') {
              return originalRender.call(this);
            }

            return null;
          }}
        </RenderEnvironmentContext.Consumer>
      );
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(RenderEnvironmentDecorator, 'name');
  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(RenderEnvironmentDecorator, 'name', { value: constructor.name });
  }

  return RenderEnvironmentDecorator;
}
