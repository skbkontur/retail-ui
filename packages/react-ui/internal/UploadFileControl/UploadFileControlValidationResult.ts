export class UploadFileControlValidationResult {
  readonly isValid: boolean;
  readonly message?: string;

  constructor(isValid: boolean, message?: string) {
    this.isValid = isValid;
    this.message = message;
  }

  static error(message: string): UploadFileControlValidationResult {
    return new UploadFileControlValidationResult(false, message);
  }

  static ok(): UploadFileControlValidationResult {
    return new UploadFileControlValidationResult(true);
  }
}
