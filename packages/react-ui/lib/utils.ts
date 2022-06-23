import { ReactComponentLike } from 'prop-types';
import React from 'react';
import { isForwardRef } from 'react-is';

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

export function isFunctionalComponent(Component: ReactComponentLike): boolean {
  return Boolean(typeof Component === 'function' && !(Component.prototype && Component.prototype.isReactComponent));
}

export function isClassComponent(Component: ReactComponentLike): boolean {
  return Boolean(typeof Component === 'function' && Component.prototype && Component.prototype.isReactComponent);
}

export function isIntrinsicElement(element: React.ReactElement): boolean {
  return typeof element.type === 'string';
}

export function isRefableElement(element: React.ReactElement): boolean {
  return Boolean(isIntrinsicElement(element) || isClassComponent(element.type) || isForwardRef(element));
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

const KB = 1024;
const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const calculateDecimals = (decimals: number) => {
  if (decimals < 0) {
    return 0;
  }

  return 0;
};

export const formatBytes = (bytes: number, decimals = 2): string | null => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  if (!bytes) {
    return null;
  }

  const calculatedDecimals = calculateDecimals(decimals);

  const i = Math.floor(Math.log2(bytes) / Math.log2(KB));
  const formattedBytes = parseFloat((bytes / Math.pow(KB, i)).toFixed(calculatedDecimals));

  return `${formattedBytes} ${UNITS[i]}`;
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
 * Checks if the value `null` or `undefined`.
 *
 * @param value Value to check for `null` and `undefined`.
 * @returns Returns `true` if `value` is `null` or `undefined`, else `false`.
 */
// @ts-expect-error: TypeScript doesn't consider the check inside of the function.
export const isNullable = <T>(value: T): value is null | undefined => {
  return value === null || value === undefined;
};

/**
 * Creates a function that checks if the given `child`
 * is an instance of some component specified by `name`.
 *
 * @param name Component name for which function will be created.
 * @returns A function that checks if the given `child` is an instance of the component specified by `name`.
 */
export const isReactUIComponent = <P = any>(name: string) => {
  return (child: React.ReactNode): child is React.ReactElement<P> => {
    // @ts-ignore
    return child?.type?.__KONTUR_REACT_UI__ === name;
  };
};

/**
 * Merges two or more refs into one.
 *
 * @param refs Array of refs.
 * @returns A single ref composing all the refs passed.
 *
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
        return ref(value);
      } else if (isNonNullable(ref)) {
        return ((ref as React.MutableRefObject<T | null>).current = value);
      }
    });
  };
}

/**
 * Extracts all data attributes from props and returns them as well as props.
 *
 * @param props Props object to extract data attributes from.
 * @returns Separated data attributes and all other props.
 */
export const extractDataProps = <T>(props: T) => {
  const dataProps: Record<string, any> = {};
  const restWithoutDataProps: Record<string, any> = {};

  Object.entries(props).map(([name, value]) => {
    if (name.startsWith('data-')) {
      return (dataProps[name] = value);
    }

    return (restWithoutDataProps[name] = value);
  });

  return { dataProps, restWithoutDataProps };
};

/**
 * Basically `.startsWith` for arrays.
 *
 * @param searchKeys Array of strings to test against `inputString`.
 * @param inputString String on which search will be performed.
 * @returns `true` if `inputString` starts with one of keys, else `false`.
 */
export const startsWithOneOf = (searchKeys: string[], inputString: string) => {
  const keyIndex = searchKeys.findIndex((key) => {
    return inputString.startsWith(key);
  });

  return keyIndex >= 0;
};
