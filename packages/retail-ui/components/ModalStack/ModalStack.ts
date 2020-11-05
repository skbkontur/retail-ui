import * as React from 'react';
import { EventEmitter } from 'fbemitter';

interface StackInfo {
  emitter: EventEmitter;
  mounted: React.Component[];
}

interface GlobalWithStackInfo {
  __ReactUIStackInfo?: StackInfo;
}

export interface ModalStackSubscription {
  remove: () => void;
}

export default class ModalStack {
  public static add(
    component: React.Component,
    onChange: (stack: ReadonlyArray<React.Component>) => void,
  ): ModalStackSubscription {
    const { emitter, mounted } = ModalStack.getStackInfo();
    mounted.unshift(component);
    const changeHandler = () => onChange([...mounted]);
    const subscription = emitter.addListener('change', changeHandler);
    emitter.emit('change');
    return {
      remove(): void {
        // Forwards compatible with versions 2.x which using the eventemitter3 package
        if ('removeListener' in subscription) {
          // @ts-ignore
          emitter.removeListener('change', changeHandler);
          return;
        }

        subscription.remove();
      },
    };
  }

  public static remove(component: React.Component) {
    const { emitter, mounted } = ModalStack.getStackInfo();
    const index = mounted.indexOf(component);
    if (index !== -1) {
      mounted.splice(index, 1);
    }
    emitter.emit('change');
  }

  private static getStackInfo(): StackInfo {
    const globalWithStack = global as GlobalWithStackInfo;
    return (
      globalWithStack.__ReactUIStackInfo ||
      (globalWithStack.__ReactUIStackInfo = {
        emitter: new EventEmitter(),
        mounted: [],
      })
    );
  }
}
