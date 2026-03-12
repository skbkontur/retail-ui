import type React from 'react';
import { isValidElement } from 'react';
import { isForwardRef, isMemo } from 'react-is';

import type { GlobalObject } from '../lib/globalObject.js';
import { isBrowser } from '../lib/globalObject.js';
import type { CurrencyInputProps } from '../components/CurrencyInput/index.js';
import type { PasswordInputProps } from '../components/PasswordInput/index.js';
import type { InputProps } from '../components/Input/index.js';
import type { AutocompleteProps } from '../components/Autocomplete/index.js';
import type { FxInputProps } from '../components/FxInput/index.js';
import type { SelectProps } from '../components/Select/index.js';
import type { DropdownProps } from '../components/Dropdown/index.js';
import type { DropdownMenuProps } from '../components/DropdownMenu/index.js';
import type { ButtonProps } from '../components/Button/index.js';
import type { TooltipProps } from '../components/Tooltip/index.js';
import type { HintProps } from '../components/Hint/index.js';

export { delay } from './delay.js';

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

export const emptyHandler = (): void => {
  /* noop */
};

export class CancelationError extends Error {
  public code = 'CancelationError';
}

export function taskWithDelay(task: () => void, ms: number): () => void {
  let cancelationToken: () => void = () => null;

  new Promise((resolve, reject) => {
    cancelationToken = reject;
    setTimeout(resolve, ms);
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

export function isIntrinsicElement(element: React.ReactElement<unknown>): boolean {
  return typeof element.type === 'string';
}

export function isRefableElement(element: React.ReactElement<unknown>): boolean {
  return (
    Boolean(isIntrinsicElement(element) || isClassComponent(element.type) || isForwardRef(element)) || isMemo(element)
  );
}

export function escapeRegExpSpecChars(s: string): string {
  return s.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const getRandomID = (): string => Math.random().toString(16).slice(2);

export const isExternalLink = (link: string, globalObject: GlobalObject): boolean => {
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

/**
 * Checks if a component instance is a ReactUI component with the given name.
 *
 * @typeParam T Expected ReactUI component type.
 * @param instance Component instance.
 * @param componentName ReactUI component name.
 * @returns `true` if it matches, otherwise `false`.
 */
export const isReactUIInstance = <T extends React.Component>(
  instance: React.Component,
  componentName: string,
): instance is T => {
  const constructor = instance?.constructor;
  return '__KONTUR_REACT_UI__' in constructor && constructor.__KONTUR_REACT_UI__ === componentName;
};

/**
 * Extracts all data attributes from props and returns them as well as props.
 *
 * @param props Props object to extract data attributes from.
 * @returns Separated data attributes and all other props.
 */
export const extractDataProps = <T extends Record<string, unknown>>(
  props: T,
): { dataProps: Record<string, unknown>; restWithoutDataProps: Record<string, unknown> } => {
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
export const startsWithOneOf = (searchKeys: string[], inputString: string): boolean => {
  const keyIndex = searchKeys.findIndex((key) => {
    return inputString.startsWith(key);
  });

  return keyIndex >= 0;
};

export const isButton = isReactUIComponent<ButtonProps>('Button');
export const isInput = isReactUIComponent<InputProps>('Input');
export const isFxInput = isReactUIComponent<FxInputProps>('FxInput');
export const isAutocomplete = isReactUIComponent<AutocompleteProps>('Autocomplete');
export const isPasswordInput = isReactUIComponent<PasswordInputProps>('PasswordInput');
export const isCurrencyInput = isReactUIComponent<CurrencyInputProps>('CurrencyInput');
export const isSelect = isReactUIComponent<SelectProps<unknown, unknown>>('Select');
export const isDropdown = isReactUIComponent<DropdownProps>('Dropdown');
export const isDropdownMenu = isReactUIComponent<DropdownMenuProps>('DropdownMenu');
export const isHint = isReactUIComponent<HintProps>('Hint');
export const isTooltip = isReactUIComponent<TooltipProps>('Tooltip');

export const isKonturIcon = (icon: React.ReactElement): boolean => {
  return Object.prototype.hasOwnProperty.call(icon?.type, '__KONTUR_ICON__');
};

export function clickOutside(eventType: 'touchstart' | 'mousedown' | 'pointerup' = 'mousedown'): void {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(eventType, true, true);
  document.body.dispatchEvent(event);
}

export function isElement(el: unknown): el is Element {
  return !!el && typeof el === 'object' && 'nodeType' in el && el.nodeType === Node.ELEMENT_NODE;
}
