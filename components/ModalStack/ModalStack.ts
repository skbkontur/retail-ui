import * as React from 'react';
import { EventEmitter, EventSubscription } from 'fbemitter';
import Global = NodeJS.Global;

interface StackInfo {
  emitter: EventEmitter;
  mounted: React.ReactNode[];
}

interface GlobalWithStackInfo {
  __ReactUIStackInfo?: StackInfo;
}

export default class ModalStack {
  public static add(
    component: React.ReactNode,
    onChange: (stack: React.ReactNode[]) => void
  ): EventSubscription {
    const { emitter, mounted } = ModalStack.getStackInfo();
    mounted.unshift(component);
    const subscription = emitter.addListener('change', () =>
      onChange([...mounted])
    );
    emitter.emit('change');
    return subscription;
  }

  public static remove(component: React.ReactNode) {
    const { emitter, mounted } = ModalStack.getStackInfo();
    const index = mounted.findIndex(x => x === component);
    if (index !== -1) {
      mounted.splice(index, 1);
    }
    emitter.emit('change');
  }

  private static getStackInfo(): StackInfo {
    const globalWithStack = global as GlobalWithStackInfo & Global;
    return (
      globalWithStack.__ReactUIStackInfo ||
      (globalWithStack.__ReactUIStackInfo = {
        emitter: new EventEmitter(),
        mounted: []
      })
    );
  }
}
