import React from 'react';
import EventEmitter from 'eventemitter3';

interface StackInfo {
  emitter: EventEmitter;
  mounted: React.Component[];
}

interface GlobalWithStackInfo {
  __ReactUIStackInfo?: StackInfo;
}

export interface StackSubscription {
  remove: () => void;
}

export class ModalStack {
  public static add(
    component: React.Component,
    onChange: (stack: ReadonlyArray<React.Component>) => void,
  ): StackSubscription {
    const { emitter, mounted } = ModalStack.getStackInfo();
    mounted.unshift(component);
    const changeHandler = () => onChange([...mounted]);
    emitter.addListener('change', changeHandler);
    emitter.emit('change');
    return {
      remove: () => {
        emitter.removeListener('change', changeHandler);
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
