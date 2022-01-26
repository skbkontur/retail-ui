import { ReactComponentLike } from 'prop-types';
import React from 'react';

import { isBrowser } from './client';

// NOTE: Copy-paste from @types/react
export type Defaultize<P, D> = P extends any
  ? string extends keyof P
    ? P
    : Pick<P, Exclude<keyof P, keyof D>> &
        Partial<Pick<P, Extract<keyof P, keyof D>>> &
        Partial<Pick<D, Exclude<keyof D, keyof P>>>
  : never;

export type DefaultizeProps<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const emptyHandler = () => {
  /* noop */
};

export class CancelationError extends Error {
  public code = 'CancelationError';
}

export function taskWithDelay(task: () => void, ms: number) {
  let cancelationToken: () => void = () => null;

  new Promise((resolve, reject) => {
    cancelationToken = reject;
    setTimeout(resolve, ms);
  })
    .then(task)
    .catch(() => null);

  return cancelationToken;
}

export function isFunction<T>(x: T | Function): x is Function {
  return typeof x === 'function';
}

export function isFunctionalComponent(Component: ReactComponentLike) {
  return typeof Component === 'function' && !(Component.prototype && Component.prototype.isReactComponent);
}

export function escapeRegExpSpecChars(s: string): string {
  return s.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const getRandomID = (): string => Math.random().toString(16).slice(2);

export const isExternalLink = (link: string): boolean => {
  return new RegExp(`^(https?:)?//${isBrowser ? `(?!${window.location.host})` : ``}\\S+`, 'gi').test(link);
};

/**
 * Check if the given ReactNode is an element of the specified ReactUI component
 */
export const isReactUINode = (componentName: string, node: React.ReactNode): boolean => {
  if (React.isValidElement(node)) {
    return (
      Object.prototype.hasOwnProperty.call(node.type, '__KONTUR_REACT_UI__') &&
      // @ts-ignore
      node.type.__KONTUR_REACT_UI__ === componentName
    );
  }

  return false;
};

/**
 * Проверяет, не является ли переданный аргумент null или undefined и исключает типы null и undefined из типа аргумента
 *
 * @param value Значение, которое нужно проверить и исключить из него типы
 * @returns Возвращает true, если переданный аргумент не является null или undefined иначе false
 */
export const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

/**
 * Merges two or more refs into one.
 *
 * @param refs Array of refs.
 * @returns A single ref composing all the refs passed.
 * @example
 * const SomeComponent = forwardRef((props, ref) => {
 *  const localRef = useRef();
 *
 *  return <div ref={mergeRefs([localRef, ref])} />;
 * });
 */
export function mergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
