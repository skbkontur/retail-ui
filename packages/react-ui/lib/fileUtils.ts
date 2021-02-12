import { getGuid } from './guidUtils';

export type UploadFileDataUrl = string | ArrayBuffer | null;

export enum UploadFileStatus {
  Default = 'Default',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error'
}

export enum UploadFileError {
  SizeError = 'SizeError',
  FileTypeError = 'FileTypeError',
  UnknownError = 'UnknownError'
}

export interface IUploadFile {
  id: string;
  originalFile: File;
  url?: UploadFileDataUrl;
  status?: UploadFileStatus;
  error?: UploadFileError;
}

export const readFile = (file: File): Promise<UploadFileDataUrl> => (
  new Promise((resolve, reject): void => {
    const fileReader = new FileReader();
    console.log({file});
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  })
);

export const readFiles = (files: File[]): Promise<Array<UploadFileDataUrl>> => {
  const filesPromises = files.map(file => readFile(file));

  return Promise.all(filesPromises);
};

export const getUploadFile = (file: File): IUploadFile => {
  return {
    id: getGuid(),
    originalFile: file
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
