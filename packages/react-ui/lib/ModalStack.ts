import React from 'react';
import EventEmitter from 'eventemitter3';

import { SidePageProps } from '../components/SidePage';
import { ModalProps } from '../components/Modal';

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

export class ModalStack {
  public static add(
    component: React.Component,
    onChange: (stack: ReadonlyArray<React.Component>) => void,
  ): ModalStackSubscription {
    const { emitter, mounted } = ModalStack.getStackInfo();
    mounted.unshift(component);
    const changeHandler = () => onChange([...mounted]);
    const _token = emitter.addListener('change', changeHandler);
    emitter.emit('change');
    return {
      remove: () => {
        // Backwards compatible with versions 0.x and 1.w which using the fbemitter package
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

  private static wantsToBlock(component: React.Component): boolean {
    if (isModal(component)) {
      return true;
    }

    if (isSidePage(component)) {
      const { mounted } = ModalStack.getStackInfo();
      const deepestSidePages = mounted.filter(i => isSidePage(i)).pop();
      return !!component.props.blockBackground && component === deepestSidePages;
    }

    return false;
  }
}

const isSidePage = (component: React.Component): component is React.Component<SidePageProps> => {
  return isReactUIComponent('SidePage', component);
};

const isModal = (component: React.Component): component is React.Component<ModalProps> => {
  return isReactUIComponent('Modal', component);
};

/**
 * Specific check for component type by its instance
 */
const isReactUIComponent = (componentName: string, component: React.Component) => {
  const { constructor } = component;
  return (
    Object.prototype.hasOwnProperty.call(constructor, '__KONTUR_REACT_UI__') &&
    // @ts-ignore
    constructor.__KONTUR_REACT_UI__ === componentName
  );
};
