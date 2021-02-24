import { isAllowedFileType, IUploadFile } from '../../lib/fileUtils';
import { ValidationResult } from './ValidationResult';

export const fileTypeValidate = ({ type }: File, allowedFileTypes: string[]): boolean => {
  if (!allowedFileTypes.length) {
    return true;
  }

  if (!type) {
    return false;
  }

  return isAllowedFileType(type, allowedFileTypes);
};

export const defaultFileValidate = ({originalFile}: IUploadFile, allowedFileTypes: string[]): ValidationResult => {
  if (!fileTypeValidate(originalFile, allowedFileTypes)) {
    return ValidationResult.error("Неверный формат");
  }
  return ValidationResult.ok();
};
