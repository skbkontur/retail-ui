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

const KB = 1024;
const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return '0 Bytes';

  decimals = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log2(bytes) / Math.log2(KB));
  const formattedBytes = parseFloat((bytes / Math.pow(KB, i)).toFixed(decimals));

  return `${formattedBytes} ${UNITS[i]}`;
};
