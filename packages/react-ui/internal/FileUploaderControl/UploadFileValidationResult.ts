export class UploadFileValidationResult {
  readonly isValid: boolean;
  readonly message?: string;

  constructor(isValid: boolean, message?: string) {
    this.isValid = isValid;
    this.message = message;
  }

  static error(message: string): UploadFileValidationResult {
    return new UploadFileValidationResult(false, message);
  }

  static ok(): UploadFileValidationResult {
    return new UploadFileValidationResult(true);
  }
}
