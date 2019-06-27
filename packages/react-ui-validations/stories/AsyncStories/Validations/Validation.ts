import { RootValidationRule } from './Types';
import { Validator } from './Validator';

export class Validation<T, TExtra, TSubmit> {
  private readonly rule: RootValidationRule<T, TExtra, TSubmit>;

  public constructor(rule: RootValidationRule<T, TExtra, TSubmit>) {
    this.rule = rule;
  }

  public createValidator(
    value: T,
    onChange: (callback: () => void) => void,
    extra?: TExtra,
  ): Validator<T, TExtra, TSubmit> {
    return new Validator(this.rule, value, extra, onChange);
  }
}
