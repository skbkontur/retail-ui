export enum ValidationResultType {
  Ok,
  Error
}

export class ValidationResult<TValidationError> {
  readonly error?: TValidationError;
  readonly type: ValidationResultType;

  constructor(type: ValidationResultType, error?: TValidationError) {
    this.type = type;
    this.error = error;
  }

  compareTo(validationResult: ValidationResult<TValidationError>): number {
    if (this.type < validationResult.type)
      return -1;
    if (this.type > validationResult.type)
      return 1;
    return 0;
  }

  static error<TValidationError>(error: TValidationError): ValidationResult<TValidationError> {
    return new ValidationResult(ValidationResultType.Error, error);
  }

  static ok<TValidationError>(): ValidationResult<TValidationError> {
    return new ValidationResult(ValidationResultType.Ok);
  }

  static mostCritical<TValidationError>(...results: Array<ValidationResult<any>>): ValidationResult<any> {
    let maxResult = ValidationResult.ok();
    for (const currentResult of results) {
      if (maxResult.compareTo(currentResult) < 0) {
        maxResult = currentResult;
      }
    }

    return maxResult as ValidationResult<TValidationError>;
  }
}
