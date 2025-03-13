import type React from 'react';
import { isValidElement } from 'react';
import { isForwardRef } from 'react-is';
import { globalObject, isBrowser } from '@skbkontur/global-object';

import type { CurrencyInputProps } from '../components/CurrencyInput';
import type { PasswordInputProps } from '../components/PasswordInput';
import type { InputProps } from '../components/Input';
import type { AutocompleteProps } from '../components/Autocomplete';
import type { FxInputProps } from '../components/FxInput';

export { delay } from './delay';

// NOTE: Copy-paste from @types/react
export type Defaultize<P, D> = P extends any
  ? string extends keyof P
    ? P
    : Pick<P, Exclude<keyof P, keyof D>> &
        Partial<Pick<P, Extract<keyof P, keyof D>>> &
        Partial<Pick<D, Exclude<keyof D, keyof P>>>
  : never;

export type DefaultizeProps<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

export type AnyObject = Record<string, unknown>;

export type NoInfer<T> = T extends infer U ? U : never;

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
    globalObject.setTimeout(resolve, ms);
  })
    .then(task)
    .catch(() => null);

  return cancelationToken;
}

export type FunctionWithParams<R = any> = (...args: any[]) => R;
export function isFunction<T>(x: T | FunctionWithParams): x is FunctionWithParams {
  return typeof x === 'function';
}

export function isFunctionalComponent(Component: unknown): Component is React.ComponentType {
  return Boolean(typeof Component === 'function' && !(Component.prototype && Component.prototype.isReactComponent));
}

export function isClassComponent(Component: unknown): Component is React.ComponentType {
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
  return isBrowser(globalObject) && new RegExp(`^(https?:)?//(?!${globalObject.location.host})\\S+`, 'gi').test(link);
};

/**
 * Check if the given ReactNode is an element of the specified ReactUI component
 */
export const isReactUINode = (componentName: string, node: React.ReactNode): boolean => {
  if (isValidElement(node)) {
    return (
      Object.prototype.hasOwnProperty.call(node.type, '__KONTUR_REACT_UI__') &&
      // @ts-expect-error: React doesn't know about existence of __KONTUR_REACT_UI__.
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
export const isNullable = (value: unknown): value is null | undefined => {
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
    // @ts-expect-error: Property `type` doesn't exist on type `React.ReactNode`, but exists on type `React.ReactElement` meanwhile `React.ReactElement` is not compatible with `React` `children` type.
    return child?.type?.__KONTUR_REACT_UI__ === name;
  };
};

/** @deprecated Переехал в `lib/mergeRefs.ts`. Со следующей мажорной версии от сюда будет удален*/
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
export const extractDataProps = <T extends Record<string, any>>(props: T) => {
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

export const isInputLike =
  isReactUIComponent<InputProps>('Input') ||
  isReactUIComponent<FxInputProps>('FxInput') ||
  isReactUIComponent<AutocompleteProps>('Autocomplete') ||
  isReactUIComponent<PasswordInputProps>('PasswordInput') ||
  isReactUIComponent<CurrencyInputProps>('CurrencyInput');

export const isKonturIcon = (icon: React.ReactElement) => {
  return Object.prototype.hasOwnProperty.call(icon?.type, '__KONTUR_ICON__');
};

export function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
}
