import { Nullable } from '../typings/Types';

import { Validation, ValidationBehaviour, ValidationLevel } from './ValidationWrapperInternal';

export function getVisibleValidation(
  visible: Nullable<Validation>,
  actual: Nullable<Validation>,
  changing: boolean,
): Nullable<Validation> {
  const from = (type?: Nullable<ValidationBehaviour>): boolean => getType(visible) === type;
  const to = (type?: Nullable<ValidationBehaviour>): boolean => getType(actual) === type;

  if (to('immediate')) {
    return actual;
  }

  if (changing) {
    return from('immediate') ? null : visible;
  }

  if (from(null) && to('lostfocus')) {
    return null;
  }

  if (to('lostfocus')) {
    return actual;
  }

  if (from('submit') && to('submit')) {
    return visible;
  }

  return null;
}

export function getType(validation: Nullable<Validation>): Nullable<ValidationBehaviour> {
  return validation ? validation.behaviour : null;
}

export function getLevel(validation: Nullable<Validation>): Nullable<ValidationLevel> {
  return validation ? validation.level : null;
}

export function getIndependent(validation: Nullable<Validation>): Nullable<boolean> {
  return validation ? validation.independent : null;
}

export function isEqual(a: Nullable<Validation>, b: Nullable<Validation>): boolean {
  if (a === b) {
    return true;
  }
  return (
    !!a &&
    !!b &&
    a.behaviour === b.behaviour &&
    a.level === a.level &&
    a.message === b.message &&
    a.independent === b.independent
  );
}
