import { getGuid } from './guidUtils';
import { ValidationResult } from '../internal/FileAttacherBase/ValidationResult';

export type UploadFileInBase64 = string | ArrayBuffer | null;

export enum UploadFileStatus {
  Attached = 'Attached',
  Loading = 'Loading',
  Uploaded = 'Uploaded',
  Error = 'Error'
}

export enum UploadFileValidationError {
  SizeError = 'SizeError',
  FileTypeError = 'FileTypeError',
  UnknownError = 'UnknownError'
}

export interface IUploadFile {
  id: string;
  originalFile: File;
  status: UploadFileStatus;
  validationResult: ValidationResult;

  fileInBase64: UploadFileInBase64;
}

export const readFile = (file: File): Promise<UploadFileInBase64> => (
  new Promise((resolve, reject): void => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  })
);

export const readFiles = (files: File[]): Promise<Array<IUploadFile>> => {
  const filesPromises = files.map(async file => {
    const fileInBase64 = await readFile(file).catch(console.error) || null;
    return getUploadFile(file, fileInBase64);
  });

  return Promise.all(filesPromises);
};

export const getUploadFile = (file: File, fileInBase64: UploadFileInBase64): IUploadFile => {
  return {
    id: getGuid(),
    originalFile: file,
    status: UploadFileStatus.Attached,
    validationResult: ValidationResult.ok(),
    fileInBase64: fileInBase64
  };
};

export const isAllowedFileType = (fileType: string, allowedFileTypes: string[]): boolean => {
  for (let i = 0, l = allowedFileTypes.length; i < l; i++) {
    const allowedType = allowedFileTypes[i];

    if (allowedType === fileType) {
      return true;
    }

    const [firstAllowedTypePart, secondAllowedTypePart] = allowedType.split('/');
    if (secondAllowedTypePart === '*') {
      const [firstTypePart] = allowedType.split('/');
      if (firstTypePart === firstAllowedTypePart) {
        return true;
      }
    }
  }

  return false;
};
