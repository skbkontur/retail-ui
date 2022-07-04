import React from 'react';
import EventEmitter from 'eventemitter3';

import { SidePageProps } from '../components/SidePage';
import { ModalProps } from '../components/Modal';

export interface StackInfo {
  emitter: EventEmitter;
  mounted: React.Component[];
}

interface GlobalWithStackInfo {
  __ReactUIStackInfo?: StackInfo;
}

export interface ModalStackSubscription {
  remove: () => void;
}

// there are cases when users use several versions of `@skbkontur/react-ui` in one app.
// later versions use the `fbemitter` package, which does not have a `removeListener()` method.
// we didn't take this into account when we replaced `eventemitter3` with `fbemitter`.

// when this problem was found, we released fixes for more popular versions:
// see https://github.com/skbkontur/retail-ui/issues/2197#issuecomment-725395272
// but not all teams can move to fixed versions, that may cause app crashing

// this code almost eliminates this risk because it adds compatibility with all later versions.
EventEmitter.prototype.addListener = function (this: { remove(): void } & EventEmitter, ...args) {
  // declare the `remove()` method as package `fbemitter`
  this.remove = () => this.removeListener(...args);

  // call an alias of `addListener()`
  // see https://github.com/primus/eventemitter3/blob/master/index.js#L319
  return this.on(...args);
};

export class ModalStack {
  public static add(
    component: React.Component,
    onChange: (stack: readonly React.Component[]) => void,
  ): ModalStackSubscription {
    const { emitter, mounted } = ModalStack.getStackInfo();
    mounted.unshift(component);
    const changeHandler = () => onChange([...mounted]);
    const _token = emitter.addListener('change', changeHandler);
    emitter.emit('change');
    return {
      remove: () => {
        // Backward compatible with versions using the `fbemitter` package.
        if ('remove' in _token) {
          // @ts-ignore
          _token.remove();
          return;
        }

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

  /**
   * Determines if stack component is allowed to block background
   */
  public static isBlocking(component: React.Component): boolean {
    const { mounted } = ModalStack.getStackInfo();
    for (let index = 0; index < mounted.length; index++) {
      if (ModalStack.wantsToBlock(mounted[index])) {
        // only the highest component in stack
        // that wants to block is allowed to do it
        return component === mounted[index];
      }
    }
    return false;
  }

  public static getStackInfo(): StackInfo {
    const globalWithStack = global as GlobalWithStackInfo;
    return (
      globalWithStack.__ReactUIStackInfo ||
      (globalWithStack.__ReactUIStackInfo = {
        emitter: new EventEmitter(),
        mounted: [],
      })
    );
  }

  private static wantsToBlock(component: React.Component): boolean {
    if (isModal(component)) {
      return true;
    }

    if (isSidePage(component)) {
      const { mounted } = ModalStack.getStackInfo();
      const deepestSidePages = mounted.filter((i) => isSidePage(i)).pop();
      return !!component.props.blockBackground && component === deepestSidePages;
    }

    return false;
  }
}

/**
 * Specific check for component type by its instance
 */
const isReactUIInstance = <T>(componentName: string) => {
  return (instance: React.Component): instance is React.Component<T> => {
    const { constructor } = instance;

    return (
      Object.prototype.hasOwnProperty.call(constructor, '__KONTUR_REACT_UI__') &&
      // @ts-ignore
      constructor.__KONTUR_REACT_UI__ === componentName
    );
  };
};

const isSidePage = isReactUIInstance<SidePageProps>('SidePage');

const isModal = isReactUIInstance<ModalProps>('Modal');
