export class FileUploaderFileValidationResult {
  readonly isValid: boolean;
  readonly message?: string;

  constructor(isValid: boolean, message?: string) {
    this.isValid = isValid;
    this.message = message;
  }

  static error(message: string): FileUploaderFileValidationResult {
    return new FileUploaderFileValidationResult(false, message);
  }

  static ok(): FileUploaderFileValidationResult {
    return new FileUploaderFileValidationResult(true);
  }
}
