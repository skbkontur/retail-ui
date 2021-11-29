import React from 'react';
import { ReactComponentLike } from 'prop-types';

import { isBrowser } from './client';

/**
 * Inverts the action of the given function.
 *
 * @param fn A function which action needs to be inverted.
 * @returns Returns an inverted function.
 */
export function not<T>(fn: (...args: T[]) => any) {
  return (...args: T[]) => !fn(...args);
}

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
 * Checks if the given value is equal to null or undefined and excludes null and undefined from the type of value.
 *
 * @param value A value that needs to be checked.
 * @returns Returns true if the value is equal to null or undefined, else false.
 */
export const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

/**
 * Inverted version of isNonNullable function.
 *
 * @returns Returns true for any value other than null or undefined.
 */
export const isNullable = not(isNonNullable);

/**
 * Extracts object's properties that meet the condition in the given predicate.
 *
 * @param object An object from which properties will be extracted.
 * @param filterFunc A function for filtering object's properties.
 * @returns Returns the properties of an object that meet the condition in the given predicate.
 */
export function extractFromObject<T>(
  object: T,
  filterFunc: (value: [string, any], index?: number, array?: T[]) => boolean,
): Partial<T> {
  //@ts-expect-error
  return Object.fromEntries(Object.entries(object).filter(filterFunc));
}

/**
 * Shortcut for Object.prototype.hasOwnProperty.call(obj, prop)
 *
 * @param obj An object which possibly contains the property.
 * @param prop A property name.
 * @returns Returns true if property is in the object, else false.
 */
export function hasProp<T extends {}>(obj: T, prop: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
