import * as React from 'react';
import CancellationTokenSource from '../Cancellation/CancellationTokenSource';
import CancellationToken from '../Cancellation/CancellationToken';
import PromiseLazySource from './PromiseLazySource';
import { ValidationBuilder } from './ValidationBuilder';
import { ValidationBehaviour } from '../../../src';
import { ValidationLevel } from '../../../src/ValidationWrapperInternal';
import { Nullable } from '../../../typings/Types';

export type ExtractItem<T> = T extends Array<infer TItem> ? TItem : never;

export interface NodePath {
  key: string;
  name: string;
}

export interface ValidationObject {
  type?: Nullable<ValidationBehaviour>;
  level?: Nullable<ValidationLevel>;
  message: React.ReactNode;
}

export interface ValidationInfo {
  path: NodePath[];
  locals: {
    [name: string]: {
      dependency: any;
      calculate: (cancellation: CancellationToken) => Promise<any>;
      promiseLazySource: PromiseLazySource<any>;
      cancellation: Nullable<CancellationTokenSource>;
    };
  };
  cancellation: Nullable<CancellationTokenSource>;
  validateCallbacks: Array<(cancellation: CancellationToken) => Promise<Nullable<ValidationObject>>>;
  submittedCallbacks: Array<(value: any) => Nullable<ValidationObject>>;
  validation: Nullable<ValidationObject>;
}

export interface ValidationNode<T> {
  info: Nullable<ValidationInfo>;
  children: Nullable<{ [K in keyof T]: ValidationNode<T[K]> }>;
  childKeyByName: Nullable<{ [name: string]: string }>;
}

export interface NodeLocal {
  path: NodePath[];
  name: string;
  dependency: any;
  calculate: (cancellation: CancellationToken) => Promise<any>;
  promiseLazySource: PromiseLazySource<any>;
}

export type ValidateOn = Record<ValidationBehaviour, boolean>;

export interface NodeValidation {
  path: NodePath[];
  validate: (cancellation: CancellationToken) => Promise<Nullable<ValidationObject>>;
  type: ValidationBehaviour;
  debounce: number;
  validateOn: ValidateOn;
}

export interface NodeSubmittedValidation {
  path: NodePath[];
  validate: (submit: any) => Nullable<ValidationObject>;
}

export type ValidationRule<TRoot, T, TExtra, TSubmit> = (
  builder: ValidationBuilder<TRoot, T, TExtra, TSubmit>,
  value: T,
) => void;
export type ItemValidationRule<TRoot, T, TExtra, TSubmit> = (
  builder: ValidationBuilder<TRoot, T, TExtra, TSubmit>,
  value: T,
  index: number,
  array: T[],
) => void;
export type RootValidationRule<T, TExtra, TSubmit> = ValidationRule<T, T, TExtra, TSubmit>;
