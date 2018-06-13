import * as React from 'react';
import { EventEmitter, EventSubscription } from 'fbemitter';

interface StackInfo {
  emitter: EventEmitter;
  mounted: React.Component[];
}

interface GlobalWithStackInfo {
  __ReactUIStackInfo?: StackInfo;
}

export default class ModalStack {
  public static add(
    component: React.Component,
    onChange: (stack: ReadonlyArray<React.Component>) => void
  ): EventSubscription {
    const { emitter, mounted } = ModalStack.getStackInfo();
    mounted.unshift(component);
    const subscription = emitter.addListener('change', () =>
      onChange([...mounted])
    );
    emitter.emit('change');
    return subscription;
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
        mounted: []
      })
    );
  }
}
