import {ValidationBuilder} from "./ValidationBuilder";
import {ValidationWriter} from "./ValidationWriter";
import {RootValidationRule} from "./Types";
import {ValidationReader} from "./ValidationReader";

const validate = <T>(data: T, validationRule: RootValidationRule<T>): ValidationReader<T> => {
  const validationWriter = new ValidationWriter<T>();
  const builder = new ValidationBuilder<T, T>({validationWriter}, [], data);
  validationRule(builder, data);
  return validationWriter.reader;
};

export type Validator<T> = (value: T) => ValidationReader<T>;

export const createValidator = <T>(rule: RootValidationRule<T>): Validator<T> => {
  return (value: T): ValidationReader<T> => {
    return validate(value, rule);
  };
};
