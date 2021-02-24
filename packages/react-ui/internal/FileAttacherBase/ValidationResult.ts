// FIXME @mozalov: заменить на объект из react-ui-validations
export class ValidationResult {
  readonly isValid: boolean;
  readonly message?: string;

  constructor(isValid: boolean, message?: string) {
    this.isValid = isValid;
    this.message = message;
  }

  static error(message: string): ValidationResult {
    return new ValidationResult(false, message);
  }

  static ok(): ValidationResult {
    return new ValidationResult(true);
  }
}
