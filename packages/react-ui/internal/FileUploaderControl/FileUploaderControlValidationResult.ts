export class FileUploaderControlValidationResult {
  readonly isValid: boolean;
  readonly message?: string;

  constructor(isValid: boolean, message?: string) {
    this.isValid = isValid;
    this.message = message;
  }

  static error(message: string): FileUploaderControlValidationResult {
    return new FileUploaderControlValidationResult(false, message);
  }

  static ok(): FileUploaderControlValidationResult {
    return new FileUploaderControlValidationResult(true);
  }
}
