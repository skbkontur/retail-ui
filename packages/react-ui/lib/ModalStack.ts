import React from 'react';
import EventEmitter from 'eventemitter3';

export class StackedComponent extends React.Component {
  get blockedBackground(): boolean {
    return false;
  }
  set blockedBackground(val: boolean) {
    this.blockedBackground = val;
  }
}

interface StackInfo {
  emitter: EventEmitter;
  mounted: StackedComponent[];
}

interface GlobalWithStackInfo {
  __ReactUIStackInfo?: StackInfo;
}

export interface ModalStackSubscription {
  remove: () => void;
}

export class ModalStack {
  public static add(
    component: StackedComponent,
    onChange: (stack: ReadonlyArray<StackedComponent>) => void,
  ): ModalStackSubscription {
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

  public static remove(component: StackedComponent) {
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
