import { getGuid } from './guidUtils';
import { UploadFileControlValidationResult } from '../internal/UploadFileControl/UploadFileControlValidationResult';

export type UploadFileInBase64 = string | ArrayBuffer | null;

export enum UploadFileStatus {
  Attached = 'Attached',
  Loading = 'Loading',
  Uploaded = 'Uploaded',
  Error = 'Error'
}

// TODO @mozalov: возможно стоит попробовать отделить валидацию и статус
export interface IUploadFile {
  id: string;
  originalFile: File;
  status: UploadFileStatus;
  validationResult: UploadFileControlValidationResult;

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
    originalFile: getFileWithEscapedName(file),
    status: UploadFileStatus.Attached,
    validationResult: UploadFileControlValidationResult.ok(),
    fileInBase64: fileInBase64
  };
};

const escapeRegExpFileNameSpecChars = (s: string): string => s.replace(/[\\^$*+?()|[\]{}<>:\/]/g, '\\$&');

const getFileWithEscapedName = (file: File): File => {
  const {name} = file;
  return { ...file, name: escapeRegExpFileNameSpecChars(name)};
};
