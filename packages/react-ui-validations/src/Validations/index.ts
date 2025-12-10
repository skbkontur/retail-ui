import { ValidationBuilder } from './ValidationBuilder.js';
import { ValidationWriter } from './ValidationWriter.js';
import type { RootValidationRule, ValidationRule, ItemValidationRule } from './Types.js';
import { ValidationReader } from './ValidationReader.js';
import { PathTokensCache } from './PathHelper.js';

function validate<T>(data: T, validationRule: RootValidationRule<T>, tokens: PathTokensCache): ValidationReader<T> {
  const validationWriter = new ValidationWriter<T>();
  const builder = new ValidationBuilder<T, T>(validationWriter, tokens, [], data);
  validationRule(builder, data);
  return validationWriter.getReader(tokens);
}

export type Validator<T> = (value: T) => ValidationReader<T>;

export function createValidator<T>(rule: RootValidationRule<T>): Validator<T> {
  const tokens = new PathTokensCache();
  return (value: T): ValidationReader<T> => {
    return validate(value, rule, tokens);
  };
}

export { ValidationReader, ValidationBuilder };

export type { RootValidationRule, ValidationRule, ItemValidationRule };
