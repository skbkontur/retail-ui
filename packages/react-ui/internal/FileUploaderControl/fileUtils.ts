import { getGuid } from '../../lib/guidUtils';

import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult';

export type FileUploaderFileInBase64 = string | ArrayBuffer | null;

export enum FileUploaderFileStatus {
  Attached = 'Attached',
  Loading = 'Loading',
  Uploaded = 'Uploaded',
  Error = 'Error',
}

export interface FileUploaderAttachedFile {
  id: string;
  originalFile: File;
  status: FileUploaderFileStatus;
  validationResult: FileUploaderFileValidationResult;

  fileInBase64: FileUploaderFileInBase64;
}

export const readFile = (file: File): Promise<FileUploaderFileInBase64> =>
  new Promise((resolve, reject): void => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });

export const readFiles = (files: File[]): Promise<Array<FileUploaderAttachedFile>> => {
  const filesPromises = files.map(async (file) => {
    const fileInBase64 = (await readFile(file).catch(console.error)) || null;
    return getUploadFile(file, fileInBase64);
  });

  return Promise.all(filesPromises);
};

export const getUploadFile = (file: File, fileInBase64: FileUploaderFileInBase64): FileUploaderAttachedFile => {
  return {
    id: getGuid(),
    originalFile: file,
    status: FileUploaderFileStatus.Attached,
    validationResult: FileUploaderFileValidationResult.ok(),
    fileInBase64: fileInBase64,
  };
};

