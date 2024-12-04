import type { Nullable } from '../../typings/Types';
import type { ValidationInfo } from '../ValidationWrapper';

import type { ValidationBuilder } from './ValidationBuilder';

export interface ValidationNode<T> {
  validation: Nullable<ValidationInfo>;
  children: Nullable<{ [K in keyof T]: ValidationNode<T[K]> }>;
}

export type ValidationRule<TRoot, T> = (builder: ValidationBuilder<TRoot, T>, value: T) => void;
export type ItemValidationRule<TRoot, T> = (
  builder: ValidationBuilder<TRoot, T>,
  value: T,
  index: number,
  array: T[],
) => void;
export type RootValidationRule<T> = ValidationRule<T, T>;
