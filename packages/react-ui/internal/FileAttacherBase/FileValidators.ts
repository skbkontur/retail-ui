import { isAllowedFileType, IUploadFile } from '../../lib/fileUtils';
import { ValidationResult } from './ValidationResult';

// FIXME @mozalov: Возможно не в первой итерации стоит добавить набор валидаторов, которые юзеры могут пользовать

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
